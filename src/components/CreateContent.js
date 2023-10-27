import React, { useEffect, useState,useRef } from 'react'

import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import LoadingSpinner from './LoadingSpinner';
import Header from './Header';
import Footer from '../Footer';
import copyIcon from '../assets/copy.svg';
import { useApiKey } from './context';
import DotPrinter from './DotPrinter';

function CreateContent() {
    const getSecretValue = localStorage.getItem('secretKey')

    const [query, setQuery] = useState("")
    const [playgroundQuery, setPlaygroundQuery] = useState("")

    const [getdata, setGetdata] = useState("")
    const [results, setResults] = useState("")
    const [resultsPlayground, setResultsPlayground] = useState("")

    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contentMode, setContentMode] = useState("expressMode");
    const [copySuccess, setCopySuccess] = useState('');
     const[error,setError] = useState('');
    const textAreaRef = useRef(null);
    // const api_key = localStorage.getItem("api_key")
    const { apiKey} = useApiKey()
    console.log("apiikey==>",apiKey)


    useEffect(() => {
        console.log("contentMode", contentMode)
    }, [contentMode])

      
        console.log("query",query)

    const generateChatApi = (e) => {
        e.preventDefault()
        setLoading(true)
        setCopied(false)
        setError("")
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", `create content of ${query}`);
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("maxtoken", '3000');
        bodyFormData.append("temperature", '0');

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretValue,
            "openai":apiKey

        }
      //  'https://do-else.com/openApi/api/content-text'

        API.post(ApiEndPoint.GenerateContent, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', response.data.data);
            console.log('reply', response.data.data.choices[0].text);
            setResults(response.data.data.choices[0].text);
            setLoading(false)
            let apiStatus = response.status;
        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
                // alert(error.message)
                setError(error.response.data.message)


            });

    }


    console.log("results",results)
    
    const generatePlaygroundApi=(e)=>{
        setError("")
        e.preventDefault()
        console.log("playground query",playgroundQuery)

        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", `write a latest blog on ${playgroundQuery} and its feature included an introduction that highlights the importance point`);
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("maxtoken", '3000');
        bodyFormData.append("temperature", '0');

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretValue,
            "openai": apiKey

        }

        API.post(ApiEndPoint.Playground, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', response.data.data);
            console.log('reply', response.data.data.choices[0].text);
            setResultsPlayground(response.data.data.choices[0].text);
            setLoading(false)
            let apiStatus = response.status;
        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
                // alert(error.message)
                setError(error.response.data.message)


            });
    }

////////////////////////////////////copy to clipboARD/////////////////////////////////////////////


function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
  
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  
    setTimeout(() => {
      setCopySuccess('');
    }, 600);
  
  
  };


  //////////////////enter by keyword ///////////////
  const handleKeyDownExp = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        generateChatApi();
    }
};
const handleKeyDownPlay = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        generatePlaygroundApi();
    }
};


    return (
      
        <section class="main-container content">
            <div className='container'>
            <Header />
            <div class="content-writer">
                <h2>Content Writer</h2>
                <select id="Modes" onChange={(e) => setContentMode(e.target.value)}>
                    <option value="expressMode">Express Mode</option>
                    <option value="playground">Playground</option>
                </select>
               
            </div>
            <p style={{"color":"red"}}>{error}</p>
            {contentMode=="expressMode"?
             <>
             <div class="generate-box content_box">
                 <h6>Custom Prompt</h6>
                 <p>You can create content by entering the topic name</p>
                 <div class="login-form">
     

                   <form onSubmit={ generateChatApi} >
                         <input type="text" value={query} onChange={(e) => { setQuery(e.target.value) }} placeholder="Enter Topic Name" />
                         {loading ?<DotPrinter/>:<button  type="submit">GENERATE</button> }
                      </form>

                 </div>   
             </div>
             <div class="text-wrap">
                {/* <div className='loading-div'>  {loading ? <LoadingSpinner /> : null} </div> */}
           
            
             <textarea id="textA" ref={textAreaRef} value={results}></textarea>
            <p> {copySuccess}</p>
           <img src={copyIcon} alt="copyicon"  onClick={copyToClipboard} style={{"cursor" :"pointer"}}/>
             </div>
             </>:contentMode=="playground"?
             <>
                 <div class="generate-box content_box">
            <h6>Category</h6>
            <p>Write a blog post about the latest new things .</p>
            <div class="login-form">
          
           
                    <form onSubmit={generatePlaygroundApi}>
                        
                     
                        <input type="text" value={playgroundQuery} onChange={(e) => { setPlaygroundQuery(e.target.value) }} placeholder="Enter query here" />
                        {loading ?<DotPrinter/>:<button  type="submit">GENERATE</button> }
                      
                    </form>
                         </div>
                         </div>

                    <div class="text-wrap">
                    {/* <div className='loading-div'>  {loading ? <LoadingSpinner /> : null} </div> */}
                    <textarea id="textA" ref={textAreaRef} value={resultsPlayground}></textarea>
            <p> {copySuccess}</p>
           <img src={copyIcon} alt="copyicon"  onClick={copyToClipboard} style={{"cursor" :"pointer"}}/>
                   
               
           
        </div>
     
             </>:null
             
             }
           </div>
            <Footer />
        </section>
    )
}

export default CreateContent