import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navber from "./Navber";
import Home from "./Home";
import AdminDashboard from "./AdminDeshboard";
import About from "./About";
import PatientsPage from "./PatientPage";
import Appointment from "./Appointment";
import Footer from "./Footer";
import DoctorForm from "./DoctorForm";
import axios from "axios";
import Services from "./Services";
import Contact from "./Contact";
import DoctorDashboard from "./DoctorDashboard";
import AuthPage from "./AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import Blog from "./Blog";
import ForPatients from "./ForPatients";
import ServicesPage from "./ServicesPage";
import Doctors from "./Doctors";
import DoctorDetails from "./DoctorDetails";
import AddDoctor from "./DoctorForm";

const App = () => {
  const [doctorsData, setDoctorsData] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin");
      setDoctorsData(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navber />
      <main className="flex-grow-1">
        <Routes>
          
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/for-patients" element={<ForPatients />} />
          <Route path="/doctorsList" element={<Doctors />} />
          <Route path="/doctor/:id" element={<DoctorDetails />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard
                  doctorsData={doctorsData}
                  fetchDoctors={fetchDoctors}
                />
              </ProtectedRoute>
            }
          />
          
          
          <Route
            path="/book-appointment"
            element={
              <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
                <Appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute allowedRoles={["patient", "admin"]}>
                <PatientsPage doctorsData={doctorsData} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients/doctors/:id"
            element={
              <ProtectedRoute allowedRoles={["patient", "doctor", "admin"]}>
                <PatientsPage doctorsData={doctorsData} />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/doctors"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
