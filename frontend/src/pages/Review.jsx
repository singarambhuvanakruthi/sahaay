import { useLocation, useNavigate } from "react-router-dom";

function Review() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  return (
    <main>
      <p>Application — Step 2 of 3</p>

      <h1>Please review your information</h1>

      <p>
        Please check the details below before continuing.
      </p>

      <section>
        <h2>Basic Information</h2>

        <p>
          <strong>Name:</strong>{" "}
          {data.name || "Not provided"}
        </p>

        <p>
          <strong>Age:</strong>{" "}
          {data.age || "Not provided"}
        </p>
      </section>

      <section>
        <h2>Location</h2>

        <p>
          <strong>State:</strong>{" "}
          {data.state || "Not provided"}
        </p>

        <p>
          <strong>District:</strong>{" "}
          {data.district || "Not provided"}
        </p>
      </section>

      <section>
        <h2>Disability Information</h2>

        <p>
          <strong>Disability type:</strong>{" "}
          {data.disabilityType || "Not provided"}
        </p>

        <p>
          <strong>Disability percentage:</strong>{" "}
          {data.disabilityPercentage
            ? `${data.disabilityPercentage}%`
            : "Not provided"}
        </p>
      </section>

      <section>
        <h2>Contact Information</h2>

        <p>
          <strong>Contact number:</strong>{" "}
          {data.contactNumber || "Not provided"}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {data.address || "Not provided"}
        </p>
      </section>

      <section>
        <h2>Language</h2>

        <p>
          <strong>Preferred language:</strong>{" "}
          {data.preferredLanguage || "English"}
        </p>
      </section>

      <p>
        <strong>Demo:</strong> This information is being used
        only for the Sahaay hackathon demonstration.
      </p>

      <button
        onClick={() => navigate("/application", { state: data })}
      >
        Back to Application
      </button>

      <button
        onClick={() => navigate("/success", { state: data })}
      >
        Confirm Application
      </button>
    </main>
  );
}

export default Review;