import { useLocation, useNavigate } from "react-router-dom";

function Tracker() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  return (
    <main>
      <p>Application Status</p>

      <h1>Track your application</h1>

      <p>
        Here is the current status of your Sahaay application.
      </p>

      <section>
        <h2>Application Reference</h2>

        <p>
          <strong>
            {data.referenceNumber || "SAH-2026-48291"}
          </strong>
        </p>

        <p>
          <strong>Applicant:</strong>{" "}
          {data.name || "Lakshmi"}
        </p>
      </section>

      <section>
        <h2>Application Progress</h2>

        <div>
          <h3>✓ Application Submitted</h3>
          <p>
            Your application has been successfully submitted.
          </p>
        </div>

        <div>
          <h3>● Under Verification</h3>
          <p>
            Your application details are waiting for verification.
          </p>
        </div>

        <div>
          <h3>○ Decision Pending</h3>
          <p>
            The final decision will be updated after verification.
          </p>
        </div>
      </section>

      <section>
        <h2>Current Status</h2>

        <p>
          <strong>Under Verification</strong>
        </p>

        <p>
          This is a demo status for the Sahaay hackathon.
        </p>
      </section>

      <button onClick={() => navigate("/home")}>
        Back to Services
      </button>
    </main>
  );
}

export default Tracker;