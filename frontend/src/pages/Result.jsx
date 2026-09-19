import ServiceMatches from "../components/ServiceMatches";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    name,
    age,
    hasCertificate,
    income,
  } = location.state || {};

  return (
    <main>
      <p>Eligibility Check Complete</p>

      <h1>Here is what we found</h1>

      <p>
        Thank you, {name || "there"}.
      </p>

      <section>
        <h2>Your Information</h2>

        <p>
          <strong>Name:</strong>{" "}
          {name || "Not provided"}
        </p>

        <p>
          <strong>Age:</strong>{" "}
          {age || "Not provided"}
        </p>

        <p>
          <strong>Disability certificate:</strong>{" "}
          {hasCertificate === "yes"
            ? "Yes"
            : hasCertificate === "no"
            ? "No"
            : "Not provided"}
        </p>

        <p>
          <strong>Annual household income:</strong>{" "}
          {income || "Not provided"}
        </p>
      </section>

      <section>
        <h2>What happens next?</h2>

        <p>
          Sahaay can guide you through the next steps
          of the government service application.
        </p>

        <p>
          <strong>Important:</strong> The eligibility
          information in this demo uses sample criteria.
          Official eligibility rules should be verified
          before submitting an application.
        </p>
      </section>
<button
  onClick={() =>
    navigate("/application", {
      state: {
        name,
        age,
        hasCertificate,
        income,
      },
    })
  }
>
  Start Application
</button>
      <button onClick={() => navigate("/home")}>
        Back to Services
      </button>
          <ServiceMatches age={age} income={income} hasCertificate={hasCertificate} />
    </main>
  );
}

export default Result;