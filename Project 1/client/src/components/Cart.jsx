import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [carts, setCarts] = useState({ items: [], totalPrice: 0 });
  const navigate = useNavigate();

  const token = useSelector((state) => {
    return state.auth.token;
  });

  const id = useSelector((state) => {
    return state.auth.userId;
  });

  const getCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/cart/get-cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCarts(res.data.cart);
    } catch (err) {
      console.log(err);
      alert("Error loading cart");
    }
  };

  const getMyorder = (book) => {
    navigate("/buy", { state: book });
  };

  const deleteCartItem = async (bookId) => {
    try {
      const result = await axios.delete(
        `http://localhost:8080/cart/deleteCart/${id}/${bookId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (result) {
        alert("successfully deleted !");
        setCarts((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item._id !== bookId),
        totalPrice: prev.totalPrice - (prev.items.find(i => i._id === bookId)?.price || 0)
      }));
      }
    } catch (error) {
      alert("Not able to deleted !");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {}, [carts]);

    useEffect(() => {});

  

  if (carts.items.length==0) {return (<h2>Your Cart is Empty</h2>)};

  return (
    <div className="mb-5  " style={{paddingTop: "1rem",marginTop:"5rem"}}>
      <div
        className="cart-grid"
    style={{
      display: "grid",
    padding: "1rem",
    
    gap: "1rem",
    justifyContent: "center",      
    gridTemplateColumns: `
      repeat(auto-fit, minmax(320px, 1fr))
    `,
    maxWidth: "1200px",             
    margin: "1rem auto"
    }}
      >
        {carts.items.map((item, index) => (
          <div
            key={index}
            className="mx-auto p-3 text-start cart-card"
            style={{
              width: "100%",
              maxWidth: "420px",
              padding: "18px",
              borderRadius: 12,
              backgroundColor: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px) saturate(120%)",
              WebkitBackdropFilter: "blur(8px) saturate(120%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 12px 36px rgba(2,6,23,0.06)",
            }}
          >
            <h3 style={{ marginBottom: 6 }}>{item.title}</h3>
            <p style={{ marginBottom: 6, color: '#64748b' }}>by {item.author}</p>
            <p style={{ marginBottom: 6, color: '#94a3b8' }}>Category: {item.category}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>₹{item.price}</p>
                <p style={{ margin: 0, color: '#64748b' }}>Qty: {item.quantity}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700 }}>Subtotal</p>
                <p style={{ margin: 0, color: '#10b981' }}>₹{item.price * item.quantity}</p>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                onClick={() => {
                  deleteCartItem(item._id);
                }}
                style={{
                  background: 'linear-gradient(90deg,#ef4444,#b91c1c)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Remove
              </button>
              <button
                onClick={() => {
                  getMyorder(item);
                }}
                style={{
                  background: 'linear-gradient(90deg,#0b5fff,#6d28d9)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      
      
    </div>
  );
};

export default Cart;
