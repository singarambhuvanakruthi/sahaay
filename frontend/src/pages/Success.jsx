import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  return (
    <main>
      <p>Application — Step 3 of 3</p>

      <h1>Application submitted successfully</h1>

      <p>
        Thank you, {data.name || "there"}.
      </p>

      <section>
        <h2>Your application reference</h2>

        <p>
          <strong>SAH-2026-48291</strong>
        </p>

        <p>
          Keep this reference number to check your application
          status later.
        </p>

        <p>
          <strong>Demo reference:</strong> This number is
          generated only for the Sahaay hackathon demonstration.
        </p>
      </section>

      <section>
        <h2>What happens next?</h2>

        <p>
          Your application has been recorded in the Sahaay demo
          workflow.
        </p>

        <p>
          Sahaay can help you track the application status and
          understand the next steps.
        </p>
      </section>

      <button onClick={() => navigate("/home")}>
        Back to Services
      </button>

      <button
        onClick={() =>
          navigate("/tracker", {
            state: {
              ...data,
              referenceNumber: "SAH-2026-48291",
            },
          })
        }
      >
        Track Application
      </button>
    </main>
  );
}

export default Success;