import React, { useState, useEffect } from "react";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescription, setPrescription] = useState({
    medicines: "",
    advice: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const doctorId = "67890";

  useEffect(() => {
    fetch("http://localhost:3000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/appointments/doctors/${doctorId}`)
      .then((res) => res.json())
      .then((data) => setMyAppointments(data));
  }, [doctorId]);

  const handleAvailabilityToggle = async () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);

    try {
      await fetch(`http://localhost:3000/api/doctors/${doctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: newStatus }),
      });
    } catch (err) {
      console.error("Error updating doctor availability:", err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: newStatus } : item,
          ),
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleSavePrescription = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/appointments/${selectedPatient._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prescription }),
        },
      );

      if (res.ok) {
        const updatedData = await res.json();
        setAppointments((prev) =>
          prev.map((item) =>
            item._id === selectedPatient._id ? { ...item, prescription } : item,
          ),
        );
        alert("Prescription saved successfully!");
        setSelectedPatient(null);
        setPrescription({ medicines: "", advice: "" });
      }
    } catch (err) {
      console.error("Error saving prescription:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredAppointments = appointments.filter((item) => {
    const nameMatch =
      (item.patientName || item.fullName || item.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (item.phone || "").includes(searchTerm) ||
      (item.service || "").toLowerCase().includes(searchTerm.toLowerCase());

    const currentStatus = item.status || "Pending";

    const statusMatch =
      filterStatus === "All" || currentStatus === filterStatus;

    return nameMatch && statusMatch;
  });

  const totalAppointments = appointments.length;
  const pendingRequests = appointments.filter(
    (a) => a.status === "Pending" || !a.status,
  ).length;
  const approvedAppointments = appointments.filter(
    (a) => a.status === "Approved",
  ).length;

  return (
    <div className="container py-4">
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white text-center rounded-3">
            <small className="text-muted fw-bold">TOTAL APPOINTMENTS</small>
            <h2 className="fw-bold text-primary m-0 mt-1">
              {totalAppointments}
            </h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white text-center rounded-3">
            <small className="text-muted fw-bold">PENDING REQUESTS</small>
            <h2 className="fw-bold text-warning m-0 mt-1">{pendingRequests}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 bg-white text-center rounded-3">
            <small className="text-muted fw-bold">APPROVED PATIENTS</small>
            <h2 className="fw-bold text-success m-0 mt-1">
              {approvedAppointments}
            </h2>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-4 bg-white rounded-3 mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-3">
          <h5 className="fw-bold text-dark m-0">
            Patient Appointment Requests
          </h5>

          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-sm border-secondary"
              placeholder="Search by name, phone, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select form-select-sm border-secondary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead className="table-light">
              <tr>
                <th>Patient Name</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((item) => (
                  <tr key={item._id}>
                    <td className="fw-bold text-dark">
                      {item.patientName || item.fullName || item.name}
                    </td>
                    <td>{item.phone || "N/A"}</td>
                    <td>{item.service}</td>
                    <td>
                      {item.message ? (
                        <button
                          className="btn btn-sm btn-outline-info rounded-pill px-2 py-1"
                          onClick={() =>
                            alert(
                              `Message from ${item.fullName || item.patientName}:\n\n${item.message}`,
                            )
                          }
                        >
                          View Message
                        </button>
                      ) : (
                        <span className="text-muted small">N/A</span>
                      )}
                    </td>
                    <td>{item.date}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          item.status === "Approved"
                            ? "bg-success"
                            : item.status === "Cancelled"
                              ? "bg-danger"
                              : "bg-warning text-dark"
                        }`}
                      >
                        {item.status || "Pending"}
                      </span>
                    </td>
                    <td>
                      {item.status !== "Approved" &&
                      item.status !== "Cancelled" ? (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-success btn-sm rounded-pill px-3"
                            onClick={() =>
                              handleStatusUpdate(item._id, "Approved")
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm rounded-pill px-3"
                            onClick={() =>
                              handleStatusUpdate(item._id, "Cancelled")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      ) : item.status === "Approved" ? (
                        <button
                          className="btn btn-outline-primary btn-sm rounded-pill px-3"
                          onClick={() => {
                            setSelectedPatient(item);
                            if (item.prescription)
                              setPrescription(item.prescription);
                          }}
                        >
                          {item.prescription
                            ? "Edit Prescription"
                            : "+ Prescription"}
                        </button>
                      ) : (
                        <span className="text-muted small">Rejected</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPatient && (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div
              className="modal-content p-3 rounded-3 shadow"
              id="printable-modal"
            >
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">
                  Prescription for{" "}
                  {selectedPatient.patientName ||
                    selectedPatient.fullName ||
                    selectedPatient.name}
                </h5>
                <button
                  type="button"
                  className="btn-close d-print-none"
                  onClick={() => setSelectedPatient(null)}
                ></button>
              </div>

              <form onSubmit={handleSavePrescription}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Medicines & Dosage
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="e.g. Paracetamol 500mg - 1+0+1"
                      value={prescription.medicines}
                      onChange={(e) =>
                        setPrescription({
                          ...prescription,
                          medicines: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Special Advice / Instructions
                    </label>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="e.g. Drink plenty of water and rest."
                      value={prescription.advice}
                      onChange={(e) =>
                        setPrescription({
                          ...prescription,
                          advice: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer border-0 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill px-4 d-print-none"
                    onClick={handlePrint}
                  >
                    Print / Save PDF
                  </button>

                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-light rounded-pill px-4 d-print-none"
                      onClick={() => setSelectedPatient(null)}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill px-4 d-print-none"
                    >
                      Save Prescription
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
