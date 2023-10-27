import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import LoadingSpinner from './LoadingSpinner';
import logo from '../assets/ge-logo.png'
import Footer from '../Footer';
import { useApiKey } from './context';
import DotPrinter from './DotPrinter';

function Register() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const [email, setEmail] = useState("roopal@vibhuti.biz");
    const[password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [error,setError] = useState("")


    const {getApiKey} = useApiKey();

    const registerUser = (event) => {

            // if(password !== confirmPassword){
            //    setError("Password Unmatched")
            // }
            // if(password.length<8){
            //   setError("Password must be at least 8 characters ")
            // }
            setError("")

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            // alert("Invalid email address")
            setError("Invalid email address")
        } else  if(password !== confirmPassword){
            setError("Password Unmatched")
         } else if(password.length<8){
            setError("Password must be at least 8 characters ")
          } else {

        setLoading(true)

        var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        bodyFormData.append("password", password);
        bodyFormData.append("user_type", 'extension');


        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
             "userType" : "extension"
        }

        API.post(ApiEndPoint.Register, bodyFormData, {
            headers: headers
        }).then((response) => {

            // console.log('reeeeeeeeeee', response.data.data);
            let apiStatus = response.status;

            saveDatatolocal(response.data.data);
            setLoading(false)
            // checkSubscription(response.data.data)
            localStorage.setItem('isKey', 'false');
            localStorage.setItem('setUserloggedIn',"false");
            if (apiStatus == 200) {
                navigate('/connect')
            }
        })
            .catch((error) => {
                // alert(error.response.data.message)
                setError(error.response.data.message)
                setLoading(false)
                console.log('error', error.response.data);
            });
        }

    }


////////////////shopify ////////////////////////////

const registerUserShopify = () => {

    setError("")
if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    // alert("Invalid email address")
    setError("Invalid email address")
} else  if(password !== confirmPassword){
    setError("Password Unmatched")
 } else if(password.length<8){
    setError("Password must be at least 8 characters ")
  } else {

setLoading(true)
var bodyFormData = new FormData();
bodyFormData.append("email", email);
bodyFormData.append("password", password);
bodyFormData.append("user_type", 'wp_plugin');


const headers = {
    "accept": "application/json",
    "Content-Type": "multipart/form-data",
     "userType" : "wp_plugin"
}

API.post(ApiEndPoint.Register, bodyFormData, {
    headers: headers
}).then((response) => {

    console.log('response in shopify register', response.data.data);
})
    .catch((error) => {
      
  console.log('error', error.response.data);
    });
}

}


////////////////////////wp_plugin///////////////////


const registerUserPlugin = () => {

    setError("")

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        // alert("Invalid email address")
        setError("Invalid email address")
    } else  if(password !== confirmPassword){
        setError("Password Unmatched")
     } else if(password.length<8){
        setError("Password must be at least 8 characters ")
      } else {
    
    setLoading(true)
    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("user_type", 'webprompt');
    
    
    const headers = {
        "accept": "application/json",
        "Content-Type": "multipart/form-data",
         "userType" : "webprompt"
    }
    
    API.post(ApiEndPoint.Register, bodyFormData, {
        headers: headers
    }).then((response) => {
    
        console.log('response in plugin register', response.data.data);
    })
        .catch((error) => {
          
      console.log('error', error.response.data);
        });
    }
    
    }


////////////////////////webprompt///////////////////


const registerUserWebPrompt = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        // alert("Invalid email address")
        setError("Invalid email address")
    } else  if(password !== confirmPassword){
        setError("Password Unmatched")
     } else if(password.length<8){
        setError("Password must be at least 8 characters ")
      } else {
    
    setLoading(true)
    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    bodyFormData.append("password", password);
    bodyFormData.append("user_type", 'webprompt');
    
    
    const headers = {
        "accept": "application/json",
        "Content-Type": "multipart/form-data",
         "userType" : "webprompt"
    }
    
    API.post(ApiEndPoint.Register, bodyFormData, {
        headers: headers
    }).then((response) => {
    
        console.log('response in plugin register', response.data.data);
    })
        .catch((error) => {
          
      console.log('error', error.response.data);
        });
    }
    
    }


    const saveDatatolocal = (data) => {
        console.log("data is", data)
        localStorage.setItem('secretKey', data.secert_key)
        localStorage.setItem('email', data.email)
        localStorage.setItem('personal_key',data.personal_key)
        localStorage.setItem('subscription',data.subscription)
        localStorage.setItem('user_id',data.id)
        localStorage.setItem('isLoggedIn', JSON.stringify(true));

      

    }

   
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            registerUser();
        }
    };

    return (
      
        <section class="main-container">
         <div className='container'>
        <div class="logo">
            <img src={logo} alt="AI Harness"/>
        </div>
        <div class="login-form">
           {error && <p style={{"color":"red"}}>{error}</p>}
          <form onSubmit={(e)=>{e.preventDefault()}}>
            <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }}  onKeyDown={handleKeyDown}/>
            <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}  onKeyDown={handleKeyDown}/>
            <input type="password" placeholder="Confirm password" onChange={(e) => { setConfirmPassword(e.target.value) }}  onKeyDown={handleKeyDown}/>

            {loading?<DotPrinter/> : <button type='submit' onClick={() => { registerUser();registerUserShopify();registerUserPlugin()}}>Sign Up</button>}
      
            {/* <button type='submit' onClick={() => { registerUser();registerUserShopify();registerUserPlugin();registerUserWebPrompt() }}>Sign Up</button> */}
          </form>
          <p className='sign-up-in'>Already have account <Link to="/">signin ?</Link> </p>
        </div>
        </div>   
        <Footer/>
    </section>

    )
}

export default Register