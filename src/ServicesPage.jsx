import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/book-appointment", { state: { serviceName: "Teeth Cleaning" } });
  };

  const allServices = [
    {
      id: 1,
      icon: "bi-activity",
      title: "Dental Checkup",
      subtitle: "Complete Oral Health Assessment",
      price: "$50 - $80",
      duration: "30 mins",
      features: [
        "Digital X-Ray included",
        "Cavity & Gum Inspection",
        "Specialist Consultation",
      ],
      badge: "Popular",
    },
    {
      id: 2,
      icon: "bi-droplet-half",
      title: "Teeth Cleaning",
      subtitle: "Professional Clean & Polish",
      price: "$80 - $120",
      duration: "45 mins",
      features: [
        "Plaque & Tartar Removal",
        "Deep Stain Cleaning",
        "Fluoride Treatment",
      ],
      badge: null,
    },
    {
      id: 3,
      icon: "bi-gear-wide-connected",
      title: "Dental Implants",
      subtitle: "Permanent Tooth Replacement",
      price: "$500+",
      duration: "60 mins",
      features: [
        "Titanium Implant Placement",
        "Natural Looking Crown",
        "Lifetime Warranty",
      ],
      badge: "Advanced",
    },
    {
      id: 4,
      icon: "bi-grid-3x3-gap-fill",
      title: "Orthodontics",
      subtitle: "Braces & Clear Aligners",
      price: "$1200+",
      duration: "Custom Plan",
      features: [
        "Invisible Clear Aligners",
        "Teeth Realignment",
        "Free Retainers",
      ],
      badge: null,
    },
    {
      id: 5,
      icon: "bi-lightning-charge",
      title: "Root Canal Treatment",
      subtitle: "Pain-Free Infection Removal",
      price: "$250 - $400",
      duration: "60 mins",
      features: [
        "Infected Pulp Removal",
        "Sterilization & Filling",
        "Pain Relief Guaranteed",
      ],
      badge: "Urgent Care",
    },
    {
      id: 6,
      icon: "bi-stars",
      title: "Laser Teeth Whitening",
      subtitle: "Instant Bright Smile",
      price: "$150 - $300",
      duration: "40 mins",
      features: [
        "Advanced Laser Tech",
        "Up to 8 Shades Brighter",
        "Safe & Long-lasting",
      ],
      badge: "Cosmetic",
    },
    {
      id: 7,
      icon: "bi-shield-fill-x",
      title: "Tooth Extraction",
      subtitle: "Safe & Gentle Tooth Removal",
      price: "$100 - $200",
      duration: "45 mins",
      features: [
        "Local Anesthesia",
        "Wisdom Tooth Removal",
        "Post-Op Aftercare Plan",
      ],
      badge: null,
    },
    {
      id: 8,
      icon: "bi-emoji-smile",
      title: "Pediatric Dentistry",
      subtitle: "Dental Care for Children",
      price: "$60 - $100",
      duration: "30 mins",
      features: [
        "Kid-Friendly Environment",
        "Cavity Protection Sealants",
        "Gentle Oral Exam",
      ],
      badge: "For Kids",
    },
    {
      id: 9,
      icon: "bi-gem",
      title: "Dental Veneers",
      subtitle: "Porcelain & Composite Covers",
      price: "$350 - $800",
      duration: "90 mins",
      features: [
        "Fixes Gaps & Chips",
        "Custom Porcelain Match",
        "Stain Resistant",
      ],
      badge: "Cosmetic",
    },
    {
      id: 10,
      icon: "bi-telephone-plus",
      title: "Emergency Dental Care",
      subtitle: "24/7 Immediate Pain Relief",
      price: "Varies",
      duration: "Immediate",
      features: [
        "Immediate Relief Treatment",
        "Trauma & Fracture Care",
        "Priority Specialist Access",
      ],
      badge: "24/7 Care",
    },
  ];

  return (
    <div className="py-5 bg-light">
      <div className="container">
        
        <div className="text-center mb-5 bg-primary text-white p-5 rounded-4 shadow-sm">
          <span className="badge bg-white text-primary rounded-pill px-3 py-2 mb-2 fw-bold">
            Full Service Catalog
          </span>
          <h1 className="display-5 fw-bold">
            All Dental Treatments & Services
          </h1>
          <p className="opacity-75 mx-auto fs-6" style={{ maxWidth: "650px" }}>
            We provide 10 comprehensive oral healthcare services for all age
            groups using modern technology.
          </p>
        </div>

        
        <div className="row g-4 justify-content-center">
          {allServices.map((service) => (
            <div className="col-lg-6 col-md-6" key={service.id}>
              <div className="card h-100 border-0 shadow-sm rounded-4 position-relative p-4 bg-white">
                {service.badge && (
                  <span className="position-absolute top-0 end-0 bg-primary text-white badge rounded-pill m-4 px-3 py-2 fs-7">
                    {service.badge}
                  </span>
                )}
                <div className="card-body d-flex flex-column p-2">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div
                      className="bg-primary-subtle text-primary rounded-4 d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: "64px", height: "64px" }}
                    >
                      <i className={`bi ${service.icon} fs-2`}></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-1">{service.title}</h4>
                      <p className="text-muted mb-0 small">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3 mb-4 border">
                    <div>
                      <small className="text-muted d-block fs-7">
                        Estimated Cost
                      </small>
                      <span className="fw-bold text-primary fs-5">
                        {service.price}
                      </span>
                    </div>
                    <div className="text-end">
                      <small className="text-muted d-block fs-7">
                        Duration
                      </small>
                      <span className="fw-semibold text-dark">
                        <i className="bi bi-clock me-1 text-primary"></i>
                        {service.duration}
                      </span>
                    </div>
                  </div>

                  <ul className="list-unstyled text-muted mb-4 flex-grow-1">
                    {service.features.map((item, index) => (
                      <li
                        key={index}
                        className="mb-2 d-flex align-items-center fs-6"
                      >
                        <i className="bi bi-check-circle-fill text-success me-2 fs-5"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/book-appointment"
                    className="btn btn-outline-primary rounded-pill w-100 fw-semibold py-2 mt-auto"
                    onClick={handleBook}
                  >
                    Book Service Now <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
