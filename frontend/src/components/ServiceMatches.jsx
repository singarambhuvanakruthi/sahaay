import { useEffect, useState } from "react";
import { getServices, checkEligibility } from "../api/sahaayServices";

function ServiceMatches({ age, income, hasCertificate }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getServices();
        const list = Array.isArray(data) ? data : data.services || [];
        const results = await Promise.all(
          list.map(async (s) => {
            const r = await checkEligibility({
              service_id: s.id,
              age: age ? Number(age) : null,
              income: income ? Number(income) : null,
              has_disability_certificate: hasCertificate === "yes",
            });
            return { id: s.id, name: s.name || s.id, ...r };
          })
        );
        setMatches(results);
      } catch (e) {
        setError("Could not reach the Sahaay services server.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [age, income, hasCertificate]);

  return (
    <section>
      <h2>Schemes for you</h2>
      {loading && <p>Checking schemes...</p>}
      {error && <p>{error}</p>}
      {matches.map((m) => (
        <div key={m.id}>
          <strong>{m.name}</strong>: {m.status}
          {m.reasons_failed.length > 0 && (
            <ul>
              {m.reasons_failed.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
}

export default ServiceMatches;
