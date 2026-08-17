import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForPatients = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  const handlePortalAccess = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (token && user?.role === "patient") {
      navigate("/patients");
    } else {
      navigate("/login");
    }
  };

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I book an initial consultation?",
      a: "You can easily book online using our 'Book Appointment' button or call our emergency hotline directly.",
    },
    {
      q: "What should I bring to my first appointment?",
      a: "Please bring a valid photo ID, your previous dental records (if available), and any active insurance details.",
    },
    {
      q: "Do you accept health insurance?",
      a: "Yes, Glowdent partners with most major health and dental insurance providers for seamless coverage.",
    },
  ];

  return (
    <div className="py-5 bg-light">
      <div className="container">
        
        <div className="p-4 p-md-5 mb-5 bg-primary text-white rounded-4 shadow-sm text-center position-relative overflow-hidden">
          <div
            className="position-relative z-1 mx-auto"
            style={{ maxWidth: "650px" }}
          >
            <span className="badge bg-white text-primary rounded-pill px-3 py-2 mb-3 fw-bold">
              Patient Care & Guidance
            </span>
            <h1 className="fw-bold mb-3">Welcome to Glowdent Patient Center</h1>
            <p className="opacity-75 mb-4">
              Everything you need to know about your dental visit, medical
              guidelines, and account portal access.
            </p>

            
            <button
              onClick={handlePortalAccess}
              className="btn btn-light text-primary rounded-pill px-4 py-2 fw-bold shadow-sm"
            >
              <i className="bi bi-person-circle me-2"></i> Access Patient Portal
              / Dashboard
            </button>
          </div>
        </div>

        
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card h-100 border-0 rounded-4 p-4 shadow-sm">
              <div
                className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                style={{ width: "50px", height: "50px" }}
              >
                <i className="bi bi-calendar-check fs-4"></i>
              </div>
              <h5 className="fw-bold">1. Easy Booking</h5>
              <p className="text-muted small mb-0">
                Choose your preferred specialist doctor and select an available
                time slot online without waiting in queues.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 rounded-4 p-4 shadow-sm">
              <div
                className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                style={{ width: "50px", height: "50px" }}
              >
                <i className="bi bi-file-earmark-text fs-4"></i>
              </div>
              <h5 className="fw-bold">2. Digital Records</h5>
              <p className="text-muted small mb-0">
                All your prescriptions, X-rays, and treatment history are
                securely stored in your personal patient dashboard.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 rounded-4 p-4 shadow-sm">
              <div
                className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                style={{ width: "50px", height: "50px" }}
              >
                <i className="bi bi-heart-pulse fs-4"></i>
              </div>
              <h5 className="fw-bold">3. Post-Care Support</h5>
              <p className="text-muted small mb-0">
                Receive follow-up guidelines and 24/7 helpline assistance after
                any surgical or general treatment.
              </p>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-4 p-4 p-md-5 shadow-sm">
          <h3 className="fw-bold text-center mb-4">Patient FAQ & Guidelines</h3>
          <div className="accordion accordion-flush" id="patientFaq">
            {faqs.map((faq, idx) => (
              <div className="accordion-item border-bottom py-2" key={idx}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${openIndex !== idx ? "collapsed" : ""} fw-bold text-dark bg-transparent shadow-none`}
                    type="button"
                    onClick={() => toggleFaq(idx)}
                  >
                    {faq.q}
                  </button>
                </h2>
                <div
                  className={`accordion-collapse collapse ${openIndex === idx ? "show" : ""}`}
                >
                  <div className="accordion-body text-muted">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForPatients;
