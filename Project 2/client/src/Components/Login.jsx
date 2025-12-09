import React, { useEffect, useState, } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const tokenDispatch = useDispatch();
  const navigate=useNavigate()

 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res =await axios.post("http://localhost:8090/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });
     

      if (res.data != 0) {
        setMsg(res.data.msg || "successfully login!");
       
      }
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        tokenDispatch(login(res.data.token))
        localStorage.setItem("userName", res.data.userName);
        navigate("/home")
        
      }
      
    } catch (error) {
      setMsg("Invalid user or password!");
      console.log(error);
    }
  };

  useEffect(()=>{
    
  })

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center gap-5" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "2rem" }}>
      
      <div className="d-none d-lg-block">
        <img 
          src="/images/loginimage.jpg" 
          className="rounded" 
          alt="doctor with patient"
          style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.2)", width: "550px", height: "500px", objectFit: "cover" }}
        />
      </div>

      <div className="card shadow-lg p-5" style={{ width: "420px", borderRadius: "20px", border: "none", background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)" }}>
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-2" style={{ color: "#667eea", fontSize: "2rem" }}>🔐 Login</h1>
          <p className="text-muted">Welcome back to our healthcare platform</p>
        </div>

        <form onSubmit={handleSubmit}>
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
              style={{ borderRadius: "12px", border: "2px solid #e0e0e0", padding: "0.8rem", fontSize: "0.95rem", transition: "all 0.3s ease" }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="form-label fw-500 mb-2" style={{ color: "#333" }}>🔑 Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ borderRadius: "12px", border: "2px solid #e0e0e0", padding: "0.8rem", fontSize: "0.95rem", transition: "all 0.3s ease" }}
              onFocus={(e) => e.target.style.borderColor = "#667eea"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* Button */}
          <button 
            className="btn w-100 fw-bold"
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
            🚀 Login
          </button>
        </form>

        <div className="my-4">
          <div style={{ borderTop: "2px solid #e0e0e0" }}></div>
        </div>

        <p className="text-center mb-0">
          <span className="text-muted">Don't have an account? </span>
          <a  
            onClick={() => { navigate("/register") }} 
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
            Register here
          </a>
        </p>

        {msg && (
          <div 
            className="alert mt-4 mb-0 text-center fw-500"
            style={{ 
              borderRadius: "12px", 
              border: "none",
              background: msg.includes("successfully") || msg.includes("Invalid") ? (msg.includes("successfully") ? "#d4edda" : "#f8d7da") : "#e2e3e5",
              color: msg.includes("successfully") ? "#155724" : msg.includes("Invalid") ? "#721c24" : "#383d41"
            }}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
