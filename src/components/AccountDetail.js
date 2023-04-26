import React, { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import logo from '../assets/ge-logo.png'
import Footer from '../Footer';


function AccountDetail() {
  const navigate = useNavigate();


  const secretKey = localStorage.getItem('secretKey')
  const email = localStorage.getItem('email')
  const personal_key = localStorage.getItem('personal_key')
  const subscription = localStorage.getItem('subscription')
  const user_id = localStorage.getItem('user_id')


  console.log("secretKey",secretKey);
  console.log("email",email);
  console.log("personal_key",personal_key);
  console.log("subscription",subscription);



  const gotoKeySetting = () => {
    navigate('/keysetting')
  }
  return (
    // <div onClick={() => { gotoKeySetting() }}>AccountDetail</div>
    <section class="main-container activated-container accounts">
    <div class="logo">
        <img src={logo} alt="AI Harness"/>
    </div>
    <div class="content-text">
       <h2>Account Activated!!</h2>
    </div>
    <div class="login-form">
      <form action="">
        <input type="email" placeholder="" value={email}></input>
          <input type="number" placeholder="" value={user_id}></input>
          <input type="text" placeholder="" value={secretKey}></input>
          <input type="text" placeholder="" value={personal_key}></input>
           <input type="text" placeholder="" value={subscription==true?'PREMIUM PLAN': 'FREE PLAN'}></input>
        <button onClick={() => { gotoKeySetting() }} type="button">PROCEED</button>
      </form>
    </div>
<Footer/>
</section>
  )
}

export default AccountDetail