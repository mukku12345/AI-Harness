import React, { useState } from 'react'
import Footer from '../Footer'
import logo from '../assets/ge-logo.png'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import {  useNavigate } from 'react-router-dom';
import { useApiKey } from './context';
import DotPrinter from './DotPrinter';




function KeySetting() {
    const [apikeys, setApikeys] = useState('');
    const [error,setError] = useState("");
    const[loading,setLoading] = useState(false)

    const getSecretValue = localStorage.getItem('secretKey');
    const navigate = useNavigate();


    const { getApiKey} = useApiKey();

    const handleInputChange = (e) => {
        const newApikey = e.target.value;
    
       
    
        if(newApikey.length === 51){
          setError("")
          setApikeys(newApikey);
        //   localStorage.setItem('api_key', newApikey);
        
        } else {
          setError("Invalid key *")
        }
      
      };
    




    
    const apiSetting = () => {
        console.log("gptApiKey", apikeys)
        setLoading(true)

        if(apikeys.length === 51){
        
        localStorage.setItem("api_key",apikeys)
        var bodyFormData = new FormData();
        bodyFormData.append("apiKey", apikeys);
      
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
          
        }
        API.post(ApiEndPoint.keySetting, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('response apikey==>', response.data);
                getApiKey();
                setTimeout(()=>{
                    navigate('/');
       setLoading(false)

                   
                },2000);
                setError("")
                localStorage.setItem('isKey', 'true');
        })
            .catch((error) => {
                setError(error.response.data.message);
                setLoading(false)
            });
        }

    }

    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            apiSetting();
        }
    };



    return (
        <section className="main-container activated-container chat-gp">
            <div className='container'>

                <div className="logo">
                <img src={logo} alt="AI Harness" />
            </div>
            <div className="content-text">
                <h2>Connect with ChatGPT Account!!</h2>
            </div>
            <div className="login-form">
                <form onSubmit={(e) => { e.preventDefault() }}>
                      {error && <p style={{color:"red"}} >{error}</p>}
                    <input type="text" placeholder="ChatGPT API Key" defaultValue={apikeys} onChange={handleInputChange}  onKeyDown={handleKeyDown}/>
                    <p> <a href="https://platform.openai.com/account/api-keys" target="_blank">Get API keys..</a> </p>

                    {loading?<DotPrinter/>:<button className='sync-chat-gpy-btn' onClick={() => { apiSetting() }} type="button" disabled ={apikeys.length!=51} >SYNC </button>}
                
                </form>
            </div>
            </div>
    
          <Footer />
            
        </section>
    )
}

export default KeySetting;

















































