import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const role = useSelector((state) => {
    return state.auth.role;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name=localStorage.getItem("userName")

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  if (token && role == "user") {
    return (
      <nav className="navbar fixed-top navbar-expand-lg shadow-lg" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "1rem 0" }}>
        <div className="container-fluid w-100 px-4">
          <a className="navbar-brand text-white ms-2 fw-bold" href="#" style={{ fontSize: "1.3rem", letterSpacing: "0.5px" }}>
            👤 {name.toUpperCase()}
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ filter: "brightness(0) invert(1)" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {token && role=="user" &&
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="ms-auto d-flex gap-2">
            <button
              className="btn text-white fw-500 border-0"
              onClick={() => {
                navigate("/home")
              }}
              style={{ background: "rgba(255,255,255,0.2)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
            >
              👨‍⚕️ Doctors
            </button>
            <button
              className="btn text-white fw-500 border-0"
              onClick={() => {
                navigate("/user-app")
              }}
              style={{ background: "rgba(255,255,255,0.2)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
            >
              📅 Appointments
            </button>
            <button
              className="btn text-white fw-500 border-0"
              onClick={() => {
                dispatch(logout());
              }}
              style={{ background: "rgba(255,59,48,0.8)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,59,48,1)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,59,48,0.8)"}
            >
              🚪 Logout
            </button>
          </div>
          </div>
          
          
          }
        </div>
      </nav>
    );
  } else if (token && role == "doctor") {
    return (
      <nav className="navbar navbar-expand-lg fixed-top shadow-lg" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", padding: "1rem 0" }}>
        {token && role=="doctor"  && <div className="container-fluid px-4">
          <a className="navbar-brand text-white fw-bold ms-2" href="#" style={{ fontSize: "1.3rem", letterSpacing: "0.5px" }}>
            👨‍⚕️ Dr {name}
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ filter: "brightness(0) invert(1)" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <div className="ms-auto d-flex gap-2">

              
              <button
              className="btn text-white fw-500 border-0"
              onClick={() => {
                navigate("/doc-dash");
              }}
              style={{ background: "rgba(255,255,255,0.2)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
            >
              📋 All Appointments
            </button>
              {" "}
              <button
                className="btn text-white fw-500 border-0"
                onClick={() => {
                  dispatch(logout());
                  navigate("/")
                }}
                style={{ background: "rgba(255,59,48,0.8)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }}
                onMouseEnter={(e) => e.target.style.background = "rgba(255,59,48,1)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255,59,48,1)"}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>}
      </nav>
    );
  }
  else if(token && role=="admin"){
    return (
      <nav className="navbar navbar-expand-lg fixed-top shadow-lg" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", padding: "1rem 0" }}>
        {token && role=="admin"  && <div className="container-fluid px-4">
          <a className="navbar-brand text-white fw-bold ms-2" href="#" style={{ fontSize: "1.3rem", letterSpacing: "0.5px" }}>
            🔐 Admin Panel
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ filter: "brightness(0) invert(1)" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <div className="ms-auto d-flex gap-2">
              <button
              className="btn text-white fw-500 border-0"
              onClick={() => {
                navigate("/admin-dash")
              }}
              style={{ background: "rgba(255,255,255,0.2)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
            >
              📋 Appointment List
            </button>
              
              <button
              className="btn text-white fw-500 border-0"
              onClick={() => {
                navigate("/userl")
              }}
              style={{ background: "rgba(255,255,255,0.2)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
            >
              👥 Users
            </button>
              
              <button
              className="btn text-white fw-500 border-0"
              onClick={() => {
                navigate("/doctorl")
              }}
              style={{ background: "rgba(255,255,255,0.2)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
            >
              👨‍⚕️ Doctor
            </button>
              {" "}
              <button
                className="btn text-white fw-500 border-0"
                onClick={() => {
                  dispatch(logout());
                }}
                style={{ background: "rgba(255,59,48,0.8)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }}
                onMouseEnter={(e) => e.target.style.background = "rgba(255,59,48,1)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255,59,48,1)"}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>}
      </nav>
    );
  }
  
  
  else {
    return (
      <nav className="navbar navbar-expand-lg fixed-top shadow-lg" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "1rem 0" }}>
        {!token && <div className="container-fluid px-4">
          <a className="navbar-brand text-white fw-bold" href="#" style={{ fontSize: "1.4rem", letterSpacing: "1px" }}>
            🏥 Doctor Appointment
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ filter: "brightness(0) invert(1)" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto d-flex gap-2">
              <Link to="/" className="btn text-white fw-500 border-0" style={{ background: "rgba(255,255,255,0.2)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }} onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"} onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}>
                🔑 Login
              </Link>
              <Link to="/register" className="btn text-white fw-500 border-0" style={{ background: "rgba(255,255,255,0.25)", padding: "0.6rem 1.2rem", transition: "all 0.3s ease", fontSize: "0.95rem" }} onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.35)"} onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.25)"}>
                ✍️ Register
              </Link>
            </div>
          </div>
        </div>}
      </nav>
    );
  }
}

export default Navbar;
