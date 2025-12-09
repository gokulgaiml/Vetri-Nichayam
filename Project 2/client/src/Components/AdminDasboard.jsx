import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.auth.token;
  });

  const loadAppoints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8090/appointment/get-apps",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments(res.data.Appointment);
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    loadAppoints();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  return (
    <div className="container-fluid" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "3rem" }}>
      <div className="container">
        <div className="mb-5 text-center">
          <h1 className="fw-bold mb-2" style={{ color: "#667eea", fontSize: "2.5rem" }}>🏥 Admin Dashboard</h1>
          <p className="text-muted" style={{ fontSize: "1.1rem" }}>Monitor all appointments across the system</p>
        </div>

        <div className="card shadow-lg" style={{ borderRadius: "15px", border: "none", background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)", overflow: "hidden" }}>
          <div className="card-body p-4">
            <h5 className="card-title mb-4 fw-bold" style={{ color: "#667eea", fontSize: "1.3rem" }}>📋 All Appointments</h5>

            <div style={{ overflowX: "auto" }}>
              <table className="table mb-0" style={{ borderCollapse: "separate", borderSpacing: "0" }}>
                <thead>
                  <tr style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
                    <th style={{ color: "white", padding: "1rem", fontSize: "0.95rem", fontWeight: "600", borderRadius: "10px 0 0 0", textAlign: "center" }}>🆔 ID</th>
                    <th style={{ color: "white", padding: "1rem", fontSize: "0.95rem", fontWeight: "600", textAlign: "center" }}>👤 Patient</th>
                    <th style={{ color: "white", padding: "1rem", fontSize: "0.95rem", fontWeight: "600", textAlign: "center" }}>👨‍⚕️ Doctor</th>
                    <th style={{ color: "white", padding: "1rem", fontSize: "0.95rem", fontWeight: "600", textAlign: "center" }}>📅 Date</th>
                    <th style={{ color: "white", padding: "1rem", fontSize: "0.95rem", fontWeight: "600", textAlign: "center" }}>🕐 Time</th>
                    <th style={{ color: "white", padding: "1rem", fontSize: "0.95rem", fontWeight: "600", borderRadius: "0 10px 0 0", textAlign: "center" }}>✅ Status</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((app, index) => (
                    <tr 
                      key={index}
                      style={{ 
                        borderBottom: "1px solid #e0e0e0",
                        transition: "all 0.3s ease",
                        background: index % 2 === 0 ? "rgba(102, 126, 234, 0.02)" : "white"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(102, 126, 234, 0.08)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "rgba(102, 126, 234, 0.02)" : "white"}
                    >
                      <td style={{ padding: "1rem", textAlign: "center", fontSize: "0.85rem", color: "#666", fontFamily: "monospace" }}>
                        {app._id.substring(0, 8)}...
                      </td>

                      <td style={{ padding: "1rem", textAlign: "center", fontWeight: "500", color: "#667eea" }}>
                        {app.patientId ? (
                          <>
                            {app.PatientName}
                          </>
                        ) : (
                          <span style={{ color: "#999" }}>Unknown User</span>
                        )}
                      </td>

                      <td style={{ padding: "1rem", textAlign: "center", fontWeight: "500", color: "#667eea" }}>
                        {app.doctorId ? app.doctorName : <span style={{ color: "#999" }}>Unknown Doctor</span>}
                      </td>

                      <td style={{ padding: "1rem", textAlign: "center", fontSize: "0.95rem", color: "#333" }}>
                        {new Date(app.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>

                      <td style={{ padding: "1rem", textAlign: "center", fontSize: "0.95rem", color: "#333", fontWeight: "500" }}>
                        {app.time}
                      </td>

                      <td style={{ padding: "1rem", textAlign: "center" }}>
                        <span
                          style={{
                            padding: "0.5rem 1rem",
                            borderRadius: "25px",
                            fontSize: "0.85rem",
                            fontWeight: "600",
                            display: "inline-block",
                            background: 
                              app.status === "pending"
                                ? "rgba(255, 193, 7, 0.2)"
                                : app.status === "completed"
                                ? "rgba(76, 175, 80, 0.2)"
                                : app.status === "confirmed"
                                ? "rgba(76, 175, 80, 0.2)"
                                : "rgba(244, 67, 54, 0.2)",
                            color:
                              app.status === "pending"
                                ? "#ffc107"
                                : app.status === "completed"
                                ? "#4caf50"
                                : app.status === "confirmed"
                                ? "#4caf50"
                                : "#f44336"
                          }}
                        >
                          {app.status === "pending" ? "⏳" : app.status === "completed" ? "✅" : app.status === "confirmed" ? "✔️" : "❌"} {app.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {appointments.length === 0 && (
              <div className="text-center py-5">
                <p style={{ color: "#999", fontSize: "1.1rem" }}>📭 No appointments found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
