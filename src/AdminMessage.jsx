import React, { useEffect, useState } from "react";

const AdminMessages = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));
  }, []);

  return (
    <div className="card shadow-sm border-0 rounded-3 p-4 my-4">
      <h4 className="fw-bold text-dark mb-3">Patient Inquiries & Messages</h4>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Patient</th>
              <th>Contact</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td className="fw-semibold">{msg.name}</td>
                <td>
                  <small className="d-block text-muted">{msg.email}</small>
                  <small className="text-muted">{msg.phone}</small>
                </td>
                <td>
                  <span className="badge bg-info text-dark">{msg.subject}</span>
                </td>
                <td style={{ maxWidth: "250px" }} className="text-truncate">
                  {msg.message}
                </td>
                <td className="text-muted">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessages;
