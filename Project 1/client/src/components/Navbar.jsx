import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useSelector((state) => {
    return state.auth.role;
  });
  const userId = useSelector((state) => {
    return state.auth.userId;
  });
  const token = useSelector((state) => {
    return state.auth.token;
  });

  if (token && role === "buyer") {
    return (
      <nav
        className="navbar navbar-expand-lg p-2 fixed-top bg-body-tertiary"
        style={{
          background: 'linear-gradient(180deg,#0b1220 0%, #03040a 100%)',
          backdropFilter: 'blur(10px) saturate(120%)',
          WebkitBackdropFilter: 'blur(10px) saturate(120%)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="container-fluid">

          <a className="navbar-brand fs-4" href="#">
            Get your Book!
          </a>

          {/* Bootstrap hamburger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#buyerNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="buyerNav">
            <div className="d-flex flex-column flex-lg-row ms-auto gap-3 mt-2 mt-lg-0">


              <button
                type="button"
                className="border bg-primary text-white px-3"
                onClick={() => navigate("/home")}
                style={{
                  background: 'linear-gradient(90deg,#0f172a,#071029)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: 12,
                  padding: '8px 14px',
                  boxShadow: '0 10px 30px rgba(2,6,23,0.32)'
                }}
              >
                Home
              </button>

              <button
                type="button"
                className="border bg-primary text-white px-3"
                onClick={() => navigate(`/cart/${userId}`)}
                style={{
                  background: 'linear-gradient(90deg,#0f172a,#071029)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: 12,
                  padding: '8px 14px',
                  boxShadow: '0 10px 30px rgba(2,6,23,0.32)'
                }}
              >
                Cart
              </button>

              <button
                type="button"
                className="border bg-primary text-white px-3"
                onClick={() => navigate(`/Myorders/${userId}`)}
                style={{
                  background: 'linear-gradient(90deg,#0f172a,#071029)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: 12,
                  padding: '8px 14px',
                  boxShadow: '0 10px 30px rgba(2,6,23,0.32)'
                }}
              >
                Orders
              </button>

              <button
                className="btn bg-danger text-white px-4"
                type="button"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                style={{
                  background: 'linear-gradient(90deg,#7f1d1d,#3b0d0d)',
                  border: 'none',
                  borderRadius: 12,
                  padding: '8px 16px'
                }}
              >
                Logout
              </button>

            </div>
          </div>
        </div>
      </nav>
    );
  }

  // SELLER NAVBAR
  else if (token && role === "seller") {
    return (
      <nav
        className="navbar navbar-expand-lg p-3 fixed-top bg-body-tertiary w-100"
        style={{
          background: 'linear-gradient(180deg,#0b1220 0%, #03040a 100%)',
          backdropFilter: 'blur(10px) saturate(120%)',
          WebkitBackdropFilter: 'blur(10px) saturate(120%)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="container-fluid">

          <a className="navbar-brand fs-4" href="#">
            Add your Books!
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sellerNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="sellerNav">
            

            <div className="d-flex flex-column flex-lg-row ms-auto gap-3 mt-2 mt-lg-0">

                <Link to="/seller-dash" className="btn text-white fs-5" style={{borderRadius:12, background:'linear-gradient(90deg,#0f172a,#071029)', border:'none', padding:'8px 12px'}}>
                Dashboard
              </Link>
              <Link to="/books" className="btn text-white fs-5" style={{borderRadius:12, background:'linear-gradient(90deg,#0f172a,#071029)', border:'none', padding:'8px 12px'}}>
                Home
              </Link>

              <Link
                to="/seller-product/:sellerId"
                className="btn text-white fs-5"
                style={{borderRadius:12, background:'linear-gradient(90deg,#0f172a,#071029)', border:'none', padding:'8px 12px'}}
              >
                MyProducts
              </Link>

              <Link
                to="/addbook"
                className="btn text-white fs-5"
                style={{borderRadius:12, background:'linear-gradient(90deg,#0f172a,#071029)', border:'none', padding:'8px 12px'}}
              >
                Add book
              </Link>
              <Link
                to="/sellerOrder"
                className="btn text-white fs-5"
                style={{borderRadius:12, background:'linear-gradient(90deg,#0f172a,#071029)', border:'none', padding:'8px 12px'}}
              >
                Orders
              </Link>

              <button
                className="btn bg-danger text-white px-4"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                style={{background:'linear-gradient(90deg,#7f1d1d,#3b0d0d)', border:'none', borderRadius:12, padding:'8px 16px'}}
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </nav>
    );
  }

  // ADMIN NAVBAR
  else if (token && role === "admin") {
    return (
      <nav
        className="navbar navbar-expand-lg p-3 fixed-top bg-body-tertiary"
        style={{
          background: 'linear-gradient(180deg,#0b1220 0%, #03040a 100%)',
          backdropFilter: 'blur(10px) saturate(120%)',
          WebkitBackdropFilter: 'blur(10px) saturate(120%)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="container-fluid">

          <a className="navbar-brand fs-2">Administration</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNav">
            <div className="d-flex flex-column flex-lg-row ms-auto gap-3 mt-2 mt-lg-0">

              <Link to="/dashboard"
                className="btn border bg-black text-white fs-5"
                style={{borderRadius:8, background:'linear-gradient(90deg,#071029,#0f172a)', border:'none', color:'#fff', boxShadow:'0 8px 24px rgba(2,6,23,0.22)'}}
              >
                Dashboard
              </Link>

              <Link to="/users"
                className="btn border bg-black text-white fs-5"
                style={{borderRadius:8, background:'linear-gradient(90deg,#071029,#0f172a)', border:'none', color:'#fff', boxShadow:'0 8px 24px rgba(2,6,23,0.22)'}}
              >
                Users
              </Link>

              <Link to="/sellers"
                className="btn border bg-black text-white fs-5"
                style={{borderRadius:8, background:'linear-gradient(90deg,#071029,#0f172a)', border:'none', color:'#fff', boxShadow:'0 8px 24px rgba(2,6,23,0.22)'}}
              >
                Sellers
              </Link>

              <Link to="/books"
                className="btn border bg-black text-white fs-5"
                style={{borderRadius:8, background:'linear-gradient(90deg,#071029,#0f172a)', border:'none', color:'#fff', boxShadow:'0 8px 24px rgba(2,6,23,0.22)'}}
              >
                Books
              </Link>

              <button
                className="btn bg-danger text-white px-4"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
                style={{background:'linear-gradient(90deg,#7f1d1d,#3b0d0d)', border:'none', borderRadius:10}}
              >
                Logout
              </button>
            </div>
          </div>

        </div>
      </nav>
    );
  }

  // NO TOKEN NAVBAR
  else {
    return (
      <nav
        className="navbar navbar-expand-lg p-3 fixed-top bg-body-tertiary"
        style={{
          background: 'linear-gradient(180deg,#0b1220 0%, #03040a 100%)',
          backdropFilter: 'blur(8px) saturate(120%)',
          WebkitBackdropFilter: 'blur(8px) saturate(120%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="container-fluid">

          <a className="navbar-brand fs-2">Book Store</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#publicNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="publicNav">
            <div className="d-flex flex-column flex-lg-row ms-auto gap-3 mt-2 mt-lg-0">

              <button
                className="btn nav-login text-white px-4"
                onClick={() => navigate("/")}
                style={{ borderRadius: 12, background:'linear-gradient(90deg,#0f172a,#071029)', border:'none', padding:'8px 16px' }}
              >
                Login
              </button>

              <button
                className="btn nav-register text-white px-4"
                onClick={() => navigate("/register")}
                style={{ borderRadius: 12, background:'linear-gradient(90deg,#0b1220,#1f2937)', border:'none', padding:'8px 16px', boxShadow:'0 8px 24px rgba(0,0,0,0.28)'}}
              >
                Register
              </button>

            </div>
          </div>

        </div>
      </nav>
    );
  }
}

export default Navbar;
