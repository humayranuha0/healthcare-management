import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDoctorForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    fee: "",
    status: "",
    schedule: "",
    phone: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Doctor Added successfully");
        dialogRef.current.showModal();
        onSuccess();
        setFormData({
          name: "",
          specialty: "",
          experience: "",
          phone: "",
          image: "",
        });
        onClose();
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body p-4 p-md-5">
              <h3 className="text-primary text-center fw-bold mb-4">
                Add a New Doctor
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Dr. John Doe"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Specialty</label>
                    <select
                      className="form-select"
                      required
                      defaultWithValue=""
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                    >
                      <option value="">Choose Specialty...</option>
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
                    <label className="form-label fw-semibold">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="5"
                      min="0"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Consultation Fee
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="500"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status</label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Status</option>
                      <option value="Available">Available</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Schedule</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mon - Wed (7-9 PM)"
                      name="schedule"
                      value={formData.schedule}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label fw-bold">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      className="form-control"
                      placeholder="https://example.com/doctor-photo.jpg"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Phone Number</label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      placeholder="+1 555-0192"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-between gap-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-4 fw-bold shadow-sm "
                      onClick={onSuccess}
                    >
                      Add Doctor
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark w-100 py-2 fw-bold shadow-sm "
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctorForm;
