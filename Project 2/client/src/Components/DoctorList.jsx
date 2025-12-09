import React, { useEffect } from 'react'
import DoctorCard from './DoctorCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




function DoctorList({doctor}) {


const token =useSelector((state)=>{return state.auth.token})
const navigate=useNavigate();

useEffect(()=>{
  if(!token){
    navigate("/")
  }
})

  return (
    <div style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh", paddingTop: "7rem", paddingBottom: "5rem" }}>
      <div className="container-fluid">
        <div className="mb-5 text-center">
          <h1 className="fw-bold" style={{ color: "#667eea", fontSize: "2.5rem", marginBottom: "0.5rem" }}>👨‍⚕️ Our Healthcare Professionals</h1>
          <p className="text-muted" style={{ fontSize: "1.1rem" }}>Find and book appointments with qualified doctors</p>
        </div>
        
        <div className="row g-4 px-3">
          {doctor?.filter((docs)=> docs.isApproved=="approved").map((doc, index) => (
            <div className="col-lg-6 col-xl-5 mx-auto" key={index}>
              <DoctorCard doctor={doc} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorList
