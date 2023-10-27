//   /*global chrome*/
import React, { useState, useEffect,useRef } from 'react'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import LoadingSpinner from './LoadingSpinner';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import logoImg from '../assets/upgrade-logo.png'
import logoName from '../assets/aisetting.svg';
import { useApiKey } from './context';
import copyIcon from '../assets/copy.svg';
import DotPrinterExt from './DotPrinterExt';





function TextinputComponent({selectedTextValue}) {
    var selectedText = selectedTextValue
    // const selectedText = localStorage.getItem("autopaste")


    const [loading, setLoading] = useState(false);

    const [selectOptions, setSelectOptions] = useState("customPropmt"); //summarize function state
    const [querySummarize, setQuerySummarize] = useState(selectedText);

    const [queryPrompt, setQueryPrompt] = useState(selectedText); //summarize function state
    const [promptResults, setPromptResults] = useState("") //translate function state
    const [QueryGrammer, setQueryGrammer] = useState(selectedText); //summarize function state
    const [resultGrammer, setGrammerResults] = useState("");

    const [queryExplainCode, setQueryExplainCode] = useState(selectedText);
    const [resulExplainCode, setResultsExplainCode] = useState("");


    //summarize function state
    const [summarizeResults, setSummarizeResults] = useState(""); //summarize function state
  

    const [queryTranslate, setQueryTranslate] = useState(selectedText) //translate function state
    const [language, setLanguage] = useState("afrikaans") //translate function state
    const [translateResults, setTranslateResults] = useState("") //translate function state

   

   const [QueryKeyInSight, setQueryKeyInSight] = useState(selectedText); //keyInSight function state 
    const [ResultsKeyInSight, setResultsKeyInSight] = useState(""); //keyInSight function state
    const getSecretKeyInSightValue = localStorage.getItem('secretKey'); //keyInSight function state


    const [querysMaintakeway, setQueryMaintakeway] = useState(selectedText); //maintakeway function state 
    const [mainTakewayResults, setMainTakewayResults] = useState(""); //maintakeway function state 
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const [copySuccess, setCopySuccess] = useState('');

    const getSecretKeyInMaintakewayValue = localStorage.getItem('secretKey'); //maintakeway function state

   
    var { apiKey} = useApiKey()
    console.log("apiikey==>",apiKey)

    const textAreaRef = useRef(null);
// useEffect(()=>{
//     customPromptApi();
// },[selectedText])




    //// summarize function  ////
    const summarizeApi = () => {
        console.log("summarizeApi", querySummarize)
        console.log("selectedText", selectedText )

        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("content", "Summarize this" + querySummarize );
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretSummarizeValue,
            "openai": apiKey
        }
        API.post(ApiEndPoint.Chat, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result', response);
            setSummarizeResults(response.data.data.choices[0].message.content);
            
            setLoading(false)
        })
            .catch((error) => {
                console.log('error in chatapi', error);
                alert(error.response.data.message)
                setLoading(false);
            });
    }


    const HandleOptionChange = (e) => {
        e.preventDefault()
        setSelectOptions(e.target.value);
       
        // setQueryPrompt("");
        // setQuerySummarize("");
        // setQueryGrammer("");
        // setQueryTranslate("");
        // setQueryExplainCode("");
        // setQueryKeyInSight("");
        // setQueryMaintakeway("");

        setGrammerResults("");
        setTranslateResults("");
        setPromptResults("");
        setResultsKeyInSight("");
        setSummarizeResults("");
        setMainTakewayResults("");
        setQueryExplainCode("");

    }


   //// Translate function  ////
  
    const translateApi = () => {
        setLoading(true)
    

        console.log("language", language);
        console.log("queryTranslate", queryTranslate)
        var bodyFormData = new FormData();
        bodyFormData.append("text", queryTranslate);
        bodyFormData.append("transalate_language", language);

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretTranslateValue,
            "openai":apiKey
        }
        setLoading(true)
        API.post(ApiEndPoint.LanguageTranslation, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result', response.data.data);
            console.log('reply', response.data.data.choices[0].text);
            setTranslateResults(response.data.data.choices[0].text);

            setLoading(false)
        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)
            });


        }
        //// keyInSight function start ////
        const keyInsightsApi = () => {
        
        console.log("secret key", getSecretKeyInSightValue)
        console.log("query", QueryKeyInSight)
        const content = `extract keywords from this text ${QueryKeyInSight}`
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", content);
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("maxtoken", '3000');
        bodyFormData.append("temperature", '0');
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretKeyInSightValue,
            "openai":apiKey
        }
        API.post(ApiEndPoint.GenerateContent, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result', response);
            setResultsKeyInSight(response.data.data.choices[0].text);
            setLoading(false)
        })
            .catch((error) => {
                console.log('error in chatapi', error);
                alert(error.response.data.message)
                setLoading(false);
            });
         }
   


       //// MainTakeway function start ////
       const mainTakewayApi = () => {
        // if(querysMaintakeway === ""){
        //     return ;
        // }

        console.log("secret key", getSecretKeyInMaintakewayValue)

        console.log("query in maintakeway", querysMaintakeway)
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", "What is this url about?" + querysMaintakeway);
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("maxtoken", '3000');
        bodyFormData.append("temperature", '0');


        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretSummarizeValue,
            "openai":apiKey

        }

        API.post(ApiEndPoint.GenerateContent, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result', response);
            setMainTakewayResults(response.data.data.choices[0].text);
            setLoading(false)
        })
            .catch((error) => {
                console.log('error in chatapi', error);
                alert(error.response.data.message)
                setLoading(false);
            });

        }
         //// MainTakeway function end ////


         
         const customPromptApi = () => {
            // console.log("selectedText mk prompt=====>",window.selectedText)


        console.log("query custom prompt",queryPrompt )
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("content", queryPrompt);

     
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretSummarizeValue,
            "openai": apiKey
        }
        API.post(ApiEndPoint.Chat, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result', response);
            setPromptResults(response.data.data.choices[0].message.content);
            setLoading(false)
        })
            .catch((error) => {
                console.log('error in chatapi', error);
                alert(error.response.data.message)
                setLoading(false);
            });
        }
   


         //// Grammer function  ////
         const grammerApi = () => {
        console.log("secret key", getSecretKeyInSightValue)
        console.log("query", QueryGrammer)
        const content = `correct the grammer of this sentences ${QueryGrammer}`
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", content);
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("maxtoken", '3000');
        bodyFormData.append("temperature", '0');
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretKeyInSightValue,
            "openai":apiKey
        }
        API.post(ApiEndPoint.GenerateContent, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result', response);
            setGrammerResults(response.data.data.choices[0].text);
            setLoading(false)
        })
            .catch((error) => {
                console.log('error in chatapi', error);
                alert(error.response.data.message)
                setLoading(false);
            });
         }

        //// correct code function  ////
        const correctCodeApi = () => {
        console.log("secret key", getSecretKeyInSightValue)
        console.log("query", queryExplainCode)
        const content = `explain this code and provide the solution:-  ${queryExplainCode}`
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", content);
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("maxtoken", '3000');
        bodyFormData.append("temperature", '0');
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretKeyInSightValue,
            "openai": apiKey
        }
        API.post(ApiEndPoint.GenerateContent, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result', response);
            setResultsExplainCode(response.data.data.choices[0].text);
            setLoading(false)
        })
            .catch((error) => {
                console.log('error in chatapi', error);
                alert(error.response.data.message)
                setLoading(false);
            });
       }



       const handleInputChange = (e) => {
        // e.preventDefault()
        setQueryPrompt(e.target.value);
      };


      const handleTranslateChange = (e) =>{
        console.log("selected text ==>",selectedText)
        // e.preventDefault()
         setQueryTranslate(e.target.value )
      }


      useEffect(() => {
        const interval = setInterval(() => {
          if (currentIndex < promptResults.length) {
            setDisplayText(prevText => prevText + promptResults[currentIndex]);
            setCurrentIndex(prevIndex => prevIndex + 1);
          } else {
            clearInterval(interval);
          }
        }, 10); // Adjust the interval to control the speed of typing
    
        return () => {
          clearInterval(interval);
        };
      }, [currentIndex, promptResults]);



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
       
        <>
            <div style={{ width: "100%", height: "320px", padding: "10px", boxSizing: "border-box",
             fontFamily: "Inter, Arial, Helvetica, sans-serif",
              fontSize: "12px", boxShadow: "0 0 15px #e9e9e9",
               borderRadius: "10px" }}>
                <div style={{ padding: "5px 0" }} className="div-ai-heading-textinput">
                    
                    <img src={logoImg}  className='harness-heading-img' />
                    <h1 className='harness-heading'>AI Harness</h1>
                    </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0;" }}>
                    <select onChange={(e) => { HandleOptionChange(e) }}  style={{ padding: "5px", fontSize: "10px", fontFamily: "Inter, Arial, Helvetica, sans-serif", cursor: "pointer" }}>
                        <option value="customPropmt" selected > Custom Prompt</option>
                        <option value="summarize" >Summarize</option>
                        <option value="grammer">Grammer</option>
                        <option value="translate">Translate</option>
                        <option value="explainCodes">Explain codes</option>
                        <option value="keyInsight">Key Insight</option>
                        <option value="mainTakeaway">Main Takaway</option>
                    </select>
                    {/* {selectOptions === "customPropmt" && <PromptAi />} */}
                    {
                        selectOptions === "translate" &&
                        <select value={language} onChange={(e) => { setLanguage(e.target.value)}} placeholder="Choose a Language..." required >
                            <option value="afrikaans">Afrikaans</option>
                            <option value="arabic">Arabic</option>
                            <option value="armenian">Armenian</option>
                            <option value="azerbaijani">Azerbaijani</option>
                            <option value="belarusian">Belarusian</option>
                            <option value="bosnian">Bosnian</option>
                            <option value="bulgarian">Bulgarian</option>
                            <option value="catalan">Catalan</option>
                            <option value="chinese">Chinese</option>
                            <option value="croatian">Croatian</option>
                            <option value="czech">Czech</option>
                            <option value="danish">Danish</option>
                            <option value="dutch">Dutch</option>
                            <option value="english">English</option>
                            <option value="estonian">Estonian</option>
                            <option value="finnish">Finnish</option>
                            <option value="french">French</option>
                            <option value="galician">Galician</option>
                            <option value="german">German</option>
                            <option value="greek">Greek</option>
                            <option value="hebrew">Hebrew</option>
                            <option value="hindi">Hindi</option>
                            <option value="hungarian">Hungarian</option>
                            <option value="icelandic">Icelandic</option>
                            <option value="indonesian">Indonesian</option>
                            <option value="italian">Italian</option>
                            <option value="japanese">Japanese</option>
                            <option value="kannada">Kannada</option>
                            <option value="kazakh">Kazakh</option>
                            <option value="korean">Korean</option>
                            <option value="latvian">Latvian</option>
                            <option value="lithuanian">Lithuanian</option>
                            <option value="macedonian">Macedonian</option>
                            <option value="malay">Malay</option>
                            <option value="marathi">Marathi</option>
                            <option value="maori">Maori</option>
                            <option value="nepali">Nepali</option>
                            <option value="norwegian">Norwegian</option>
                            <option value="persian">Persian</option>
                            <option value="polish">Polish</option>
                            <option value="punjabi">Punjabi</option>
                            <option value="portuguese">Portuguese</option>
                            <option value="romanian">Romanian</option>
                            <option value="russian">Russian</option>
                            <option value="serbian">Serbian</option>
                            <option value="slovak">Slovak</option>
                            <option value="slovenian">Slovenian</option>
                            <option value="spanish">Spanish</option>
                            <option value="swahili">Swahili</option>
                            <option value="swedish">Swedish</option>
                            <option value="tagalog">Tagalog</option>
                            <option value="tamil">Tamil</option>
                            <option value="thai">Thai</option>
                            <option value="turkish">Turkish</option>
                            <option value="turkish">Ukrainian</option>
                            <option value="turkish">Urdu</option>
                            <option value="turkish">Vietnamese</option>
                            <option value="turkish">Welsh</option>
                        </select>
                    }
                </div>
               

                {selectOptions === "customPropmt"
                    ?
                    <>
                        <div style={{ padding: "5px 0" }}>
                            <p>Input prompt</p>
                            <textarea  placeholder="Input prompt" 
                             style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", fontFamily: "Inter, Arial, Helvetica, sans-serif", outline: "none" }} 
                             onChange={handleInputChange}>
                              {queryPrompt}
                            </textarea>
         
                            {/* <input type="text" value={queryPrompt} onChange={()=>{handleInputChange()}}/> */}

{/* <input type="submit" onClick={customPromptApi}/> */}
                        </div>
                        <div style={{ margin: "5px 0" }}>


                            {loading ? <DotPrinterExt/>
                            
                            :<input type="submit"  onClick={customPromptApi} style={{ width: "100%", boxSizing: "border-box", padding: "5px", textAlign: "center", background: "#1451a3", color: "#fff", border: "none", outline: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} />
                            }
                            {/* <input type="submit"  onClick={customPromptApi} style={{ width: "100%", boxSizing: "border-box", padding: "5px", textAlign: "center", background: "#1451a3", color: "#fff", border: "none", outline: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} /> */}
                        </div>
                        <div style={{ padding: "5px 0" }}>
                        {/* <div className='loading-div'>  {loading ? <LoadingSpinner /> : null} </div> */}
                            <label style={{ padding: "0 0 5px 0", display: "block" }}>Response</label>

                            <textarea ref={textAreaRef} style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", background: "#f7f7f7", outline: "none", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} disabled="disabled" value={displayText}>


                            </textarea>
                          
{/*                             
                            <div className='copy-paste-textInput'>
                            <p> {copySuccess}</p>
           <img src={copyIcon} alt="copyicon"  onClick={copyToClipboard} style={{"cursor" :"pointer"}}/>
                            </div> */}
  
                        </div>

                    </>
                    :
                    (selectOptions === "translate") ?
                        <>
                            <div style={{ padding: "5px 0" }}>
                                <p>Translate the following contenct to selected language</p>
                                <textarea  placeholder="Paste or input content here" style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", fontFamily: "Inter, Arial, Helvetica, sans-serif", outline: "none" }} onChange={handleTranslateChange}>{{queryTranslate}}</textarea>
                            </div>
                            <div style={{ margin: "5px 0" }}>


                            {loading ? <DotPrinterExt/> :<input type="submit"  onClick={translateApi} style={{ width: "100%", boxSizing: "border-box", padding: "5px", textAlign: "center", background: "#1451a3", color: "#fff", border: "none", outline: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} /> }
                                
                            </div>
                            <div style={{ padding: "5px 0" }}>
                                <label style={{ padding: "0 0 5px 0", display: "block" }}>Response</label>
                                <textarea style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", background: "#f7f7f7", outline: "none", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} disabled="disabled" value={translateResults}></textarea>
                            </div>

                        </>
                        :
                        (selectOptions === "keyInsight") ?
                            <>
                                <div style={{ padding: "5px 0" }}>
                                    <p>Extract keywords from this content.</p>

                                    <textarea v placeholder="Paste or input content here" style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", fontFamily: "Inter, Arial, Helvetica, sans-serif", outline: "none" }} onChange={(e) => { setQueryKeyInSight(e.target.value) }}>{selectedTextValue}</textarea>
                                </div>
                                <div style={{ margin: "5px 0" }}>
                                    {loading?<DotPrinterExt/>:<input type="submit"  onClick={keyInsightsApi} style={{ width: "100%", boxSizing: "border-box", padding: "5px", textAlign: "center", background: "#1451a3", color: "#fff", border: "none", outline: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} />  }
                                    
                                </div>
                                <div style={{ padding: "5px 0" }}>
                                    <label style={{ padding: "0 0 5px 0", display: "block" }}>Response</label>
                                    <textarea style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", background: "#f7f7f7", outline: "none", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} disabled="disabled" value={ResultsKeyInSight}></textarea>
                                </div>

                            </> :
                            (selectOptions === "mainTakeaway") ?
                                <>
                                    <div style={{ padding: "5px 0" }}>
                                        <p>What is this page about?</p>

                                        <textarea  placeholder="Paste or input URL here" style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", fontFamily: "Inter, Arial, Helvetica, sans-serif", outline: "none" }} onChange={(e) => { setQueryMaintakeway(e.target.value) }}>{selectedTextValue}</textarea>
                                    </div>
                                    <div style={{ margin: "5px 0" }}>
                                        {loading?<DotPrinterExt/>:  <input type="submit"  onClick={mainTakewayApi} style={{ width: "100%", boxSizing: "border-box", padding: "5px", textAlign: "center", background: "#1451a3", color: "#fff", border: "none", outline: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} />}
                                       
                                    </div>
                                    <div style={{ padding: "5px 0" }}>
                                        <label style={{ padding: "0 0 5px 0", display: "block" }}>Response</label>
                                        <textarea style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", background: "#f7f7f7", outline: "none", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} disabled="disabled" value={mainTakewayResults}></textarea>
                                    </div>

                                </>
                                :
                                (selectOptions === "summarize") ?
                                    <>
                                        <div style={{ padding: "5px 0" }}>
                                            <p>Summarize this statement</p>

                                            <textarea  placeholder="Paste or input content here" style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", fontFamily: "Inter, Arial, Helvetica, sans-serif", outline: "none" }} onChange={(e) => { setQuerySummarize(e.target.value) }}>{selectedTextValue}</textarea>
                                        </div>
                                        <div style={{ margin: "5px 0" }}>
                                            {loading?<DotPrinterExt/> : <input type="submit"  onClick={summarizeApi} style={{ width: "100%", boxSizing: "border-box", padding: "5px", textAlign: "center", background: "#1451a3", color: "#fff", border: "none", outline: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} />}
                                            
                                        </div>
                                        <div style={{ padding: "5px 0" }}>
                                            <label style={{ padding: "0 0 5px 0", display: "block" }}>Response</label>
                                            <textarea style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", background: "#f7f7f7", outline: "none", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} disabled="disabled" value={summarizeResults}></textarea>
                                        </div>
                                    </>
                                    :
                                    (selectOptions === "grammer") ?
                                        <>
                                            <div style={{ padding: "5px 0" }}>
                                                <p>Correct this to standard English.</p>

                                                <textarea  placeholder="Paste or input content here" style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", fontFamily: "Inter, Arial, Helvetica, sans-serif", outline: "none" }} onChange={(e) => { setQueryGrammer(e.target.value) }}>{selectedTextValue}</textarea>
                                            </div>
                                            <div style={{ margin: "5px 0" }}>
                                                {loading?<DotPrinterExt/>:  <input type="submit"  onClick={grammerApi} style={{ width: "100%", boxSizing: "border-box", padding: "5px", textAlign: "center", background: "#1451a3", color: "#fff", border: "none", outline: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} />}
                                               
                                            </div>
                                            <div style={{ padding: "5px 0" }}>
                                                <label style={{ padding: "0 0 5px 0", display: "block" }}>Response</label>
                                                <textarea style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", background: "#f7f7f7", outline: "none", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} disabled="disabled" value={resultGrammer}></textarea>
                                            </div>

                                        </>
                                        :
                                        (selectOptions === "explainCodes") ?
                                            <>
                                                <div style={{ padding: "5px 0" }}>
                                                    <p>Explain the following codes.</p>

                                                    <textarea  placeholder="Paste or input content here" style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", fontFamily: "Inter, Arial, Helvetica, sans-serif", outline: "none" }} onChange={(e) => { setQueryExplainCode(e.target.value) }} >{selectedTextValue}</textarea>
                                                </div>
                                                <div style={{ margin: "5px 0" }}>
                                                    {loading?<DotPrinterExt/> :  <input type="submit"  onClick={correctCodeApi} style={{ width: "100%", boxSizing: "border-box", padding: "5px", textAlign: "center", background: "#1451a3", color: "#fff", border: "none", outline: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "600", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} />}
                                                   
                                                </div>
                                                <div style={{ padding: "5px 0" }}>
                                                    <label style={{ padding: "0 0 5px 0", display: "block" }}>Response</label>
                                                    <textarea style={{ width: "100%", fontSize: "12px", padding: "5px", height: "80px", boxSizing: "border-box", border: "solid 1px #ddd", borderRadius: "5px", background: "#f7f7f7", outline: "none", fontFamily: "Inter, Arial, Helvetica, sans-serif" }} disabled="disabled" value={resulExplainCode}></textarea>
                                                </div>

                                            </>
                                            :
                                            null
                }
            </div>
        </>
    )
}

export default TextinputComponent ;