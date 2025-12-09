import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function DoctorCard({ doctor }) {
  const navigate=useNavigate()
const token =useSelector((state)=>{return state.auth.token})


useEffect(()=>{
  if(!token){
    navigate("/")
  }
})

  const bookDoctor=(doctors)=>{
    
    navigate("/Book_Appoint",{state:doctors})
  }

  return (
    <div
      className="card shadow-lg p-4 text-start"
      style={{ 
        width: "100%", 
        minHeight: "420px",
        borderRadius: "15px", 
        border: "none",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
        transition: "all 0.3s ease",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(102, 126, 234, 0.3)";
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div className="d-flex flex-column">
        <div className="text-center mb-3">
          <img 
            src="/images/profile.jfif" 
            className="rounded-circle" 
            alt="doctor photo"
            style={{ width: "100px", height: "100px", objectFit: "cover", border: "4px solid #667eea" }}
          />
        </div>

        <div className="flex-grow-1">
          <h4 className="card-title mb-1 text-center fw-bold" style={{ color: "#667eea", fontSize: "1.3rem" }}>👨‍⚕️ {doctor.doctorName}</h4>
          <p className="text-center text-muted mb-3" style={{ fontSize: "0.9rem" }}>{doctor.speciality}</p>

          <div className="mb-2 p-2" style={{ background: "rgba(102, 126, 234, 0.05)", borderRadius: "8px" }}>
            <p className="mb-1" style={{ fontSize: "0.9rem" }}>
              <strong style={{ color: "#667eea" }}>🎓 Experience:</strong> {doctor.experienceYears} years
            </p>

            <p className="mb-1" style={{ fontSize: "0.9rem" }}>
              <strong style={{ color: "#667eea" }}>💰 Consultation Fee:</strong> <span style={{ color: "#764ba2", fontWeight: "bold" }}>₹{doctor.fees}</span>
            </p>

            <p className="mb-1" style={{ fontSize: "0.9rem" }}>
              <strong style={{ color: "#667eea" }}>☎️ Phone:</strong> {doctor.phone}
            </p>

            <p className="mb-1" style={{ fontSize: "0.9rem" }}>
              <strong style={{ color: "#667eea" }}>📍 Location:</strong> {doctor.location}
            </p>

            <p className="mb-0" style={{ fontSize: "0.9rem" }}>
              <strong style={{ color: "#667eea" }}>🏢 Address:</strong> {doctor.address}, {doctor.district}, {doctor.state} - {doctor.pincode}
            </p>
          </div>

          <div className="text-center mt-4">
            <button 
              className="btn fw-bold"
              onClick={() => { bookDoctor(doctor) }}
              style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "10px",
                padding: "0.6rem 1.5rem",
                border: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              📅 Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
