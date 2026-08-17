import React, { useState, useEffect } from "react";
import Lists from "./List";
import AddDoctorForm from "./DoctorForm";
import axios from "axios";
import AdminMessages from "./AdminMessage";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = ({ doctorsData = [] }) => {
  const API_URL = import.meta.env.VITE_API_BASE_URL
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [doctors, setDoctors] = useState(
    Array.isArray(doctorsData) ? doctorsData : [],
  );
  const [patients, setPatients] = useState([]);

  const safeAppointments = Array.isArray(appointments) ? appointments : [];
  const safeDoctors = Array.isArray(doctors) ? doctors : [];

  const totalAppointments = safeAppointments.length;
  const activeDoctors = safeDoctors.filter(
    (doc) => doc.status === "Available",
  ).length;

  const totalRevenue = safeAppointments.reduce((sum, item) => {
    const fee = Number(item.fee || item.consultationFee || item.price || 0);
    return sum + fee;
  }, 0);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setAppointments((prev) =>
          (Array.isArray(prev) ? prev : []).map((app) =>
            app._id === id ? { ...app, status: newStatus } : app,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/api/appointments`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.error("Expected array for appointments, got:", data);
          setAppointments([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setAppointments([]);
      });
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin`);
      if (Array.isArray(response.data)) {
        setDoctors(response.data);
      } else {
        console.error("Expected array for doctors, got:", response.data);
        setDoctors([]);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setDoctors([]);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <div className="d-flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-grow-1 p-4 overflow-hidden">
          <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
            <h4 className="m-0 text-primary fw-bold">
              <i className="fa-solid fa-tooth me-2"></i>Glowdent Admin
            </h4>
            <span className="fw-semibold text-secondary">Dr. Admin</span>
          </div>

          {activeTab === "dashboard" && (
            <>
              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm p-3 bg-white aesthetic-card animate-fade-in">
                    <small className="text-muted">Total Appointments</small>
                    <h3 className="fw-bold">{totalAppointments}</h3>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm p-3 bg-white aesthetic-card animate-fade-in">
                    <small className="text-muted">Active Doctors</small>
                    <h3 className="fw-bold text-success">{activeDoctors}</h3>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm p-3 bg-white aesthetic-card animate-fade-in">
                    <small className="text-muted">New Patients</small>
                    <h3 className="fw-bold mt-1 text-warning">
                      {appointments.length}
                    </h3>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card border-0 shadow-sm p-3 bg-white aesthetic-card animate-fade-in">
                    <small className="text-muted">Total Revenue</small>
                    <h3 className="fw-bold text-primary">${totalRevenue}</h3>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm p-4 bg-white mb-4">
                <h5 className="fw-bold mb-3">Recent Appointments</h5>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="fw-bold">{item.fullName}</div>
                            <small className="text-muted">{item.phone}</small>
                          </td>
                          <td>{item.doctor}</td>
                          <td>{item.service}</td>
                          <td>{item.date}</td>
                          <td>
                            <select
                              value={item.status || "Pending"}
                              onChange={(e) =>
                                handleStatusChange(item._id, e.target.value)
                              }
                              className={`form-select form-select-sm fw-semibold ${
                                item.status === "Approved"
                                  ? "bg-success text-white"
                                  : item.status === "Cancelled"
                                    ? "bg-danger text-white"
                                    : "bg-warning text-dark"
                              }`}
                            >
                              <option
                                value="Pending"
                                className="bg-white text-dark"
                              >
                                Pending
                              </option>
                              <option
                                value="Approved"
                                className="bg-white text-dark"
                              >
                                Approved
                              </option>
                              <option
                                value="Cancelled"
                                className="bg-white text-dark"
                              >
                                Cancelled
                              </option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "appointments" && (
            <div className="card border-0 shadow-sm p-4 bg-white mb-4">
              <h5 className="fw-bold mb-3">All Appointments</h5>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="fw-bold">{item.fullName}</div>
                          <small className="text-muted">{item.phone}</small>
                        </td>
                        <td>{item.doctor}</td>
                        <td>{item.service}</td>
                        <td>{item.date}</td>
                        <td>
                          <select
                            value={item.status || "Pending"}
                            onChange={(e) =>
                              handleStatusChange(item._id, e.target.value)
                            }
                            className={`form-select form-select-sm fw-semibold ${
                              item.status === "Approved"
                                ? "bg-success text-white"
                                : item.status === "Cancelled"
                                  ? "bg-danger text-white"
                                  : "bg-warning text-dark"
                            }`}
                          >
                            <option
                              value="Pending"
                              className="bg-white text-dark"
                            >
                              Pending
                            </option>
                            <option
                              value="Approved"
                              className="bg-white text-dark"
                            >
                              Approved
                            </option>
                            <option
                              value="Cancelled"
                              className="bg-white text-dark"
                            >
                              Cancelled
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "doctors" && (
            <div className="bg-white p-4 rounded shadow-sm">
              <Lists
                doctors={doctors}
                isAdmin={true}
                onAddClick={() => setShowForm(true)}
                fetchDoctors={fetchDoctors}
              />
            </div>
          )}

          {activeTab === "messages" && (
            <div className="bg-white p-4 rounded shadow-sm">
              <AdminMessages />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
