import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    stock: "",
    description: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const sellerId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(book).forEach((key) => formData.append(key, book[key]));
      formData.append("image", image);
      formData.append("sellerId", sellerId);

      const res = await axios.post(
        "http://localhost:8080/book/add-book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.msg);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to add the book");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  if (!token) return null;
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 50%, #667eea 100%)",
        position: "relative",
        overflow: "hidden",
      }}
      className="addbook-container fade-in"
    >
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div style={{ width: '100%', maxWidth: 920 }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>

          {/* Card */}
          <div className="addbook-glass p-4" style={{
              flex: '1 1 460px',
              borderRadius: 18,
              backgroundColor: 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(10px) saturate(120%)',
              WebkitBackdropFilter: 'blur(10px) saturate(120%)',
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.25)'
            }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <div style={{ width:72, height:72, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#667eea,#764ba2)', color:'white', fontSize:28, boxShadow: '0 12px 36px rgba(102,126,234,0.35)' }} aria-hidden>
                📚
              </div>
            </div>

            <h3 className="text-center mb-3" style={{ marginBottom: 6, fontWeight:800, fontSize:22, color:'#1a202c' }}>Add New Book</h3>
            <p style={{ textAlign:'center', color:'#718096', marginBottom:18 }}>Fill in the details and upload a beautiful cover to showcase your book.</p>

            <form onSubmit={handleSubmit}>
              {/* Two-column layout for inputs */}
              <div style={{ display:'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {/* Title */}
                <div style={{ gridColumn: '1 / span 2' }}>
                  <label className="form-label fw-bold">Book Title</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>📘</div>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Enter book title"
                      value={book.title}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: 44, height:44, borderRadius: 12, border: '2px solid rgba(16,24,40,0.06)', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}
                    />
                  </div>
                </div>

                {/* Author */}
                <div>
                  <label className="form-label fw-bold">Author</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>👤</div>
                    <input
                      type="text"
                      name="author"
                      className="form-control"
                      placeholder="Author name"
                      value={book.author}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: 44, height:44, borderRadius: 12, border: '2px solid rgba(16,24,40,0.06)', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="form-label fw-bold">Price (₹)</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>💸</div>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder="Price"
                      value={book.price}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: 44, height:44, borderRadius: 12, border: '2px solid rgba(16,24,40,0.06)', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="form-label fw-bold">Category</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>🏷️</div>
                    <input
                      type="text"
                      name="category"
                      className="form-control"
                      placeholder="Fiction, Education..."
                      value={book.category}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: 44, height:44, borderRadius: 12, border: '2px solid rgba(16,24,40,0.06)', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}
                    />
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="form-label fw-bold">Stock</label>
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>📦</div>
                    <input
                      type="number"
                      name="stock"
                      className="form-control"
                      placeholder="Quantity"
                      value={book.stock}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: 44, height:44, borderRadius: 12, border: '2px solid rgba(16,24,40,0.06)', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}
                    />
                  </div>
                </div>

                {/* Description spans two columns */}
                <div style={{ gridColumn: '1 / span 2' }}>
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Short description of the book"
                    rows="3"
                    value={book.description}
                    onChange={handleChange}
                    required
                    style={{ padding:12, borderRadius: 12, border: '2px solid rgba(16,24,40,0.06)', boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}
                  ></textarea>
                </div>
              </div>

              {/* Image Upload and preview area */}
              <div style={{ display:'flex', gap:12, alignItems:'center', marginTop:16, flexWrap:'wrap' }}>
                <div style={{ flex: '1 1 240px' }}>
                  <label className="form-label fw-bold">Book Cover</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    style={{ borderRadius: 12, border: '2px solid rgba(16,24,40,0.06)', padding:8 }}
                  />
                </div>

                {preview && (
                  <div style={{ width:150, height:200, borderRadius:12, overflow:'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.18)', flex: '0 0 150px' }}>
                    <img src={preview} alt="Preview" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                  </div>
                )}
              </div>

              <div style={{ marginTop: 20 }}>
                <button className="w-100 py-2" type="submit" style={{
                  background: 'linear-gradient(90deg,#667eea,#764ba2)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontWeight: 800,
                  boxShadow: '0 18px 48px rgba(102,126,234,0.28)',
                  padding: '12px 16px',
                  fontSize: 16,
                }}>
                  Add Book
                </button>
              </div>
            </form>

            <style>{`
              .addbook-glass input::placeholder, .addbook-glass textarea::placeholder {
                color: rgba(26,32,44,0.45);
              }
              .addbook-glass .form-control:focus, .addbook-glass input:focus, .addbook-glass textarea:focus {
                box-shadow: 0 12px 36px rgba(102,126,234,0.16);
                border-color: rgba(102,126,234,0.45);
                outline: none;
                transform: translateY(-2px);
              }
              .addbook-glass button:hover {
                transform: translateY(-4px);
                box-shadow: 0 26px 64px rgba(102,126,234,0.32);
                transition: all 0.22s cubic-bezier(.2,.9,.3,1);
              }

              .fade-in { animation: fadeIn 0.7s ease-out; }
              @keyframes fadeIn { from {opacity:0; transform: translateY(12px)} to {opacity:1; transform: translateY(0)} }

              .bg-blob { position: absolute; border-radius: 50%; filter: blur(70px); opacity: 0.28; z-index:1 }
              .blob-1 { width: 360px; height:360px; background: rgba(255,255,255,0.18); top: -100px; right: -120px; animation: blob1 8s infinite; }
              .blob-2 { width: 260px; height:260px; background: rgba(255,255,255,0.12); bottom: -80px; left: -80px; animation: blob2 9s infinite; }
              @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,20px) scale(1.05)} }
              @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-20px) scale(0.95)} }

              @media (max-width: 720px) {
                .addbook-glass { padding: 22px !important }
              }
            `}</style>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddBook;
