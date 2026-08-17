import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  
  const user = JSON.parse(localStorage.getItem("user"));

  
  
  const getDashboardPath = () => {
    if (user?.role === "admin") return "/admin";
    if (user?.role === "doctor") return "/doctors";
    if (user?.role === "patient") return "/patients";
    return "/dashboard"; 
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white py-3 border-bottom">
      <div className="container">
        
        <Link
          className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2"
          to="/"
        >
          <i className="bi bi-gear-wide-connected text-primary fs-3"></i>
          <span>Glowdent</span>
        </Link>

        
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-semibold gap-lg-3">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary active" : "text-secondary"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary active" : "text-secondary"}`
                }
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary active" : "text-secondary"}`
                }
              >
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/for-patients"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary active" : "text-secondary"}`
                }
              >
                For Patients
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary active" : "text-secondary"}`
                }
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-primary active" : "text-secondary"}`
                }
              >
                contact
              </NavLink>
            </li>
          </ul>

          
          <div className="d-flex align-items-center gap-2">
            
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="btn btn-primary rounded-pill px-3 py-2 btn-sm"
                >
                  {user.role === "admin" && "Admin-Dashboard"}
                  {user.role === "doctor" && "Doctor-Dashboard"}
                  {user.role === "patient" && "Patient-Dashboard"}
                  {!user.role && "Dashboard"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger rounded-pill px-3 py-2 btn-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              
              <>
                
                <Link
                  to="/login"
                  className="btn btn-outline-primary rounded-pill px-3 py-1 fw-semibold small"
                >
                  Login
                </Link>

                
                <Link
                  to="/register"
                  className="btn btn-primary rounded-pill px-3 py-1 fw-semibold small"
                >
                  Sign In
                </Link>
              </>
            )}

            
            <Link
              to="/book-appointment"
              className="btn btn-primary rounded-pill px-3 py-2 btn-sm"
            >
              Book Appointment <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
