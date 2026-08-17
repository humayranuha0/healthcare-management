import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorCards = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const handleBookVisit = (doctor) => {
    if (doctor.status === "On Leave") {
      alert("This doctor is currently unavailable.");
      return;
    }
    navigate("/book-appointment", {
      state: {
        doctorName: doctor.name,
        specialty: doctor.specialty,
      },
    });
  };

  useEffect(() => {
    fetch(`${API_URL}/api/doctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error loading doctors:", err));
  }, []);

  return (
    <div className="container py-5">
      <div className="row g-4">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              
              <div className="position-relative">
                <img
                  src={
                    doctor.image?.replace("htthttps://", "https://") ||
                    "https://via.placeholder.com/300"
                  }
                  alt={doctor.name}
                  className="card-img-top"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <span
                  className={`position-absolute top-0 end-0 m-3 badge rounded-pill ${
                    doctor.status === "Available"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {doctor.status || "Available"}
                </span>
              </div>

              
              <div className="card-body d-flex flex-column text-center p-3">
                <h5 className="fw-bold mb-1 text-dark">{doctor.name}</h5>
                <p className="text-primary fw-semibold small mb-2">
                  {doctor.specialty}
                </p>

                
                <div className="bg-light p-3 rounded-3 small text-start mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Phone:</span>
                    <span className="fw-medium">{doctor.phone}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Experience:</span>
                    <span className="fw-medium">{doctor.experience} yrs</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Schedule:</span>
                    <span className="fw-medium">{doctor.schedule}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Fee:</span>
                    <span className="fw-bold text-success">${doctor.fee}</span>
                  </div>
                </div>

                
                <button
                  className={`btn btn-sm rounded-pill px-3 ${
                    doctor.status === "Not Available"
                      ? "btn-secondary"
                      : "btn-primary"
                  }`}
                  disabled={doctor.status === "Not Available"}
                  onClick={() => handleBookVisit(doctor)}
                >
                  {doctor.status === "Not Available"
                    ? "Unavailable"
                    : "Book Visit"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorCards;
