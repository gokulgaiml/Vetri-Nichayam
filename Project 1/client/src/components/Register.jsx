import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate=useNavigate()

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/user/register", user);
      setMsg(res.data.msg || "Registered successfully!");
    } catch (err) {
      setMsg("Registration failed. Try again.");
      console.log(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
      className="register-container fade-in"
    >
      {/* Animated background elements */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      {/* REGISTER FORM CARD */}
      <div
        className="register-card"
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "50px 40px",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(102,126,234,0.2)",
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Icon container with enhanced styling */}
        <div 
          className="icon-wrapper"
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            marginBottom: 28,
            perspective: "1000px",
          }}
        >
          <div
            aria-hidden="true"
            className="icon-box"
            style={{
              width: 80,
              height: 80,
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontSize: 40,
              boxShadow: "0 10px 30px rgba(102,126,234,0.4), 0 0 0 3px rgba(255,255,255,0.1)",
              transform: "rotateX(0deg)",
              transformStyle: "preserve-3d",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            📖
          </div>
        </div>

        {/* Brand Title */}
        <h2
          style={{
            fontWeight: 800,
            fontSize: 32,
            marginBottom: 8,
            letterSpacing: "-0.8px",
            color: "#1a202c",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginTop: 0,
          }}
        >
          Create Account
        </h2>
        <p style={{ 
          marginTop: 8, 
          color: "#718096", 
          marginBottom: 32, 
          fontSize: 15,
          lineHeight: "1.6",
        }}>
          Join our bookstore community and start your journey
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Name Input */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>
              👤
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={user.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px 14px 14px 44px",
                border: "2px solid rgba(102,126,234,0.15)",
                borderRadius: "12px",
                fontSize: "15px",
                outline: "none",
                background: "rgba(255,255,255,0.8)",
                color: "#1a202c",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
              }}
              className="register-input"
            />
          </div>

          {/* Email Input */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>
              ✉️
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={user.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px 14px 14px 44px",
                border: "2px solid rgba(102,126,234,0.15)",
                borderRadius: "12px",
                fontSize: "15px",
                outline: "none",
                background: "rgba(255,255,255,0.8)",
                color: "#1a202c",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
              }}
              className="register-input"
            />
          </div>

          {/* Password Input */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>
              🔒
            </div>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={user.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px 14px 14px 44px",
                border: "2px solid rgba(102,126,234,0.15)",
                borderRadius: "12px",
                fontSize: "15px",
                outline: "none",
                background: "rgba(255,255,255,0.8)",
                color: "#1a202c",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
              }}
              className="register-input"
            />
          </div>

          {/* Role Select */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>
              🎯
            </div>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px 14px 14px 44px",
                border: "2px solid rgba(102,126,234,0.15)",
                borderRadius: "12px",
                fontSize: "15px",
                outline: "none",
                background: "rgba(255,255,255,0.8)",
                color: "#1a202c",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                boxSizing: "border-box",
                transition: "all 0.3s ease",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23667eea' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                paddingRight: "40px",
              }}
              className="register-select"
            >
              <option value="">Select Role</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="register-button"
            style={{
              padding: "14px 28px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.5px",
              boxShadow: "0 12px 30px rgba(102,126,234,0.4)",
              transform: "translateZ(0)",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              marginTop: 8,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span style={{ position: "relative", zIndex: 2 }}>Register Now</span>
          </button>
        </form>

        {/* Divider */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 12, 
          margin: "24px 0 20px 0",
        }}>
          <div style={{ flex: 1, height: 1, background: "rgba(102,126,234,0.15)" }}></div>
          <span style={{ color: "#a0aec0", fontSize: 13, fontWeight: 500 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "rgba(102,126,234,0.15)" }}></div>
        </div>

        {/* Login Link */}
        <p style={{ marginTop: 8, fontSize: 14, color: "#4a5568" }}>
          Already have an account?{" "}
          <span
            className="login-link"
            style={{ 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              cursor: "pointer", 
              fontWeight: 700,
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/")}
          >
            Sign In
          </span>
        </p>

        {/* Error/Success Message */}
        {msg && (
          <div 
            className="message-box"
            style={{
              marginTop: "20px",
              padding: "12px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "600",
              color: msg.includes("successfully") ? "#22863a" : "#cb2431",
              backgroundColor: msg.includes("successfully") ? "#f0f8f0" : "#ffeaea",
              border: `1px solid ${msg.includes("successfully") ? "#34d399" : "#fc5c65"}`,
              animation: "slideInUp 0.4s ease-out",
            }}
          >
            {msg}
          </div>
        )}
      </div>

      {/* Enhanced Styles */}
      <style>
        {`
        .register-container {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes blobAnimation1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        @keyframes blobAnimation2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 40px) scale(0.9);
          }
        }

        .bg-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          z-index: 1;
        }

        .blob-1 {
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.2);
          top: -100px;
          right: -100px;
          animation: blobAnimation1 7s infinite;
        }

        .blob-2 {
          width: 250px;
          height: 250px;
          background: rgba(255, 255, 255, 0.15);
          bottom: -50px;
          left: -50px;
          animation: blobAnimation2 8s infinite;
        }

        .register-card input::placeholder,
        .register-card select {
          color: rgba(26, 32, 44, 0.5);
          opacity: 1;
        }

        .register-card input:focus,
        .register-card select:focus {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), 0 2px 8px rgba(0,0,0,0.08);
          border-color: rgba(102, 126, 234, 0.5);
          background: rgba(255,255,255,0.95);
          transform: translateY(-2px);
        }

        .register-input,
        .register-select {
          transition: all 0.3s ease;
        }

        .register-input:hover,
        .register-select:hover {
          border-color: rgba(102, 126, 234, 0.3);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
        }

        .register-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(102, 126, 234, 0.5);
        }

        .register-button:active {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .icon-box {
          transition: all 0.3s ease;
        }

        .icon-wrapper:hover .icon-box {
          transform: scale(1.08) rotateZ(5deg);
          box-shadow: 0 15px 40px rgba(102,126,234,0.5), 0 0 0 3px rgba(255,255,255,0.1);
        }

        .login-link {
          transition: all 0.3s ease;
        }

        .login-link:hover {
          opacity: 0.8;
          cursor: pointer;
        }

        .message-box {
          animation: slideInUp 0.4s ease-out;
        }

        @media (max-width: 480px) {
          .register-card {
            padding: 40px 24px !important;
          }

          .register-card h2 {
            font-size: 28px !important;
          }

          .register-card button {
            padding: 12px 20px !important;
            font-size: 15px !important;
          }
        }
      `}
      </style>
    </div>
  );
}

export default Register;
