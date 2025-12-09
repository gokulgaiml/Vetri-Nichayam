import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const id =useSelector((state)=>{return state.auth.userId})
const navigate=useNavigate();
  const fetchOrders = async () => {
    const res = await axios.get(`http://localhost:8080/order/get-order/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
   if(!token){
     navigate("/")
   }
  }, );

  return (
    <div className=" d-flex flex-column align-items-center mx-auto " 
    style={{marginTop:"100px",marginBottom:"100px"}}>
    
    <h1 className="mb-4">My Orders</h1>
    <div className="container">
      <div className="row justify-content-center text-start">
        <div className="d-flex flex-wrap text-start w-100">
      

      {orders.map((item, i) => (
        <div
          key={i}
          className="col-12 col-sm-10 col-md-6 col-lg-4 col-xl-3 col-xxl-3 d-flex"
        >
          <div
            className="m-2 p-3 w-100"
            style={{
              borderRadius: 12,
              padding: 18,
              backgroundColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(8px) saturate(120%)',
              WebkitBackdropFilter: 'blur(8px) saturate(120%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 12px 36px rgba(2,6,23,0.06)',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0 }}>Order: {i + 1}</h4>
              <span style={{ color: '#64748b', fontSize: 14 }}>{new Date(item.orderDate).toDateString()}</span>
            </div>
            <hr />

            <div style={{ marginBottom: 10 }}>
              <p style={{ margin: '6px 0', fontWeight: 700 }}>{item.title}</p>
              <p style={{ margin: '4px 0', color: '#64748b' }}>Quantity: {item.quantity}</p>
              <p style={{ margin: '4px 0', color: '#0b1220' }}>Price: ₹{item.price}</p>
            </div>

            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, color: '#475569' }}><strong>Delivery:</strong> {new Date(item.deliveryDate).toDateString()}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontWeight: 800, color: '#10b981' }}>₹{item.totalAmount.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
    </div>
  );
};

export default Myorders;
