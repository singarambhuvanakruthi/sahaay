import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Application() {
  const location = useLocation();
  const navigate = useNavigate();

  const eligibilityData = location.state || {};

  const [formData, setFormData] = useState({
    name: eligibilityData.name || "",
    age: eligibilityData.age || "",
    state: "",
    district: "",
    disabilityType: "",
    disabilityPercentage: "",
    contactNumber: "",
    address: "",
    preferredLanguage: "English",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleContinue(event) {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.age ||
      !formData.state ||
      !formData.district ||
      !formData.disabilityType ||
      !formData.disabilityPercentage ||
      !formData.contactNumber ||
      !formData.address
    ) {
      alert("Please complete all required fields.");
      return;
    }

    navigate("/review", {
      state: {
        ...eligibilityData,
        ...formData,
      },
    });
  }

  return (
    <main>
      <p>Application — Step 1 of 3</p>

      <h1>Let's complete your application</h1>

      <p>
        We will use the information you already provided and ask
        for a few more details.
      </p>

      <p>
        <strong>Demo application:</strong> Please do not enter
        real Aadhaar, bank account, or other sensitive information.
      </p>

      <form onSubmit={handleContinue}>
        <section>
          <h2>Your basic information</h2>

          <label>
            Full name
            <br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </label>

          <br />
          <br />

          <label>
            Age
            <br />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="120"
              placeholder="Enter your age"
            />
          </label>
        </section>

        <br />

        <section>
          <h2>Location</h2>

          <label>
            State
            <br />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Example: Telangana"
            />
          </label>

          <br />
          <br />

          <label>
            District
            <br />
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="Enter your district"
            />
          </label>
        </section>

        <br />

        <section>
          <h2>Disability information</h2>

          <label>
            Disability type
            <br />
            <select
              name="disabilityType"
              value={formData.disabilityType}
              onChange={handleChange}
            >
              <option value="">Select disability type</option>
              <option value="Visual impairment">Visual impairment</option>
              <option value="Hearing impairment">Hearing impairment</option>
              <option value="Locomotor disability">
                Locomotor disability
              </option>
              <option value="Other">Other</option>
            </select>
          </label>

          <br />
          <br />

          <label>
            Disability percentage
            <br />
            <input
              type="number"
              name="disabilityPercentage"
              value={formData.disabilityPercentage}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="Enter percentage"
            />
          </label>
        </section>

        <br />

        <section>
          <h2>Contact information</h2>

          <label>
            Contact number
            <br />
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Demo contact number"
            />
          </label>

          <br />
          <br />

          <label>
            Address
            <br />
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="4"
            />
          </label>
        </section>

        <br />

        <section>
          <h2>Language preference</h2>

          <label>
            Preferred language
            <br />
            <select
              name="preferredLanguage"
              value={formData.preferredLanguage}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Telugu">Telugu</option>
            </select>
          </label>
        </section>

        <br />

        <button type="button" onClick={() => navigate("/result")}>
          Back
        </button>

        <button type="submit">
          Continue to Review
        </button>
      </form>
    </main>
  );
}

export default Application;