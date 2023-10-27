import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ge-logo.png'
import Footer from '../Footer';


function AccountDetail() {
  const navigate = useNavigate();


  const email = localStorage.getItem('email')
  const subscription = localStorage.getItem('subscription')
  const user_id = localStorage.getItem('user_id')


  const gotoKeySetting = (e) => {
    e.preventDefault();
    navigate('/keysetting')
  }


  return (

    <section className="main-container activated-container accounts">
      <div className='container'>
        <div className="logo">
          <img src={logo} alt="AI Harness" />
        </div>
        <div className="content-text">
          <h2>Account Activated!!</h2>
        </div>
        <div className="login-form">
          <form onSubmit={gotoKeySetting} >
            <input type="email" value={email} readOnly />
      
            <input type="text" value={subscription === "true" ? 'PREMIUM PLAN' : 'FREE PLAN'} readOnly />

            <button type="submit">PROCEED</button>

          </form>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default AccountDetail