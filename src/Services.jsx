import React from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "./useScrollReveal";

const Services = () => {
  useScrollReveal();
  const homeServices = [
    {
      id: 1,
      icon: "bi-activity",
      title: "Dental Checkup",
      desc: "Complete oral health assessment with digital X-Ray.",
    },
    {
      id: 2,
      icon: "bi-droplet-half",
      title: "Teeth Cleaning",
      desc: "Professional plaque removal & deep stain cleaning.",
    },
    {
      id: 3,
      icon: "bi-gear-wide-connected",
      title: "Dental Implants",
      desc: "Permanent titanium implant with natural crown.",
    },
    {
      id: 4,
      icon: "bi-grid-3x3-gap-fill",
      title: "Orthodontics",
      desc: "Modern braces and invisible clear aligners.",
    },
  ];

  return (
    <section className="py-5 bg-light" id="services">
      <div className="container">
        
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-2 fw-semibold">
            Our Services
          </span>
          <h2 className="fw-bold display-6">Specialized Care for Your Smile</h2>
          <p className="text-muted small">
            Explore our most popular dental treatments provided by certified
            specialists.
          </p>
        </div>

        
        <div className="row g-4">
          {homeServices.map((item, index) => (
            <div className="col-lg-3 col-md-6" key={item.id}>
              <div
                className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center bg-white home-card-hover animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                
                <div
                  className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 service-icon-box"
                  style={{ width: "60px", height: "60px" }}
                >
                  <i className={`bi ${item.icon} fs-3`}></i>
                </div>

                
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-5">
          <Link
            to="/services"
            className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm"
          >
            View All Services <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
