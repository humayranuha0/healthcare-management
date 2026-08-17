import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!doctor)
    return <div className="text-center py-5">Loading doctor details...</div>;

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden p-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="img-fluid rounded-4 shadow-sm"
            />
          </div>
          <div className="col-md-8">
            <h2 className="fw-bold">{doctor.name}</h2>
            <p className="text-primary fw-semibold fs-5">{doctor.specialty}</p>
            <p className="text-muted">Experience: {doctor.experience} years</p>
            <p className="text-muted">
              Schedule: {doctor.schedule || "Mon - Wed"}
            </p>
            <p className="fw-bold fs-5">Consultation Fee: ${doctor.fee}</p>

            <button
              onClick={() =>
                navigate(
                  `/book-appointment?doctor=${encodeURIComponent(doctor.name)}`,
                )
              }
              className="btn btn-primary rounded-pill px-4 py-2 mt-3"
            >
              Book Appointment with {doctor.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
