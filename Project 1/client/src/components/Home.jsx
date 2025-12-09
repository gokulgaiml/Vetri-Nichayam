import React from 'react'
import { useEffect } from 'react';
import BookList from './BookList';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import SellerDashboard from './SellerDashboard';
function Home() {

    const token =useSelector((state)=>{
    return state.auth.token;
})
const navigate=useNavigate()

const role =useSelector((state)=>{
    return state.auth.role
})

useEffect(() => {
  if (!token) {
    navigate("/");
  }
},);

    
  
    
    
if(token && role=="buyer"){
    return(
        <div className=''>
            <Navbar />
            <div className="home-glass" style={{
              marginTop: '80px',
              maxWidth: 1200,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: '18px',
              borderRadius: 12,
              backgroundColor: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px) saturate(120%)',
              WebkitBackdropFilter: 'blur(8px) saturate(120%)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <BookList/>
            </div>
        </div>
    )
}
else if(token && role=="seller"){
  return (
    <div>
      <Navbar />
      <div className="home-glass" style={{
        marginTop: '80px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '18px',
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px) saturate(120%)',
        WebkitBackdropFilter: 'blur(8px) saturate(120%)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <SellerDashboard/>
      </div>
      
    </div>
  )
}

  else if (token && role=="admin"){
    return (
    <div>
      <Navbar />
      <div className="home-glass" style={{
        marginTop: '80px',
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '18px',
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px) saturate(120%)',
        WebkitBackdropFilter: 'blur(8px) saturate(120%)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <Dashboard/>
      </div>
      
    </div>
  )
  }
  
}

export default Home
