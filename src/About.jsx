import React, { useState } from "react";

const AboutSection = () => {
  
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section className="py-5 bg-white" id="aboutus">
      <div className="container">
        <div className="row align-items-center g-4">
          
          <div className="col-lg-6 position-relative">
            <div className="position-relative rounded-4 overflow-hidden shadow about-img-container">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format"
                alt="Doctor"
                className="img-fluid w-100 object-fit-cover"
                style={{ maxHeight: "450px" }}
              />
              <div className="badge-box position-absolute top-0 start-0 bg-primary text-white p-4 rounded-3 m-3">
                <h2 className="fw-bold mb-0">15+</h2>
                <small>
                  Years of Quality
                  <br />
                  Healthcare Experience
                </small>
              </div>
            </div>
          </div>

          
          <div className="col-lg-6">
            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-2">
              About Glowdent
            </span>
            <h2 className="display-6 fw-bold mb-3">
              We Are Committed To Your Health & Happy Smiles
            </h2>
            <p className="text-muted mb-4">
              At Glowdent, we combine state-of-the-art medical technology with
              compassionate care.
            </p>

            
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <div className="feature-card p-3 bg-light rounded-4 d-flex align-items-center gap-3">
                  <i className="bi bi-award-fill text-primary fs-3"></i>
                  <div>
                    <h6 className="fw-bold mb-0">Certified Doctors</h6>
                    <small className="text-muted">Top Specialists</small>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="feature-card p-3 bg-light rounded-4 d-flex align-items-center gap-3">
                  <i className="bi bi-clock-fill text-primary fs-3"></i>
                  <div>
                    <h6 className="fw-bold mb-0">24/7 Support</h6>
                    <small className="text-muted">Emergency Care</small>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="feature-card p-3 bg-light rounded-4 d-flex align-items-center gap-3">
                  <i className="bi bi-cpu-fill text-primary fs-3"></i>
                  <div>
                    <h6 className="fw-bold mb-0">Modern Tech</h6>
                    <small className="text-muted">Advanced Care</small>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="feature-card p-3 bg-light rounded-4 d-flex align-items-center gap-3">
                  <i className="bi bi-wallet2 text-primary fs-3"></i>
                  <div>
                    <h6 className="fw-bold mb-0">Affordable</h6>
                    <small className="text-muted">Fair Pricing</small>
                  </div>
                </div>
              </div>
            </div>

            
            <button
              className="btn btn-primary rounded-pill px-4 py-2 fw-semibold btn-learn-more"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Show Less ↑" : "Learn More About Us →"}
            </button>
          </div>
        </div>

        
        {showDetails && (
          <div className="row mt-5 pt-4 border-top g-4 animate__animated animate__fadeIn">
            <div className="col-md-4">
              <div className="p-4 bg-light rounded-4 h-100 feature-card">
                <i className="bi bi-bullseye text-primary fs-2 mb-2 d-block"></i>
                <h5 className="fw-bold">Our Mission</h5>
                <p className="text-muted small mb-0">
                  To provide accessible, painless, and modern dental solutions
                  for patients of all ages.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-light rounded-4 h-100 feature-card">
                <i className="bi bi-eye-fill text-primary fs-2 mb-2 d-block"></i>
                <h5 className="fw-bold">Our Vision</h5>
                <p className="text-muted small mb-0">
                  To be the leading dental care provider recognized globally for
                  excellence and trust.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 bg-light rounded-4 h-100 feature-card">
                <i className="bi bi-shield-check text-primary fs-2 mb-2 d-block"></i>
                <h5 className="fw-bold">100% Hygienic</h5>
                <p className="text-muted small mb-0">
                  We follow strict international sterilization standards and
                  medical protocols to guarantee complete safety.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
