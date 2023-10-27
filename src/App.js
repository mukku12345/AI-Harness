/*global chrome*/
import React, { useEffect, useState } from "react";
// import "./App.css";
// import './index.css';


import { Configuration, OpenAIApi } from "openai";
import { Route, Routes,useSearchParams } from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import CreateContent from "./components/CreateContent";
import Chat from "./components/Chat";
import ImageGenerator from "./components/ImageGenerator";
import TranslateLanguage from "./components/TranslateLanguage";
import AudioToText from "./components/AudiotoText";
import EngTranscription from "./components/EngTranscription";
import Playground from "./components/Playground";
import UpgradetoPlus from "./components/UpgradetoPlus";
import Test from "./components/Testing";
import AccountSetting from "./components/AccountSetting";
import Connect from "./components/Connect";
import AccountDetail from "./components/AccountDetail";
import AIForm from "./components/AIForm";
import PromptAi from "./components/PromptAi";
import SpeechTotext from "./components/SpeechTotext";
import Activate from "./components/Activate";
import KeySetting from "./components/KeySetting";
import { useLocation } from "react-router-dom"
import Summarize  from "./components/Summarize";
import ReadPdf from "./components/ReadPdf";
import KeyInSight from "./components/KeyInSight";
import MainTakeway from "./components/MainTakeway";
import CardSection from "./components/CardSection";
import SettingAccountDetails from "./components/SettingAccountDetails";
import TextinputComponent from "./components/TextInputComponent";
import { ApiKeyProvider } from "./components/context";

function App() {
  const location = useLocation();
  console.log("location.pathname",window.location.href);
  const [searchParams] = useSearchParams();
   const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const[useLoggedIn,setUserloggedIn]=useState(false);
  const [valueContent,setValueContent] = useState("")

  const queryParams = new URLSearchParams(window.location.search)
  const term = queryParams.get("q")
  const selectedTextValue = queryParams.get("selectedtext")
  // const selectedTextValue = "queryParams.get"

localStorage.setItem("autopaste",selectedTextValue)
  // const locationn = queryParams.get("location")
  console.log("term is",term)
  // console.log("queryParams is",queryParams);
//   const selectedTexti = "hello"

// const src = `https://prompt.aiharness.io/?q=textinput&selectText=${selectedTexti}`
 
  
// const url = new URL(src);
// const searchParamss = url.searchParams;

// const qValue = searchParamss.get("q");
// const selectedTextValue = searchParamss.get("selectText");

// console.log("q:", qValue);
console.log("selectedText:", selectedTextValue);




  useEffect(() => {
    const currentLocation = window.location.href;
    // chrome-extension://onljhhhojkkipknemafiimnnhgmfhjgf/index.html#/

    if (currentLocation === 'chrome-extension://onljhhhojkkipknemafiimnnhgmfhjgf/index.html' || currentLocation === "chrome-extension://onljhhhojkkipknemafiimnnhgmfhjgf/index.html#/") {
      import('./chromeExt.css').then(() => {
        console.log('Imported chromeExt.css');
      });
    } else if (currentLocation === 'https://prompt.aiharness.io/') {
      import('./index.css').then(() => {
        console.log('Imported index.css');
      });
    }
    // else if (currentLocation === 'http://localhost:3000/?#/') {
    //   import('./index.css').then(() => {
    //     console.log('Imported index.css');
    //   });
    // }
    else {
      import('./index.css').then(() => {
        console.log('Imported index.css');
      });
    }
  }, []);

////////////////////selected text///////////////////////

useEffect(() => {
  const handleMessage = (event) => {
    if (event.data.type === "FROM_EXTENSION") {
      const valueFromExtension = event.data.value;
      // Now you can use the value in your React app
      setValueContent(valueFromExtension)
      console.log("Value from extension:", valueFromExtension);
    }
  };
  
  window.addEventListener("message", handleMessage);
  
  return () => {
    window.removeEventListener("message", handleMessage);
  };
}, [valueContent]);



  const configuration = new Configuration({
    // apiKey: "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",
    apiKey: "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",

  });


  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    const selection =localStorage.getItem("setItem")
    console.log("selcted in reat.js",selection)
    console.log("Selection")
    try {
      // chrome.storage.local.get(null, function (data) {
      //   if ("prompt" in data) {
      //     setPrompt(data.prompt);
      //   }
      // });
      // chrome.storage.local.get(['data'], function(result) {
      //   console.log('Value of data in react.js:', result);
      // });

      chrome.storage.local.get('myKey', function(result) {
        console.log('Value currently is in react.js ' + result.myKey);
      });


  

    } catch (e) {
      console.log("Error due to local state",e);
    }
  }, []);

  async function handleSubmit() {
    setIsLoading(true);

    try {
      // const completion = await openai.createCompletion({
      //   model: "text-davinci-002",
      //   prompt: prompt,
      //   max_tokens: 100,
      // });
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
      });
      console.log(completion.data.choices[0].message);
      setResponse(completion.data.choices[0].message);
      setIsLoading(false);
    } catch (e) {
      alert("Error: ", e);
      console.log("error",e)
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    const getValue=localStorage.getItem('secretKey')
    console.log("getValue",getValue)
     if(getValue){
      setUserloggedIn(true)
      localStorage.setItem('setUserloggedIn',"true");

     }
  })

  return (
    <ApiKeyProvider>
   
    <Routes>
    {/* <Route path="/test" element={<Test/>} />
    {/* <Route path="/" element={<Login/>} /> */}

    {/* <Route path="/" element={useLoggedIn==true?<Dashboard/>:<Login/>} /> */}
    <Route path="/" element={term=="textinput"?<TextinputComponent selectedTextValue = {selectedTextValue}/>:useLoggedIn==true?<Dashboard/>:<Login/>} />
    <Route path="/register" element={<Register/>} />
    {/* <Route path="/login" element={<Login/>} /> */}

    <Route path="/connect" element={<Activate/>} />
    <Route path="/accountDetails" element={<AccountDetail/>} />
    <Route path="/aiForm" element={<AIForm/>} />
    <Route path="/promptai" element={<PromptAi/>} />
    <Route path="/speechtotext" element={<SpeechTotext/>} />
     <Route path="/textinput" element ={<TextinputComponent selectedTextValue = {selectedTextValue}/>}/>

    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/chat" element={<Chat/>} />
    <Route path="/create" element={<CreateContent/>} />
    <Route path="/image-generator" element={<ImageGenerator/>} />
    <Route path="/translate" element={<TranslateLanguage/>} />
    <Route path="/audiototext" element={<AudioToText/>} />
    <Route path="/engtranscription" element={<EngTranscription/>} />
    <Route path="/playground" element={<Playground/>} />
    {/* <Route path="/upgradeToPlus" element={<UpgradetoPlus/>} /> */}
    <Route path="/accountSetting" element={<AccountSetting/>} />
    <Route path="/keysetting" element={<KeySetting/>} />
    <Route path="/readpdf" element={<ReadPdf/>} />
    <Route path="/summarize" element={<Summarize/>} />
    <Route path="/key-insight" element={<KeyInSight/>} />
    <Route path="/main-takeway" element={<MainTakeway/>} />
    {/* <Route path="/card-section" element={<CardSection/>}/> */}

<Route  path="/setting_details" element={<SettingAccountDetails/>}/>

 

  </Routes>
   </ApiKeyProvider>
  );
}

export default App;
