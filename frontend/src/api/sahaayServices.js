const SERVICES_API_URL =
  import.meta.env.VITE_SAHAAY_SERVICES_URL || "http://127.0.0.1:8001";

async function request(path, options = {}) {
  const response = await fetch(`${SERVICES_API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!response.ok) {
    throw new Error((await response.text()) || `Request failed: ${response.status}`);
  }
  return response.json();
}

export function getServices() {
  return request("/services");
}

export function checkEligibility(payload) {
  return request("/eligibility", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
