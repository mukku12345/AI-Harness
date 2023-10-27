import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import LoadingSpinner from './LoadingSpinner';
import logo from '../assets/ge-logo.png'
import Footer from '../Footer';
import { useApiKey } from './context';
import DotPrinter from './DotPrinter';


function Login() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const[password,setPassword] = useState("")
    const [error,setError] = useState("");

    const {getApiKey} = useApiKey();


    const loginUser = (e) => {
        // e.preventDefault();
        setError("")
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        bodyFormData.append("password", password);

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
             "userType" : "extension"
        }

        API.post(ApiEndPoint.Login, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('response login', response.data.data);
            let apiStatus = response.status;

            saveDatatolocal(response.data.data);
            getApiKey();
         
          
            if (apiStatus == 200) {
setTimeout(()=>{
    // getApiKey();
    navigate('/')
},1000)


}
        })
            .catch((error) => {
                setError(error.response.data.message)
                setLoading(false)
                console.log('error in login', error.response.data);
            });

    }

    const saveDatatolocal = (data) => {
        console.log("data is", data)
        localStorage.setItem('secretKey', data.secert_key)
        localStorage.setItem('email', data.email)
        localStorage.setItem('personal_key',data.personal_key)
        localStorage.setItem('subscription',data.subscription)
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        //  window.location.reload()


        const getValue = localStorage.getItem('secretKey')
        console.log("getValue", getValue)

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            loginUser();
        }
    };

    return (
        <section class="main-container">
         <div className='container'>
        <div class="logo">
            <img src={logo} alt="AI Harness"/>
        </div>
        {error && <p style={{color:"red"}} >{error}</p>}
        <div class="login-form">
          <form onSubmit={(e)=>{e.preventDefault()}}>
            <input type="email" placeholder="Email " onChange={(e) => { setEmail(e.target.value) }}  onKeyDown={handleKeyDown}/>
            <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}  onKeyDown={handleKeyDown}/>
{loading?<DotPrinter/> :   <button type='submit' onClick={() => { loginUser() }}>Connect</button>}
         
          </form>
          <p className='sign-up-in'>Don't have account <Link to="/register">signup</Link> ?</p>
        </div>
        </div>   
        <Footer/>
    </section>

    )
}

export default Login