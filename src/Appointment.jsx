import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Appointment = () => {
  const location = useLocation();
  const preSelectedDoctor = location.state?.doctorName || "";

  const [service, setService] = useState("");

  useEffect(() => {
    if (location.state?.serviceName) {
      setService(location.state.serviceName);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    service: "Dental Checkup",
    date: "",
    message: "",
    doctor: preSelectedDoctor,
    doctorId: preSelectedDoctor._id, 
  doctorName: preSelectedDoctor.name 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Appointment Submitted Successfully!");

        navigate("/patients");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };
  return (
    <section className="py-5 bg-light">
      <div className="container py-lg-4">
        <div className="bg-white rounded-4 shadow-sm p-4 p-md-5">
          <div className="row align-items-center gy-4">
            <div className="col-lg-5">
              <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-semibold mb-2">
                Book A Visit
              </span>
              <h2 className="fw-bold text-dark display-6 mb-3">
                Schedule Your Dental Checkup Today
              </h2>
              <p className="text-muted mb-4">
                Fill out the form and our team will get back to you within 24
                hours to confirm your appointment.
              </p>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary-subtle text-primary p-3 rounded-circle fs-5">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Our Location</h6>
                    <small className="text-muted">
                      123 Health Ave, Medical Zone
                    </small>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="bg-primary-subtle text-primary p-3 rounded-circle fs-5">
                    <i className="bi bi-clock-fill"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-0">Working Hours</h6>
                    <small className="text-muted">
                      Mon - Sat: 9:00 AM - 8:00 PM
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control rounded-3 p-2.5"
                    placeholder="John Doe"
                    onChange={handleChange}
                    value={formData.fullName}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control rounded-3 p-2.5"
                    placeholder="(123) 456-7890"
                    onChange={handleChange}
                    value={formData.phone}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    Select Service
                  </label>
                  <select
                       type="select"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-control fw-semibold text-secondary "
                  >
                   <option value="">Choose Service...</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Gynecology">Gynecology</option>
                      <option value="Psychiatry">Psychiatry</option>
                      <option value="General Physician">
                        General Physician
                      </option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold text-secondary">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="form-control rounded-3 p-2.5"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <div className="alert alert-info py-2 mb-0">
                    Booking with: <strong>{formData.doctor}</strong>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold text-secondary">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    className="form-control rounded-3 p-2.5"
                    rows="3"
                    placeholder="Tell us briefly about your issue..."
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-pill w-100 fs-6 fw-semibold mt-2"
                  >
                    Confirm Appointment{" "}
                    <i className="bi bi-arrow-right ms-1"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
