import React from "react";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "bi-speedometer2" },
    { id: "appointments", label: "Appointments", icon: "bi-calendar-check" },
    { id: "doctors", label: "Doctor Directory", icon: "bi-person-badge" },
    { id: "messages", label: "Patient Messages", icon: "bi-envelope" },
  ];

  return (
    <div
      className="d-flex flex-column p-3 bg-white shadow-sm rounded-3 min-vh-100"
      style={{ width: "250px" }}
    >
      <h4 className="fw-bold text-primary mb-4 px-2">Glowdent Admin</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li className="nav-item mb-2" key={item.id}>
            <button
              onClick={() => setActiveTab(item.id)}
              className={`nav-link w-100 text-start d-flex align-items-center gap-2 ${
                activeTab === item.id
                  ? "active bg-primary text-white"
                  : "text-dark"
              }`}
            >
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
