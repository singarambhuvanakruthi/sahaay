import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressIndicator from "../components/ProgressIndicator";

function Eligibility() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hasCertificate, setHasCertificate] = useState("");
  const [income, setIncome] = useState("");

  function handleNext() {
    if (step === 1 && !name) {
      alert("Please enter your name.");
      return;
    }

    if (step === 2 && !age) {
      alert("Please enter your age.");
      return;
    }

    if (step === 3 && !hasCertificate) {
      alert("Please select Yes or No.");
      return;
    }

    if (step === 4 && !income) {
      alert("Please select your income range.");
      return;
    }

    setStep((previous) => previous + 1);
  }

  function handleViewResult() {
    navigate("/result", {
      state: {
        name,
        age,
        hasCertificate,
        income,
      },
    });
  }

  return (
    <main>
      <p>Eligibility Check</p>

      <h1>Let's check your eligibility</h1>

      <p>
        Answer a few simple questions. Sahaay will guide you
        through the process step by step.
      </p>

      <ProgressIndicator currentStep={step} totalSteps={5} />

      {/* STEP 1 */}
      {step === 1 && (
        <section>
          <h2>What is your name?</h2>

          <label htmlFor="name">Full name</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />

          <button onClick={handleNext}>
            Next
          </button>
        </section>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <section>
          <h2>How old are you?</h2>

          <label htmlFor="age">Age</label>

          <input
            id="age"
            type="number"
            min="0"
            max="120"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="Enter your age"
          />

          <button onClick={handleNext}>
            Next
          </button>
        </section>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <section>
          <h2>Do you have a disability certificate?</h2>

          <p>
            Please select one option.
          </p>

          <div className="radio-options">

            <label
              className={`radio-option ${
                hasCertificate === "yes" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="certificate"
                value="yes"
                checked={hasCertificate === "yes"}
                onChange={(event) =>
                  setHasCertificate(event.target.value)
                }
              />

              <span className="radio-circle"></span>

              <span className="radio-content">
                <strong>Yes</strong>
                <small>I have a disability certificate</small>
              </span>
            </label>


            <label
              className={`radio-option ${
                hasCertificate === "no" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="certificate"
                value="no"
                checked={hasCertificate === "no"}
                onChange={(event) =>
                  setHasCertificate(event.target.value)
                }
              />

              <span className="radio-circle"></span>

              <span className="radio-content">
                <strong>No</strong>
                <small>I do not have a disability certificate</small>
              </span>
            </label>

          </div>

          <button onClick={handleNext}>
            Next
          </button>
        </section>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <section>
          <h2>What is your annual household income?</h2>

          <p>
            Please select the income range that applies to your
            household.
          </p>

          <div className="radio-options">

            <label
              className={`radio-option ${
                income === "Below ₹1 lakh" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="income"
                value="Below ₹1 lakh"
                checked={income === "Below ₹1 lakh"}
                onChange={(event) =>
                  setIncome(event.target.value)
                }
              />

              <span className="radio-circle"></span>

              <span className="radio-content">
                <strong>Below ₹1 lakh</strong>
                <small>Annual household income</small>
              </span>
            </label>


            <label
              className={`radio-option ${
                income === "₹1–3 lakh" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="income"
                value="₹1–3 lakh"
                checked={income === "₹1–3 lakh"}
                onChange={(event) =>
                  setIncome(event.target.value)
                }
              />

              <span className="radio-circle"></span>

              <span className="radio-content">
                <strong>₹1–3 lakh</strong>
                <small>Annual household income</small>
              </span>
            </label>


            <label
              className={`radio-option ${
                income === "Above ₹3 lakh" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="income"
                value="Above ₹3 lakh"
                checked={income === "Above ₹3 lakh"}
                onChange={(event) =>
                  setIncome(event.target.value)
                }
              />

              <span className="radio-circle"></span>

              <span className="radio-content">
                <strong>Above ₹3 lakh</strong>
                <small>Annual household income</small>
              </span>
            </label>

          </div>

          <button onClick={handleNext}>
            Next
          </button>
        </section>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <section>
          <h2>Thank you</h2>

          <p>
            We have collected the information needed for this
            eligibility check.
          </p>

          <button onClick={handleViewResult}>
            View Result
          </button>
        </section>
      )}
    </main>
  );
}

export default Eligibility;