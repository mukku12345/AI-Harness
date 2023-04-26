import React from 'react'
import logo from '../assets/ge-logo.png'
import { Link, useNavigate } from 'react-router-dom'


function Activate() {
    const navigate = useNavigate()


    const gotToAccountDetails=()=>{
        navigate('/accountDetails')
    }
  return (
    <section class="main-container activated-container">
      <div class="logo">
          <img src={logo} alt="AI Harness"/>
      </div>
      <div class="content-text">
         <h2>Almost Done!!</h2>
          <p>Click the button below to activate your new AI account.</p>
      </div>
      <div class="login-form">
        <form onSubmit={(e)=>{e.preventDefault()}}>
          <button onClick={()=>{gotToAccountDetails()}}>ACTIVATE</button>
        </form>
      </div>
      <footer>A Product by <a href="#" target="_blank"> Vibhuti Technologies </a> </footer>
  </section>
  )
}

export default Activate