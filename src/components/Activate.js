import React from 'react'
import logo from '../assets/ge-logo.png'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';


function Activate() {
    const navigate = useNavigate()


    const gotToAccountDetails=()=>{
        navigate('/accountDetails')
    }
  return (
    <section className="main-container activated-container">
      <div className='container'>
      <div className="logo">
          <img src={logo} alt="AI Harness"/>
      </div>
      <div className="content-text">
         <h2>Almost Done!!</h2>
          <p>Click the button below to activate your new AI account.</p>
      </div>
      <div className="login-form">
        
          <button className='active-btn' onClick={()=>{gotToAccountDetails()}}>ACTIVATE</button>
      
      </div>
      </div>
      <Footer/>
  </section>
  )
}

export default Activate