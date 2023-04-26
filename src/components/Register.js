import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import LoadingSpinner from './LoadingSpinner';

function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const registerUser = (event) => {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            alert("Invalid email address")
        } else {
            setLoading(true)
            var bodyFormData = new FormData();
            bodyFormData.append("email", email);
            const headers = {
                "accept": "application/json",
                "Content-Type": "multipart/form-data"
            }

            API.post(ApiEndPoint.Register, bodyFormData, {
                headers: headers
            }).then((response) => {

                console.log('reeeeeeeeeee', response.data.data);
                let apiStatus = response.status;
                if (apiStatus == 200) {
                    alert("User Registered Successfully")
                    setLoading(false)
                    navigate('/dashboard')
                }
            })
                .catch((error) => {
                    alert(error.response.data.message)
                    console.log('reeeeeeeeeee', error.response.data);
                    setLoading(false)

                });
        }

    }
    return (
        // <div class="login">
        //     <h1>Register</h1>
        //     <form onSubmit={(event) => event.preventDefault()}>
        //         <input type="email" placeholder="Enter your Email" onChange={(e) => { setEmail(e.target.value) }} required />
        //         <button type="submit" onClick={(e) => { registerUser(e) }}>Submit</button>
        //         <p>Already have Account?<Link to="/">Login</Link>
        //         </p>
        //     </form>
        // </div>



        <div class="container">
            <h1>Register</h1>
            {loading ? <LoadingSpinner/> : null}
            <label for="email"><b>Email</b></label>
            <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email" name="email" required />

            <div class="clearfix">
                <button type="submit" onClick={() => { registerUser() }} class="signin">Sign In</button>
                <p>Don't have Account?<Link to="/">Login</Link></p>
            </div>
        </div>
    )
}

export default Register