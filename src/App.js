/*global chrome*/
import React, { useEffect, useState } from "react";
import "./App.css";

import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material";

import AutorenewIcon from "@mui/icons-material/Autorenew";

import { Configuration, OpenAIApi } from "openai";
import { BrowserRouter,Route, Routes, Link } from "react-router-dom"
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


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const[useLoggedIn,setUserloggedIn]=useState(false)
  const configuration = new Configuration({
    apiKey: "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",
  });


  const openai = new OpenAIApi(configuration);

  useEffect(() => {
    try {
      chrome.storage.local.get(null, function (data) {
        if ("prompt" in data) {
          setPrompt(data.prompt);
        }
      });
    } catch (e) {
      console.log("Error due to local state");
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
     }
  })

  return (
    <Routes>
    <Route path="/test" element={<Test/>} />
    <Route path="/" element={<Login/>} />

    {/* <Route path="/" element={useLoggedIn==true?<Dashboard/>:<Login/>} /> */}
    <Route path="/register" element={<Register/>} />
    <Route path="/connect" element={<Activate/>} />
    <Route path="/accountDetails" element={<AccountDetail/>} />
    <Route path="/aiForm" element={<AIForm/>} />
    <Route path="/promptai" element={<PromptAi/>} />
    <Route path="/speechtotext" element={<SpeechTotext/>} />


    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/chat" element={<Chat/>} />
    <Route path="/create" element={<CreateContent/>} />
    <Route path="/image-generator" element={<ImageGenerator/>} />
    <Route path="/translate" element={<TranslateLanguage/>} />
    <Route path="/audiototext" element={<AudioToText/>} />
    <Route path="/engtranscription" element={<EngTranscription/>} />
    <Route path="/playground" element={<Playground/>} />
    <Route path="/upgradeToPlus" element={<UpgradetoPlus/>} />
    <Route path="/accountSetting" element={<AccountSetting/>} />
    <Route path="/keysetting" element={<KeySetting/>} />


  </Routes>
  );
}

export default App;
