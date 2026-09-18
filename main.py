"""
Sahaay Backend - Member 3
Loads scheme data from services.json and exposes it through FastAPI.
Eligibility logic is deterministic (rule-based) - no AI involved in the decision.
"""

import json
from pathlib import Path
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Sahaay Backend")

# ---------------------------------------------------------
# 1. Load service data once when the server starts
# ---------------------------------------------------------
DATA_PATH = Path(__file__).parent / "data" / "services.json"

with open(DATA_PATH, "r", encoding="utf-8") as f:
    SERVICES_DATA = json.load(f)["services"]

# Turn the list into a dict keyed by id, so lookups are instant (O(1))
SERVICES_BY_ID = {service["id"]: service for service in SERVICES_DATA}


def get_service_or_404(service_id: str):
    service = SERVICES_BY_ID.get(service_id)
    if not service:
        raise HTTPException(status_code=404, detail=f"Service '{service_id}' not found")
    return service


# ---------------------------------------------------------
# 2. GET /services - list all schemes (summary view)
# ---------------------------------------------------------
@app.get("/services")
def list_services():
    return [
        {
            "id": s["id"],
            "name": s["name"],
            "category": s["category"],
            "description": s["description"],
        }
        for s in SERVICES_DATA
    ]


# ---------------------------------------------------------
# 3. GET /services/{id} - full detail for one scheme
# ---------------------------------------------------------
@app.get("/services/{service_id}")
def get_service(service_id: str):
    return get_service_or_404(service_id)


# ---------------------------------------------------------
# 4. GET /services/{id}/documents
# ---------------------------------------------------------
@app.get("/services/{service_id}/documents")
def get_documents(service_id: str):
    service = get_service_or_404(service_id)
    return {"service_id": service_id, "documents": service["documents"]}


# ---------------------------------------------------------
# 5. GET /services/{id}/steps
# ---------------------------------------------------------
@app.get("/services/{service_id}/steps")
def get_steps(service_id: str):
    service = get_service_or_404(service_id)
    return {
        "service_id": service_id,
        "total_steps": len(service["steps"]),
        "steps": service["steps"],
    }


# ---------------------------------------------------------
# 6. POST /eligibility - the core rule engine
# ---------------------------------------------------------
class EligibilityRequest(BaseModel):
    service_id: str
    is_student: bool | None = None
    income: float | None = None          # annual or monthly, matched by field name below
    disability_percentage: float | None = None
    age: int | None = None
    below_poverty_line: bool | None = None
    has_disability_certificate: bool | None = None


@app.post("/eligibility")
def check_eligibility(req: EligibilityRequest):
    service = get_service_or_404(req.service_id)
    rules = service["eligibility"]
    reasons_failed = []

    # --- Student check ---
    if rules.get("is_student") and not req.is_student:
        reasons_failed.append("Must be a student")

    # --- Income checks (handles both annual and monthly fields in the data) ---
    if "max_annual_income" in rules and req.income is not None:
        if req.income > rules["max_annual_income"]:
            reasons_failed.append(f"Income exceeds limit of ₹{rules['max_annual_income']}")

    if "max_monthly_income" in rules and req.income is not None:
        if req.income > rules["max_monthly_income"]:
            reasons_failed.append(f"Income exceeds limit of ₹{rules['max_monthly_income']}/month")

    # --- Disability percentage ---
    if "min_disability_percentage" in rules and req.disability_percentage is not None:
        if req.disability_percentage < rules["min_disability_percentage"]:
            reasons_failed.append(
                f"Disability percentage must be at least {rules['min_disability_percentage']}%"
            )

    # --- Age range ---
    if "min_age" in rules and req.age is not None and req.age < rules["min_age"]:
        reasons_failed.append(f"Minimum age is {rules['min_age']}")
    if "max_age" in rules and req.age is not None and req.age > rules["max_age"]:
        reasons_failed.append(f"Maximum age is {rules['max_age']}")

    # --- BPL status ---
    if rules.get("below_poverty_line") and not req.below_poverty_line:
        reasons_failed.append("Must hold a Below Poverty Line (BPL) card")

    # --- Disability certificate ---
    if rules.get("disability_certificate_required") and not req.has_disability_certificate:
        reasons_failed.append("Disability certificate is required")

    is_eligible = len(reasons_failed) == 0

    return {
        "service_id": req.service_id,
        "eligible": is_eligible,
        "status": "Potentially eligible" if is_eligible else "Not currently eligible",
        "reasons_failed": reasons_failed,
    }


# ---------------------------------------------------------
# Health check - useful for confirming the server is alive
# ---------------------------------------------------------
@app.get("/")
def root():
    return {"message": "Sahaay backend is running", "total_services": len(SERVICES_DATA)}
