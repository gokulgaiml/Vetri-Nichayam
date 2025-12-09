import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone:"",
    role: "user",
  });

  const navigate =useNavigate()
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Register Data:", form);

    try {
      const res =await axios.post("http://localhost:8090/auth/register", form);
console.log(res)
     
        setMsg(res.data.msg || "registered successfully!");
        
      
    } catch (error) {
     
      setMsg("please provide all details");
       console.log(error);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center gap-5" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "2rem" }}>
      
      <div className="card shadow-lg p-5" style={{ width: "450px", borderRadius: "20px", border: "none", background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2" style={{ color: "#667eea", fontSize: "1.8rem" }}>✍️ Create Account</h2>
          <p className="text-muted">Join our healthcare platform</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="form-label fw-500 mb-2" style={{ color: "#333" }}>👤 Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", border: "2px solid #e0e0e0", padding: "0.75rem", fontSize: "0.95rem", transition: "all 0.3s ease" }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="form-label fw-500 mb-2" style={{ color: "#333" }}>📧 Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", border: "2px solid #e0e0e0", padding: "0.75rem", fontSize: "0.95rem", transition: "all 0.3s ease" }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-500 mb-2" style={{ color: "#333" }}>🔐 Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", border: "2px solid #e0e0e0", padding: "0.75rem", fontSize: "0.95rem", transition: "all 0.3s ease" }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="form-label fw-500 mb-2" style={{ color: "#333" }}>☎️ Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              required
              style={{ borderRadius: "10px", border: "2px solid #e0e0e0", padding: "0.75rem", fontSize: "0.95rem", transition: "all 0.3s ease" }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="form-label fw-500 mb-2" style={{ color: "#333" }}>👨‍💼 Register As</label>
            <select
              className="form-select"
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{ borderRadius: "10px", border: "2px solid #e0e0e0", padding: "0.75rem", fontSize: "0.95rem", transition: "all 0.3s ease" }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            >
              <option value="user">👤 User</option>
              <option value="doctor">👨‍⚕️ Doctor</option>
            </select>
          </div>

          {/* Button */}
          <button 
            className="btn w-100 mt-3 fw-bold"
            type="submit"
            style={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
              color: "white", 
              borderRadius: "12px", 
              padding: "0.9rem",
              border: "none",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = "0 6px 25px rgba(102, 126, 234, 0.6)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            🚀 Register
          </button>
        </form>

        {msg && (
          <div 
            className="alert mt-4 mb-0 text-center fw-500"
            style={{ 
              borderRadius: "12px", 
              border: "none",
              background: msg.includes("successfully") || msg.includes("registered") ? "#d4edda" : "#f8d7da",
              color: msg.includes("successfully") || msg.includes("registered") ? "#155724" : "#721c24"
            }}
          >
            {msg}
          </div>
        )}

        <p className="text-center mb-0">
          <span className="text-muted">Already have an account? </span>
          <a 
            onClick={() => { navigate("/") }} 
            className="text-decoration-none fw-bold"
            style={{ color: "#667eea", cursor: "pointer", transition: "all 0.3s ease" }}
            onMouseEnter={(e) => {
              e.target.style.color = "#764ba2";
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#667eea";
              e.target.style.textDecoration = "none";
            }}
          >
            Login here
          </a>
        </p>
      </div>

      <div className="d-none d-lg-block">
        <img 
          src="/images/registerimage.png" 
          alt="registration image" 
          style={{ borderRadius: "15px", boxShadow: "0 10px 40px rgba(0,0,0,0.2)", width: "550px", height: "500px", objectFit: "cover" }} 
        />
      </div>

    </div>
  );
}

export default Register;
