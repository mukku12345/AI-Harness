import React, { useEffect, useState,useRef} from 'react'

import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import SideBar from './SideBar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LoadingSpinner from './LoadingSpinner';
import Footer from '../Footer';
import Header from './Header';
import copyIcon from '../assets/copy.svg';
import { useApiKey } from './context';
import DotPrinter from './DotPrinter';

function AudioToText(props) {
    const getSecretValue = localStorage.getItem('secretKey')
    let navigate = useNavigate();
    console.log("props", props)
    const [file, setFile] = useState(null)
    const [results, setResults] = useState("")
    const [navigation, setNavigation] = useState(false)
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [audioMode,setAudioMode] = useState(0);
    const [copySuccess, setCopySuccess] = useState('');
    const[error,setError] = useState('');
    const textAreaRef = useRef(null);




   
  const { apiKey} = useApiKey()
  console.log("apiikey==>",apiKey)

    useEffect(() => {
        console.log("navigation value", navigation)
        if (navigation == true) {
            navigate('/create')
        }
    }, [navigation])


    const audioToTextTranscription = () => {
        console.log("audioToText0")
        setCopied(false)
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("file", file);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai":apiKey,
            "userType":"extension",

        }

        API.post(ApiEndPoint.AudioToText, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', response.data.data);
            setResults(response.data.data.text);
            setLoading(false);
            setError("")


        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)
 
                setError(error.response.data.message)
            });

    }
     
    const audioToTextTranslation = () => {
        console.log("Inside audioToTextTranslation")
        setCopied(false)
        setLoading(true)
        setResults("")
        var bodyFormData = new FormData();
        bodyFormData.append("file", file);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai":apiKey,
            "userType":"extension"

        }

        API.post(ApiEndPoint.EnglishTranslation, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', response.data.data);
            setResults(response.data.data.text);
            setLoading(false);
            setError("")


        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)
 
                setError(error.response.data.message)
            });

    }

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



    return (
       <section class="main-container audio_converter">
            <div className='inner-container'>
           <Header/>
            <div class="content-writer">
                <h2>Audio Converter</h2>
                <p>Get Transcription</p>
            </div>
            <p style={{"color":"red"}}>{error}</p>
            <div class="image-generator-box">
                <div class="generator-box">
                    <p>Purpose</p>
                    <select id="Modes"  onChange={(e)=>{setAudioMode(e.target.value)}}>
                        <option value="0">Transcription</option>
                        <option value="1">Translation</option>
                    </select>
                </div>
                <div class="file">
                   
                    <p>File</p>
                    <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} name="avatar" accept="audio/*"></input>
       
                </div>
                <div class="generator-btn content_box audio">
                    {audioMode==0? <> {loading?<DotPrinter/>:  <button onClick={() => { audioToTextTranscription() }} type="button">START</button>}</>
                                    // <button onClick={() => { audioToTextTranscription() }} type="button">START</button>
    :<>{loading?<DotPrinter/>: <button onClick={() => { audioToTextTranslation() }} type="button">START</button>}</>
    // <button onClick={() => { audioToTextTranslation() }} type="button">START</button>
}
                </div>
            </div>
            <div class="text-wrap">
            {/* <div className='loading-div'>  {loading ? <LoadingSpinner /> : null} </div> */}
            <textarea id="text-content-1" ref={textAreaRef} value={results}></textarea>
            <p> {copySuccess}</p>
           <img src={copyIcon} alt="copyicon"  onClick={copyToClipboard} style={{"cursor" :"pointer"}}/>
            </div>
            </div>
            <Footer />
        </section>
    )
}

export default AudioToText