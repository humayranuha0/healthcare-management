import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Lists = ({ isAdmin, doctors = [], onAddClick, fetchDoctors }) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [editingDoctor, setEditingDoctor] = useState(null);
  const navigate = useNavigate();

  const handleBookVisit = (doctor) => {
    navigate("/book-appointment", {
      state: {
        doctorName: doctor.name,
        specialty: doctor.specialty,
      },
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await axios.delete(`${API_URL}/api/admin/${id}`);

        fetchDoctors();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };
  const handleEdit = (doctor) => {
    console.log("Editing doctor:", doctor);
    setEditingDoctor(doctor);
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
      `${API_URL}/api/admin/${editingDoctor._id}`,
        editingDoctor,
      );
      setEditingDoctor(null);
      fetchDoctors();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white"
        id="for-patient"
      >
        <div className="p-3 d-flex justify-content-between align-items-center border-bottom">
          <div>
            <h5 className="fw-bold m-0 text-dark">Doctor Directory</h5>
            <small className="text-muted">
              Manage your clinic specialists and schedules
            </small>
          </div>
          {isAdmin && (
            <Link to="/add-doctor" className="btn btn-primary">
              + Add Doctor
            </Link>
          )}
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-secondary">
              <tr
                style={{
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                <th className="py-3 ps-4 border-0">Doctor</th>
                <th className="py-3 border-0">Specialty</th>
                <th className="py-3 border-0">Experience</th>
                <th className="py-3 border-0">Schedule</th>
                <th className="py-3 border-0">Fee</th>
                <th className="py-3 border-0">Status</th>
                <th className="py-3 pe-4 border-0 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors &&
                doctors.map((doc) => (
                  <tr key={doc._id} style={{ transition: "all 0.2s" }}>
                    <td className="ps-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="rounded-circle shadow-sm object-fit-cover"
                          width="42"
                          height="42"
                        />

                        <div>
                          <h6
                            className="fw-bold mb-0 text-dark"
                            style={{ fontSize: "0.95rem" }}
                          >
                            {doc.name}
                          </h6>
                          <small
                            className="text-muted"
                            style={{ fontSize: "0.8rem" }}
                          >
                            {doc.phone || "+1 555-0192"}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span
                        className="fw-medium text-secondary"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {doc.specialty}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-light text-dark fw-normal px-2 py-1 rounded">
                        {doc.experience}
                      </span>
                    </td>

                    <td className="text-muted" style={{ fontSize: "0.85rem" }}>
                      <i className="fa-regular fa-clock me-1 text-primary"></i>
                      {doc.schedule}
                    </td>

                    <td className="fw-bold text-dark">{doc.fee}</td>

                    <td>
                      {doc.status === "Available" ? (
                        <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-semibold">
                          ● Available
                        </span>
                      ) : (
                        <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill fw-semibold">
                          ● Not Available
                        </span>
                      )}
                    </td>

                    <td className="pe-4 text-end">
                      {isAdmin ? (
                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            className="btn btn-sm btn-white rounded-circle"
                            style={{ width: "32px", height: "32px" }}
                            onClick={() => handleEdit(doc)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-white border text-danger rounded-circle"
                            style={{ width: "32px", height: "32px" }}
                            title="Delete"
                            onClick={() => handleDelete(doc._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm btn-primary rounded-pill px-3"
                          onClick={() => handleBookVisit(doc)}
                        >
                          Book Visit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingDoctor && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <h5>Edit Doctor</h5>
              <form onSubmit={handleUpdateSubmit}>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editingDoctor.name}
                  onChange={(e) =>
                    setEditingDoctor({ ...editingDoctor, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editingDoctor.specialty}
                  onChange={(e) =>
                    setEditingDoctor({
                      ...editingDoctor,
                      specialty: e.target.value,
                    })
                  }
                />

                <div className="d-flex gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingDoctor(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Lists;
