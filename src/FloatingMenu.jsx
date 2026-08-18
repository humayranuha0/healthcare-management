import React, { useState } from "react";

const FloatingMenu = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "appointments", label: "Appointments", icon: "📅" },
    { id: "doctors", label: "Doctor Directory", icon: "👨‍⚕️" },
    { id: "messages", label: "Patient Messages", icon: "💬" },
  ];

  return (
    <div className="d-md-none position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
      {isOpen && (
        <div className="bg-white p-2 rounded-3 shadow-lg mb-2 d-flex flex-column gap-2 border">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`btn btn-sm text-start d-flex align-items-center gap-2 ${
                activeTab === item.id ? "btn-primary" : "btn-light"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-primary rounded-circle shadow p-3 d-flex align-items-center justify-content-center ms-auto"
        style={{ width: "50px", height: "50px" }}
      >
       {isOpen ? (
  <i className="bi bi-x-lg fs-4"></i>
) : (
  <i className="bi bi-gear-fill fs-4"></i>
)}
      </button>
    </div>
  );
};
export default FloatingMenu;