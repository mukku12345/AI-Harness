import React, { useState,useRef } from 'react'
import { ApiEndPoint } from './service/ApiEndPoint'
import API from './service/ApiService';
import LoadingSpinner from './LoadingSpinner';
import Footer from '../Footer'
import Header from './Header'
import copyIcon from '../assets/copy.svg';
import DotPrinter from './DotPrinter';


function ReadPdf() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [pdfFile,setPdfFile]  = useState(null)
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    console.log("pdfFile",pdfFile)

    const readPdf = () => {
        setLoading(true)
         setResults("")
        var bodyFormData = new FormData();
        bodyFormData.append("pdf", pdfFile);
       

  
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretValue,
            // "openai": "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",
            // "userType":"extension"

        }
  
        API.post(ApiEndPoint.ReadPdf, bodyFormData, {
            headers: headers
        }).then((response) => {
            setLoading(false)

            console.log('result read pdf', response.data.content);
            setResults(response.data.content);
        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)

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
            <h2>Read PDF</h2>
       </div>
  
        <div class="image-generator-box">
          
            <div class="file">
                <p>File</p>
                <input type="file" name="avatar" accept="application/pdf,application/vnd.ms-excel" onChange={(e)=>{setPdfFile(e.target.files[0])}} ></input>
            </div>   
            <div class="generator-btn content_box">
                {loading?<DotPrinter/>:<button onClick={readPdf} type="button">GENERATE</button> }
                 {/* <button onClick={readPdf} type="button">GENERATE</button> */}
            </div>
        </div>
        <div class="text-wrap">
        {/* <div className='loading-div'>  {loading ? <LoadingSpinner /> : null} </div> */}
        <textarea id="text-content-1" ref={textAreaRef} value={results}></textarea>
            <p> {copySuccess}</p>
           <img src={copyIcon} alt="copyicon"  onClick={copyToClipboard} style={{"cursor" :"pointer"}}/>
        </div>
        </div>
     <Footer/>
  </section>
  )
}

export default ReadPdf