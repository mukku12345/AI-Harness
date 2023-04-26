import React from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';

function Connect() {
    const navigate=useNavigate();

    const accountDetails=()=>{
        const userData=localStorage.getItem('Userdata');
        console.log("userData121",userData)
        navigate('/accountDetails')

    }
  return (
    <div onClick={()=>{accountDetails()}}>Connect</div>
  )
}

export default Connect