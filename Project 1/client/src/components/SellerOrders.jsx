import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SellerOrder() {
  const sellerId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
    const role = useSelector((state) => state.auth.role);
  const [orders, setOrders] = useState([]);

  const navigate=useNavigate()

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/book/seller-order/${sellerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders(res.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(()=>{
    if(!token)
    {
      navigate("/")
    }
  })

 if(token && role=="seller"){
   return (
    <div className="container mt-4" style={{paddingTop:16, paddingBottom:24}}>
      <div style={{borderRadius:14, padding:16, marginBottom:18, background:'rgba(255,255,255,0.04)', backdropFilter:'blur(8px) saturate(120%)', WebkitBackdropFilter:'blur(8px) saturate(120%)', border:'1px solid rgba(255,255,255,0.06)', boxShadow:'0 12px 36px rgba(2,6,23,0.06)'}}>
        <h3 className="text-center mb-0">Orders Received</h3>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders yet...</p>
      ) : (
        <div style={{borderRadius:12, padding:12, background:'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))', border:'1px solid rgba(255,255,255,0.04)'}}>
          <div className="table-responsive">
            <table className="table table-bordered table-hover" style={{background:'transparent'}}>
              <thead style={{background:'rgba(15,23,42,0.6)', color:'#fff'}}>
                <tr className="text-center">
                  <th>#</th>
                  <th>Book Title</th>
                  <th>Quantity</th>
                  <th>Price (₹)</th>
                  <th>Total Amount</th>
                  <th>Order Date</th>
                  <th>Delivery Date</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{index + 1}</td>
                    <td className="text-start p-2">{order.title}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.price}</td>
                    <td style={{fontWeight:700, color:'#10b981'}}>₹{order.totalAmount}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
 }
}

export default SellerOrder;
