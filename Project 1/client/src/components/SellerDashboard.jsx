import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SellerDashboard() {
  const sellerId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const navigate=useNavigate()

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/book/seller/stats/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setChartData(res.data.result))
      .catch((err) => console.log(err));
  }, [sellerId, token]);

  // SUMMARY VALUES
  const totalBooks = chartData.length;
  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0);

  const data = {
  labels: ["Books Added", "Orders Received"],
  datasets: [
    {
      label: "Seller Statistics",
      data: [totalBooks, totalOrders],
      backgroundColor: [
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 193, 7, 0.8)"
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 193, 7, 1)"
      ],
      borderWidth: 1
    }
  ]
};


  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Books & Orders Overview"
      }
    }
  };

  useEffect(()=>{
    if(!token){
        navigate("/")
    }
  })

 if(token && role=="seller"){
     return (
    <div className="container mt-5 text-center" style={{paddingTop:20}}>

      <div style={{
        borderRadius: 14,
        padding: 18,
        marginBottom: 18,
        backgroundColor: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px) saturate(120%)',
        WebkitBackdropFilter: 'blur(8px) saturate(120%)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 12px 36px rgba(2,6,23,0.06)'
      }}>
        <h2 style={{margin:0}}>Seller Dashboard</h2>
      </div>

      {/* TOP SUMMARY CARDS */}
      <div className="row mb-4 justify-content-center">

        <div className="col-md-3">
          <div style={{borderRadius:12, padding:18, background:'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))', border:'1px solid rgba(255,255,255,0.06)', boxShadow:'0 8px 20px rgba(2,6,23,0.06)'}}>
            <h5 style={{marginBottom:6}}>Total Books Added</h5>
            <h2 style={{color:'#3b82f6'}}>{totalBooks}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div style={{borderRadius:12, padding:18, background:'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))', border:'1px solid rgba(255,255,255,0.06)', boxShadow:'0 8px 20px rgba(2,6,23,0.06)'}}>
            <h5 style={{marginBottom:6}}>Total Orders Received</h5>
            <h2 style={{color:'#f59e0b'}}>{totalOrders}</h2>
          </div>
        </div>

      </div>

      {/* CHART SECTION */}
      <div style={{ width: "100%", maxWidth: 900, margin: "0 auto", borderRadius:12, padding:16, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', boxShadow:'0 10px 30px rgba(2,6,23,0.06)'}}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
 }
}

export default SellerDashboard;
