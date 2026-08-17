
import React, { useState, useEffect } from "react";
import Lists from "./List";

const PatientsPage = ({ doctorsData, fetchDoctors }) => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  useEffect(() => {
    
    fetch("http://localhost:3000/api/patient/appointments")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setAppointments([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setAppointments([]);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/appointments/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Cancelled" }),
          },
        );

        if (res.ok) {
          setAppointments((prev) =>
            prev.map((item) =>
              item._id === id ? { ...item, status: "Cancelled" } : item,
            ),
          );
        }
      } catch (err) {
        console.error("Error cancelling appointment:", err);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totalBookings = appointments.length;
  const approvedVisits = appointments.filter(
    (a) => a.status === "Approved",
  ).length;
  const pendingVisits = appointments.filter(
    (a) => a.status === "Pending" || !a.status,
  ).length;

  const filteredAppointments = appointments.filter((item) => {
    const matchesStatus =
      filterStatus === "All" || (item.status || "Pending") === filterStatus;
    const matchesSearch =
      doctorsData
        ?.find((d) => d._id === item.doctor)
        ?.name?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (item.service &&
        item.service.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container py-4">
      
      <div className="bg-white p-4 rounded-3 shadow-sm mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h3 className="fw-bold text-primary m-0">Welcome!</h3>
          <p className="text-muted m-0 small">
            Manage your health schedule and view prescriptions.
          </p>
        </div>
        <button
          className="btn btn-outline-primary btn-sm rounded-pill px-3"
          onClick={() => setActiveTab("doctors")}
        >
          <i className="bi bi-plus-lg me-1"></i> Book New Visit
        </button>
      </div>

      
      <div className="d-flex justify-content-center mb-4">
        <ul className="nav nav-pills bg-white p-1 rounded-pill shadow-sm">
          <li className="nav-item">
            <button
              className={`nav-link rounded-pill px-4 ${activeTab === "appointments" ? "active fw-bold" : "text-dark"}`}
              onClick={() => setActiveTab("appointments")}
            >
              My Appointments
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link rounded-pill px-4 ${activeTab === "doctors" ? "active fw-bold" : "text-dark"}`}
              onClick={() => setActiveTab("doctors")}
            >
              Doctor Directory
            </button>
          </li>
        </ul>
      </div>

      {activeTab === "appointments" ? (
        <>
          
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-3 bg-white text-center rounded-3">
                <small className="text-muted fw-bold">TOTAL BOOKINGS</small>
                <h2 className="fw-bold text-primary m-0 mt-1">
                  {totalBookings}
                </h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-3 bg-white text-center rounded-3">
                <small className="text-muted fw-bold">APPROVED VISITS</small>
                <h2 className="fw-bold text-success m-0 mt-1">
                  {approvedVisits}
                </h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm p-3 bg-white text-center rounded-3">
                <small className="text-muted fw-bold">PENDING APPROVALS</small>
                <h2 className="fw-bold text-warning m-0 mt-1">
                  {pendingVisits}
                </h2>
              </div>
            </div>
          </div>

          
          <div className="card border-0 shadow-sm p-4 bg-white rounded-3">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
              <h5 className="fw-bold text-dark m-0">Appointment History</h5>

              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-select form-select-sm border-secondary"
                  placeholder="Search doctor or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ minWidth: "200px" }}
                />

                <select
                  className="form-select form-select-sm w-auto fw-semibold border-secondary"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Status</option>
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
                    <th>Doctor Name</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Prescription</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((item) => (
                      <tr key={item._id}>
                        <td className="fw-bold text-dark">{item.doctor}</td>
                        <td>{item.service}</td>
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
                          {item.prescription && item.prescription.medicines ? (
                            <button
                              className="btn btn-sm btn-outline-info rounded-pill px-3"
                              onClick={() => setSelectedPrescription(item)}
                            >
                              View Prescription
                            </button>
                          ) : (
                            <span className="text-muted small">
                              Not Available
                            </span>
                          )}
                        </td>
                        <td>
                          {item.status !== "Cancelled" ? (
                            <button
                              className="btn btn-outline-danger btn-sm rounded-pill px-3"
                              onClick={() => handleCancel(item._id)}
                            >
                              Cancel
                            </button>
                          ) : (
                            <span className="text-muted small">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="text-muted">
                          <p className="fs-5 fw-semibold mb-1">
                            No appointments found!
                          </p>
                          <p className="small mb-3">
                            Try clearing search filters or book a new visit.
                          </p>
                          <button
                            className="btn btn-primary btn-sm rounded-pill px-4"
                            onClick={() => setActiveTab("doctors")}
                          >
                            Book an Appointment
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Lists
            doctors={doctorsData}
            isAdmin={false}
            fetchDoctors={fetchDoctors}
          />
        </div>
      )}

      
      {selectedPrescription && (
        <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content p-4 rounded-3 shadow"
              id="printable-area"
            >
              <div className="border-bottom pb-3 mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="fw-bold text-primary m-0">
                    Medical Prescription
                  </h4>
                  <small className="text-muted">
                    Healthcare Management System
                  </small>
                </div>
                <button
                  type="button"
                  className="btn-close d-print-none"
                  onClick={() => setSelectedPrescription(null)}
                ></button>
              </div>

              <div className="mb-3">
                <p className="mb-1">
                  <strong>Patient Name:</strong> {selectedPrescription.fullName}
                </p>
                <p className="mb-1">
                  <strong>Doctor:</strong>{" "}
                  {doctorsData?.find(
                    (doc) => doc._id === selectedPrescription?.doctor,
                  )?.name ||
                    selectedPrescription?.doctor ||
                    "N/A"}
                </p>
                <p className="mb-1">
                  <strong>Service:</strong> {selectedPrescription.service}
                </p>
                <p className="mb-1">
                  <strong>Date:</strong> {selectedPrescription.date}
                </p>
              </div>

              <hr />

              <div className="mb-3">
                <h6 className="fw-bold text-secondary">Rx / Medicines:</h6>
                <p className="bg-light p-3 rounded text-dark whitespace-pre-line">
                  {selectedPrescription.prescription.medicines}
                </p>
              </div>

              {selectedPrescription.prescription.advice && (
                <div className="mb-3">
                  <h6 className="fw-bold text-secondary">
                    Advice / Instructions:
                  </h6>
                  <p className="bg-light p-3 rounded text-dark">
                    {selectedPrescription.prescription.advice}
                  </p>
                </div>
              )}

              <div className="d-flex justify-content-end gap-2 mt-4 d-print-none">
                <button
                  className="btn btn-secondary rounded-pill px-4"
                  onClick={() => setSelectedPrescription(null)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={handlePrint}
                >
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
