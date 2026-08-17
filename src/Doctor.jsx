import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useScrollReveal from "./useScrollReveal";

const Doctor = () => {
  useScrollReveal();
  const doctorsList = [
    {
      id: 1,
      name: "Dr. Sarah Jenkins",
      specialty: "Cosmetic Dentist",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
      experience: "10+ Years Exp.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Orthodontist Specialist",
      image:
        "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?auto=format&fit=crop&q=80&w=600",
      experience: "8+ Years Exp.",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatric Dentist",
      image:
        "https://plus.unsplash.com/premium_photo-1681966907271-1e350ec3bb95?auto=format&fit=crop&q=60&w=600",
      experience: "12+ Years Exp.",
    },
  ];

  const navigate = useNavigate();

  const handleBookVisit = (doctor) => {
    navigate("/book-appointment", {
      state: {
        doctorName: doctor.name,
        specialty: doctor.specialty,
      },
    });
  };
  return (
    <section className="py-5 bg-light">
      <div className="container py-lg-4">
        
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold">
            Our Specialists
          </span>
          <h2 className="fw-bold text-dark display-6 mb-3">
            Meet Our Expert Dentists
          </h2>
          <p className="text-muted">
            Dedicated professionals committed to providing top-tier oral care
            with a gentle touch.
          </p>
        </div>

        
        <div className="row g-4">
          {doctorsList.map((doctor) => (
            <div key={doctor.id} className="col-lg-4 col-md-6">
              <div className="card doctor-card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: "320px" }}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-100 h-100 object-fit-cover doctor-img"
                  />
                  <span className="badge bg-white text-primary shadow-sm position-absolute top-0 end-0 m-3 rounded-pill px-3 py-2">
                    {doctor.experience}
                  </span>
                </div>

                
                <div className="card-body p-4 text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold text-dark mb-1">{doctor.name}</h5>
                    <p className="text-primary small fw-semibold mb-3">
                      {doctor.specialty}
                    </p>
                  </div>

                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-primary btn-sm rounded-pill px-4 py-2 btn-hover-pulse"
                      onClick={() => handleBookNow && handleBookNow(doctor)}
                    >
                      Book <i className="bi bi-calendar-event ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-5">
          <Link
            to="/doctorsList"
            className="btn btn-primary rounded-pill px-4 py-2 shadow-sm btn-hover-pulse"
          >
            View All Specialists &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Doctor;
