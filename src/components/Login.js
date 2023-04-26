import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import LoadingSpinner from './LoadingSpinner';
import logo from '../assets/ge-logo.png'
import Footer from '../Footer';

function Login() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const [email, setEmail] = useState("");

    const loginUser = (event) => {
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data"
        }

        API.post(ApiEndPoint.AutoLogin, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('reeeeeeeeeee', response.data.data);
            let apiStatus = response.status;

            saveDatatolocal(response.data.data);
            setLoading(false)
            // checkSubscription(response.data.data)
            if (apiStatus == 200) {
                navigate('/connect')
            }
        })
            .catch((error) => {
                alert(error.response.data.message)
                setLoading(false)
                console.log('reeeeeeeeeee', error.response.data);
            });

    }

    const saveDatatolocal = (data) => {
        console.log("data is", data)
        localStorage.setItem('secretKey', data.secert_key)
        localStorage.setItem('email', data.email)
        localStorage.setItem('personal_key',data.personal_key)
        localStorage.setItem('subscription',data.subscription)
        localStorage.setItem('user_id',data.id)

        const getValue = localStorage.getItem('secretKey')
        console.log("getValue", getValue)

    }

   

    return (
        // <div class="container">
        //     <h1>Connect</h1>
        //     {loading ? <LoadingSpinner /> : null}
        //     <label for="email"><b>Email</b></label>
        //     <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email" name="email" required />

        //     <div class="clearfix">
        //         <button type="submit" onClick={() => { loginUser() }} class="signin">Sign In</button>
        //         <p>Don't have Account?<Link to="/register">Register</Link></p>
        //     </div>
        // </div>
        <section class="main-container">
        <div class="logo">
            <img src={logo} alt="AI Harness"/>
        </div>
        <div class="login-form">
          <form onSubmit={(e)=>{e.preventDefault()}}>
            <input type="email" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }}/>
            <button onClick={() => { loginUser() }}>Connect</button>
          </form>
        </div>
        <Footer/>
    </section>

    )
}

export default Login