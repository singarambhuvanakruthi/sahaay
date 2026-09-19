import json
import os
import re

from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------
# SETTINGS
# ---------------------------------------

USE_MOCK = os.getenv("USE_MOCK", "true").lower() == "true"

OPENAI_MODEL = os.getenv(
    "OPENAI_MODEL",
    "gpt-5.6-luna"
)

client = None

if not USE_MOCK:
    from openai import OpenAI

    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise ValueError(
            "OPENAI_API_KEY is missing from .env"
        )

    client = OpenAI(api_key=api_key)


# ---------------------------------------
# SAHAAY SAFETY RULES
# ---------------------------------------

SYSTEM_PROMPT = """
You are Sahaay, an AI accessibility companion.

Your job is to help users understand complicated
digital services in simple, clear language.

IMPORTANT RULES:

1. Use simple language.
2. Keep answers concise and easy to understand.
3. Explain difficult terms.
4. Never invent eligibility rules.
5. Never invent required documents.
6. Never invent deadlines, fees, authorities, or procedures.
7. For service-specific eligibility, use only the
   structured service data provided by the backend.
8. If required information is missing, clearly say
   that the information was not provided.
9. Do not make eligibility decisions yourself.
10. The backend's structured eligibility result is authoritative.
11. Give one clear next step whenever possible.
12. If the user requests another language, answer in that language.
"""


# ---------------------------------------
# HELPER
# ---------------------------------------

def _context_to_text(context: dict | None) -> str:

    if not context:
        return "No service-specific backend data was provided."

    return json.dumps(
        context,
        ensure_ascii=False,
        indent=2
    )


def _real_ai(instructions: str, user_input: str) -> str:

    response = client.responses.create(
        model=OPENAI_MODEL,
        instructions=instructions,
        input=user_input
    )

    return response.output_text.strip()


# ---------------------------------------
# ASK
# ---------------------------------------

def ask_sahaay(
    question: str,
    service_context: dict | None = None,
    language: str = "English"
) -> str:

    context_text = _context_to_text(service_context)

    if not USE_MOCK:

        prompt = f"""
{SYSTEM_PROMPT}

Requested response language:
{language}

Backend service data:
{context_text}

User question:
{question}
"""

        return _real_ai(
            SYSTEM_PROMPT,
            prompt
        )

    # -------- FREE MOCK MODE --------

    q = question.lower()

    if service_context:

        eligibility = service_context.get(
            "eligibility_status"
        )

        service_name = service_context.get(
            "service_name",
            "this service"
        )

        next_steps = service_context.get(
            "next_steps",
            []
        )

        answer = (
            f"According to the service information provided "
            f"for {service_name}:\n\n"
        )

        if eligibility:
            answer += (
                f"Eligibility status: {eligibility}\n\n"
            )

        if next_steps:
            answer += "Next step:\n"
            answer += "\n".join(
                f"• {step}"
                for step in next_steps
            )

        return answer

    if "income certificate" in q:

        return (
            "An income certificate is a document that "
            "shows a person's or family's income.\n\n"
            "It can be used when applying for certain "
            "government services or benefits.\n\n"
            "Next step: Check the official service "
            "information for the exact requirements."
        )

    if "disability certificate" in q:

        return (
            "A disability certificate is an official "
            "document that records a person's disability "
            "status.\n\n"
            "It may be used when applying for services "
            "or benefits that require proof of disability.\n\n"
            "Next step: Check the official service "
            "information for the exact process."
        )

    return (
        "This is Sahaay's free demo mode.\n\n"
        f"You asked: {question}\n\n"
        "Sahaay will explain the answer in simple "
        "language when the real AI service is enabled."
    )


# ---------------------------------------
# SIMPLIFY
# ---------------------------------------

def simplify_text(text: str) -> str:

    if not USE_MOCK:

        prompt = f"""
{SYSTEM_PROMPT}

Rewrite the following text in very simple language.

Keep the original meaning.
Do not add new facts.
Do not remove important requirements.

Text:
{text}
"""

        return _real_ai(
            SYSTEM_PROMPT,
            prompt
        )

    simple = text

    replacements = {
        "applicants": "people applying",
        "furnish": "provide",
        "documentary evidence": "supporting document",
        "annual household income": "family's yearly income",
        "commence": "start",
        "residence": "home or address",
        "pursuant to": "according to",
        "eligible": "allowed to apply"
    }

    for old, new in replacements.items():
        simple = re.sub(
            old,
            new,
            simple,
            flags=re.IGNORECASE
        )

    return (
        "Easy version:\n\n"
        f"{simple}"
    )


# ---------------------------------------
# EXPLAIN
# ---------------------------------------

def explain_topic(topic: str) -> str:

    if not USE_MOCK:

        prompt = f"""
{SYSTEM_PROMPT}

Explain this topic to a beginner.

Topic:
{topic}
"""

        return _real_ai(
            SYSTEM_PROMPT,
            prompt
        )

    topic_lower = topic.lower()

    if "income certificate" in topic_lower:

        return (
            "An income certificate is an official "
            "document that shows a person's or family's income.\n\n"
            "Simple idea: it is proof of income."
        )

    if "disability certificate" in topic_lower:

        return (
            "A disability certificate is an official "
            "document that records disability information.\n\n"
            "Simple idea: it is proof of disability status."
        )

    return (
        f"{topic} is a topic that Sahaay can explain "
        "in simple language.\n\n"
        "Real AI explanations will be available when "
        "API mode is enabled."
    )


# ---------------------------------------
# TRANSLATE
# ---------------------------------------

def translate_text(
    text: str,
    language: str
) -> str:

    if not USE_MOCK:

        prompt = f"""
Translate the following text into {language}.

Keep the meaning unchanged.
Use natural, simple language.

Text:
{text}
"""

        return _real_ai(
            f"""
You are a careful translation assistant.
Do not add information.
Translate accurately.
""",
            prompt
        )

    # Small free demo dictionary

    translations = {

        (
            "please upload your document.",
            "hindi"
        ):
            "कृपया अपना दस्तावेज़ अपलोड करें।",

        (
            "please upload your document.",
            "telugu"
        ):
            "దయచేసి మీ పత్రాన్ని అప్‌లోడ్ చేయండి।",

        (
            "what is an income certificate?",
            "hindi"
        ):
            "आय प्रमाण पत्र क्या है?",

        (
            "what is an income certificate?",
            "telugu"
        ):
            "ఆదాయ ధృవీకరణ పత్రం అంటే ఏమిటి?"
    }

    key = (
        text.strip().lower(),
        language.strip().lower()
    )

    if key in translations:
        return translations[key]

    return (
        f"[Demo translation to {language}]\n\n"
        f"{text}"
    )