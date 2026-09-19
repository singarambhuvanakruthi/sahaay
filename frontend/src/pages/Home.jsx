import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <p>SAHAAY SERVICES</p>

      <h1>How can we help you today?</h1>

      <p>
        Choose a service below. Sahaay will guide you through
        the process step by step.
      </p>

      <section>
        <h2>Services</h2>

        <div className="service-grid">

          {/* Government Services */}
          <button
            className="service-card service-primary"
            onClick={() => navigate("/eligibility")}
          >
            <span className="service-icon">G</span>

            <span className="service-content">
              <strong>Government Services</strong>
              <small>
                Check eligibility and apply for welfare services
              </small>
            </span>

            <span className="service-arrow">→</span>
          </button>


          {/* Education */}
          <button
            className="service-card"
            onClick={() => navigate("/education")}
          >
            <span className="service-icon">E</span>

            <span className="service-content">
              <strong>Education</strong>
              <small>
                Explore education-related services and support
              </small>
            </span>

            <span className="service-arrow">→</span>
          </button>


          {/* Healthcare */}
          <button
            className="service-card"
            onClick={() => navigate("/healthcare")}
          >
            <span className="service-icon">H</span>

            <span className="service-content">
              <strong>Healthcare</strong>
              <small>
                Find healthcare services and assistance
              </small>
            </span>

            <span className="service-arrow">→</span>
          </button>


          {/* Banking */}
          <button
            className="service-card"
            onClick={() => navigate("/banking")}
          >
            <span className="service-icon">B</span>

            <span className="service-content">
              <strong>Banking</strong>
              <small>
                Access banking-related services and guidance
              </small>
            </span>

            <span className="service-arrow">→</span>
          </button>

        </div>
      </section>

      <section className="home-help">
        <h2>Need help?</h2>

        <p>
          You can use voice assistance or choose another service
          at any time.
        </p>

        <button
          className="secondary"
          onClick={() => navigate("/")}
        >
          Back to Welcome
        </button>
      </section>
    </main>
  );
}

export default Home;