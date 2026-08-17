import React, { useState } from "react";

const Hero = () => {
  
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center g-4">
          
          <div className="col-lg-6">
            
            <div className="mb-3">
              <span className="badge bg-primary rounded-pill px-3 py-2 me-2">
                New
              </span>
              <span className="text-secondary fw-semibold small">
                Trusted by 10K+ Patients
              </span>
            </div>

            
            <h1 className="display-4 fw-bold mb-3">
              Healthy Smiles, <br />
              <span className="text-primary">Happier Lives.</span>
            </h1>

            
            <p className="lead text-muted mb-4 fs-6">
              Gentle care, advanced technology, and a team that truly cares.
              Your smile is our absolute priority.
            </p>

            
            <div className="d-flex align-items-center gap-3 mb-4">
              <a
                href="/book-appointment"
                className="btn btn-primary rounded-pill px-4 py-2"
              >
                Book an Appointment <i className="bi bi-arrow-right ms-1"></i>
              </a>

              
              <button
                type="button"
                className="btn btn-white bg-white border rounded-pill px-4 py-2 shadow-sm d-flex align-items-center gap-2"
                onClick={() => setShowVideo(true)}
              >
                <i className="bi bi-play-circle-fill text-primary fs-5"></i>
                Watch Video
              </button>
            </div>

            
            <div className="d-flex gap-4 pt-2">
              <div className="d-flex align-items-center gap-2 text-muted fw-semibold">
                <i className="bi bi-check-circle-fill text-primary"></i>
                Comprehensive Care
              </div>
              <div className="d-flex align-items-center gap-2 text-muted fw-semibold">
                <i className="bi bi-cpu-fill text-primary"></i>
                Advanced Tech
              </div>
            </div>
          </div>

          
          <div className="col-lg-6 position-relative">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000&auto=format&fit=crop"
                alt="Friendly Dentist Doctor"
                className="img-fluid rounded-4 shadow-lg animate-float"
                style={{ maxHeight: "480px" }}
              />

              
              <div className="position-absolute bottom-0 start-0 m-3 p-3 bg-white rounded-4 shadow-lg d-flex align-items-center gap-3">
                <div className="bg-primary-subtle text-primary p-3 rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-emoji-smile fs-3"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-0 text-dark">99%</h5>
                  <small className="text-muted fw-semibold">
                    Positive Reviews
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {showVideo && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark border-0 rounded-4 overflow-hidden shadow-lg">
              
              <div className="modal-header border-0 pb-0">
                <button
                  type="button"
                  className="btn-close btn-close-white ms-auto"
                  onClick={() => setShowVideo(false)}
                ></button>
              </div>

              
              <div className="modal-body p-3">
                <div className="ratio ratio-16x9 rounded-3 overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/GoPD6SHO3z0"
                    title="Dental Care Video"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
