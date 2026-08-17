import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4 pb-4 border-bottom border-secondary">
          <div className="col-lg-4 col-md-6">
            <a
              className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2 text-white mb-3"
              href="#"
            >
              <i className="bi bi-gear-wide-connected text-primary fs-3"></i>
              <span>Glowdent</span>
            </a>
            <p className="text-secondary small">
              Providing modern, compassionate, and expert dental care to bring
              out your healthiest, brightest smile.
            </p>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li>
                {" "}
                <a className=" text-secondary text-decoration-none " href="/">
                  Home
                </a>
              </li>
              <li>
                {" "}
                <a
                  className=" text-secondary text-decoration-none "
                  href="/about"
                >
                  About Us
                </a>
              </li>
              <li>
                {" "}
                <a
                  className=" text-secondary text-decoration-none "
                  href="/services"
                >
                  Services
                </a>
              </li>
              <li>
                {" "}
                <a
                  className=" text-secondary text-decoration-none "
                  href="/doctorsList"
                >
                  Doctors
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3">Our Services</h6>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li>
                <a href="#" className="text-secondary text-decoration-none">
                  Teeth Whitening
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary text-decoration-none">
                  Dental Implants
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary text-decoration-none">
                  Root Canal Treatment
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary text-decoration-none">
                  Braces & Aligners
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3">Contact Us</h6>
            <p className="text-secondary small mb-1">
              <i className="bi bi-telephone text-primary me-2"></i> (123)
              456-7890
            </p>
            <p className="text-secondary small mb-3">
              <i className="bi bi-envelope text-primary me-2"></i>{" "}
              info@glowdent.com
            </p>

            <div className="d-flex gap-2">
              <a
                href="#"
                className="btn btn-outline-secondary btn-sm rounded-circle text-white"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="btn btn-outline-secondary btn-sm rounded-circle text-white"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="#"
                className="btn btn-outline-secondary btn-sm rounded-circle text-white"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-3 text-secondary small">
          <p className="m-0">
            © {new Date().getFullYear()} Glowdent Dental Clinic. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
