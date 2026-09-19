const API_BASE_URL =
  import.meta.env.VITE_SAHAAY_API_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Sahaay API request failed: ${response.status}`);
  }

  return response.json();
}

export function askSahaay(question, language = "English") {
  return request("/ask", {
    method: "POST",
    body: JSON.stringify({
      question,
      language,
    }),
  });
}

export function getSahaayHealth() {
  return request("/health");
}
