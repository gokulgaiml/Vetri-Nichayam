import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MyProduct() {
  const [books, setBooks] = useState([]);
  const navigate=useNavigate()

  const token = useSelector((state) =>{return state.auth.token});
  const sellerId = useSelector((state) =>{return state.auth.userId});
  const role = useSelector((state) =>{return state.auth.role});

  // Fetch books added by this seller
  const loadMyProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/book/my-products/${sellerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBooks(res.data.books || []);
    } catch (err) {
      console.log("Error loading products:", err);
    }
  };

  const deleteproduct =async (id)=>{
    try {
        const res = axios.delete(`http://localhost:8080/book/delete-book/${id}`,
            {headers:{Authorization: `Bearer ${token}`,}}
        )
        alert(`book removed !`)
            setBooks((prevBooks) => prevBooks.filter((b) => b._id !== id));
        
    } catch (error) {
        alert("not able to delete your product",error)
    }
  }

  useEffect(() => {
    loadMyProducts();
   
  },[]);
   useEffect(() => {
   if(!token ){
    return (
        navigate("/")
    )
   }
   
  },);
 


 if(token && role=="seller"){
    return (
    <div className="container  pt-4 mb-5" style={{marginTop:"5rem"}}>
      <h2 className="text-center mb-4">My Products</h2>

      {books.length === 0 ? (
        <h4 className="text-center text-muted">No books added yet.</h4>
      ) : (
        <div className="row g-3">
          {books.map((book) => (
                <div
                  className="
                  col-12 
                  col-sm-6 
                  col-md-4 
                  col-lg-4 
                  col-xl-3 
                  col-xxl-3
                "
                  key={book._id}
                >
                  <div
                    className="w-100 h-100"
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                      backdropFilter: 'blur(8px) saturate(120%)',
                      WebkitBackdropFilter: 'blur(8px) saturate(120%)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 10px 30px rgba(2,6,23,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ width: '100%', height: 200, overflow: 'hidden' }}>
                      <img
                        src={book.image}
                        alt={book.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>

                    <div style={{ padding: 14, flex: '1 1 auto' }}>
                      <h5 style={{ marginBottom: 6 }}>{book.title}</h5>
                      <p className="text-muted" style={{ margin: '4px 0' }}>Author: {book.author}</p>
                      <p style={{ margin: '4px 0' }}>Price: ₹{book.price}</p>
                      <p style={{ margin: '4px 0' }}>Stock: {book.stock}</p>
                    </div>

                    <div style={{ padding: 14 }}>
                      <button
                        onClick={() => {
                          deleteproduct(book._id);
                        }}
                        className="w-100"
                        style={{
                          background: 'linear-gradient(90deg,#ff6b6b,#ef4444)',
                          border: 'none',
                          color: 'white',
                          padding: '10px 12px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
          ))}
        </div>
      )}
    </div>
  );
  }
  
  
}

export default MyProduct;
