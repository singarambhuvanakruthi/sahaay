import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ServicePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedOption, setSelectedOption] = useState(null);

  let service = "";

  if (location.pathname === "/education") {
    service = "Education";
  } else if (location.pathname === "/healthcare") {
    service = "Healthcare";
  } else if (location.pathname === "/banking") {
    service = "Banking";
  }

  const serviceData = {
    Education: {
      label: "EDUCATION SERVICES",
      title: "How can we help with education?",
      description:
        "Choose the type of education support you are looking for.",

      options: [
        {
          id: "scholarships",
          title: "Scholarship Information",
          description:
            "Understand scholarship options and application guidance.",

          guidance:
            "Sahaay can help you understand scholarship information and guide you toward official application sources.",

          needs: [
            "Basic student information",
            "Education or course details",
            "Required supporting documents",
            "Information about the scholarship you are applying for",
          ],

          nextStep:
            "Check the official scholarship information and application requirements before applying.",
        },

        {
          id: "education-support",
          title: "Education Support",
          description:
            "Find guidance for education-related support services.",

          guidance:
            "Sahaay can explain education support services in simple language and help you understand where to find official information.",

          needs: [
            "Basic student information",
            "Current education details",
            "Details about the support required",
          ],

          nextStep:
            "Identify the appropriate education support service and check its official requirements.",
        },

        {
          id: "certificates",
          title: "Certificates & Documents",
          description:
            "Get guidance about education-related documents.",

          guidance:
            "Sahaay can help explain the general process for education-related certificates and documents.",

          needs: [
            "Student or applicant information",
            "Details of the required certificate",
            "Supporting documents, if required",
          ],

          nextStep:
            "Check the official service for the required documents and submission process.",
        },

        {
          id: "skill-development",
          title: "Skill Development",
          description:
            "Explore training and skill-development opportunities.",

          guidance:
            "Sahaay can help users understand training and skill-development opportunities and how to find official information.",

          needs: [
            "Basic personal information",
            "Current education or qualification details",
            "Preferred skill or training area",
          ],

          nextStep:
            "Explore suitable training opportunities and verify eligibility with the official provider.",
        },
      ],
    },

    Healthcare: {
      label: "HEALTHCARE SERVICES",
      title: "How can we help with healthcare?",
      description:
        "Choose the type of healthcare assistance you are looking for.",

      options: [
        {
          id: "health-schemes",
          title: "Health Scheme Guidance",
          description:
            "Understand healthcare schemes and support services.",

          guidance:
            "Sahaay can explain healthcare service information in simple language and guide users toward official sources.",

          needs: [
            "Basic personal information",
            "Details about the support required",
            "Relevant documents, if an official service requires them",
          ],

          nextStep:
            "Check the official healthcare scheme information and its eligibility requirements.",
        },

        {
          id: "healthcare-services",
          title: "Healthcare Services",
          description:
            "Find guidance for accessing healthcare services.",

          guidance:
            "Sahaay can help users understand how to find appropriate healthcare services and government support.",

          needs: [
            "Type of healthcare service needed",
            "Location information",
            "Basic patient information, where required",
          ],

          nextStep:
            "Find the appropriate healthcare service and verify the available support.",
        },

        {
          id: "appointment",
          title: "Appointment Guidance",
          description:
            "Get guidance for accessing healthcare appointments.",

          guidance:
            "Sahaay can explain the general steps involved in finding and accessing healthcare appointment services.",

          needs: [
            "Type of appointment needed",
            "Preferred healthcare facility",
            "Basic contact information, if required",
          ],

          nextStep:
            "Choose an appropriate healthcare facility and follow its official appointment process.",
        },

        {
          id: "emergency-help",
          title: "Emergency & Help Information",
          description:
            "Find important emergency and support information.",

          guidance:
            "For an actual emergency, use the appropriate emergency service. Sahaay can help users understand where to find official support information.",

          needs: [
            "Type of help required",
            "Current location, if needed by the official service",
          ],

          nextStep:
            "For an emergency, contact the appropriate emergency service immediately.",
        },
      ],
    },

    Banking: {
      label: "BANKING SERVICES",
      title: "How can we help with banking?",
      description:
        "Choose the type of banking assistance you are looking for.",

      options: [
        {
          id: "banking-information",
          title: "Banking Information",
          description:
            "Understand common banking services and processes.",

          guidance:
            "Sahaay can explain common banking services in simple language and guide users toward official banking information.",

          needs: [
            "Type of banking service required",
            "Basic information about the request",
          ],

          nextStep:
            "Check the official bank or service provider for the exact process and requirements.",
        },

        {
          id: "digital-banking",
          title: "Digital Banking Guidance",
          description:
            "Learn about digital banking services and processes.",

          guidance:
            "Sahaay can provide general guidance for understanding digital banking services.",

          needs: [
            "The type of digital banking service required",
            "Access to the official banking application or website",
          ],

          nextStep:
            "Use only the official banking application or website. Never share your PIN, OTP, password, or card details.",
        },

        {
          id: "pension-payments",
          title: "Pension & Payment Guidance",
          description:
            "Get guidance related to pension and payment services.",

          guidance:
            "Sahaay can explain pension and payment-related processes and guide users toward official services.",

          needs: [
            "Type of pension or payment service",
            "Basic applicant information",
            "Relevant official documents, if required",
          ],

          nextStep:
            "Check the official pension or payment service for its current requirements.",
        },

        {
          id: "account-services",
          title: "Account Services",
          description:
            "Understand account-related services and assistance.",

          guidance:
            "Sahaay can explain general account-service procedures.",

          needs: [
            "Type of account service required",
            "Basic information about the request",
          ],

          nextStep:
            "Contact or use the official banking channel for the requested account service.",

        },
      ],
    },
  };

  const currentService = serviceData[service];

  if (!currentService) {
    return (
      <main>
        <h1>Service not found</h1>

        <p>
          We could not find this Sahaay service.
        </p>

        <button onClick={() => navigate("/home")}>
          Back to Services
        </button>
      </main>
    );
  }

  const selectedService = currentService.options.find(
    (option) => option.id === selectedOption
  );

  return (
    <main>
      <p>{currentService.label}</p>

      <h1>{currentService.title}</h1>

      <p>{currentService.description}</p>

      <section>
        <h2>Choose a service</h2>

        <div className="service-options">
          {currentService.options.map((option) => (
            <button
              key={option.id}
              className={`service-option ${
                selectedOption === option.id ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <span>
                <strong>{option.title}</strong>
                <small>{option.description}</small>
              </span>

              <span>→</span>
            </button>
          ))}
        </div>
      </section>

      {selectedService && (
        <section className="service-guidance">
          <p>SAHAAY GUIDANCE</p>

          <h2>{selectedService.title}</h2>

          <p>{selectedService.guidance}</p>

          <h3>What you may need</h3>

          <ul>
            {selectedService.needs.map((need) => (
              <li key={need}>{need}</li>
            ))}
          </ul>

          <h3>Next step</h3>

          <p>{selectedService.nextStep}</p>

          <div className="status-warning">
            <strong>Demo guidance</strong>

            <p>
              This Sahaay screen provides guidance for the
              hackathon demonstration. It does not submit a
              real application or transaction.
            </p>
          </div>

          <button
            onClick={() => setSelectedOption(null)}
          >
            Choose Another Service
          </button>
        </section>
      )}

      <section className="home-help">
        <h2>Need another service?</h2>

        <p>
          Return to the services page to choose another category.
        </p>

        <button
          className="secondary"
          onClick={() => navigate("/home")}
        >
          Back to Services
        </button>
      </section>
    </main>
  );
}

export default ServicePage;