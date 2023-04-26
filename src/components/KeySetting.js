import React, { useState, useEffect } from 'react'
import Footer from '../Footer'
import logo from '../assets/ge-logo.png'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import { Link, useNavigate } from 'react-router-dom'

function KeySetting() {
    const [gptApiKey, setGptApiKey] = useState('')
    const getSecretValue = localStorage.getItem('secretKey')
    const navigate = useNavigate()
    
    const apiSetting = (event) => {
        console.log("gptApiKey", gptApiKey)

        var bodyFormData = new FormData();
        bodyFormData.append("apiKey", gptApiKey);

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey
        }
        API.post(ApiEndPoint.keySetting, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('reeeeeeeeeee', response.data);
                navigate('/dashboard')
            
        })
            .catch((error) => {
                alert(error.response.data.message)
            });

    }


    return (
        <section class="main-container activated-container chat-gp">
            <div class="logo">
                <img src={logo} alt="AI Harness" />
            </div>
            <div class="content-text">
                <h2>Connect with ChatGPT Account!!</h2>
            </div>
            <div class="login-form">
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <input type="text" placeholder="ChatGPT API Key" onChange={(e) => { setGptApiKey(e.target.value) }}></input>
                    <p> <a href="https://platform.openai.com/account/api-keys" target="_blank">Get API keys..</a> </p>
                    <button onClick={() => { apiSetting() }} type="button">SYNC CHATGPT</button>
                </form>
            </div>
            <Footer />
        </section>
    )
}

export default KeySetting