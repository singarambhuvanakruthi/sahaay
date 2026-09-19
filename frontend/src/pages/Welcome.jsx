import { useNavigate } from "react-router-dom";

import VoiceButton from "../components/VoiceButton";
import "../styles/welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="welcome-page">
      <section className="welcome-card">
        <div className="brand">
          <span className="brand-mark">S</span>
          <span className="brand-name">SAHAAY</span>
        </div>

        <div className="welcome-content">
          <p className="welcome-label">WELCOME</p>

          <h1>Welcome to Sahaay</h1>

          <p className="welcome-tagline">
            Accessible help, one step at a time.
          </p>

          <h2>How can we help you today?</h2>

          <div className="welcome-actions">
            <VoiceButton language="en-IN" />

            <button
              className="secondary-action"
              onClick={() => navigate("/home")}
            >
              <span className="action-icon">Type</span>
              <span>
                <strong>Type</strong>
                <small>Use your keyboard or touch</small>
              </span>
            </button>
          </div>

          <button className="accessibility-link">
            Accessibility preferences
          </button>
        </div>

        <p className="welcome-note">
          Designed to make essential digital services easier to access.
        </p>
      </section>
    </main>
  );
}

export default Welcome;
