import React,{useEffect, useState,useCallback,useRef} from 'react'
// import { useSpeechRecognition } from 'react-speech-kit';
import { useSpeechSynthesis } from 'react-speech-kit';
import SideBar from './SideBar';
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import Footer from '../Footer';
import Header from './Header';
import copyIcon from '../assets/copy.svg';

/////////////////////speech to text//////////////////////

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

    mic.continuous = true;
    mic.interimResults = true;
    mic.lang = "en-US";

///////////////////this code will be out of function component/////////////

function SpeechTotext() {

const[selectValue,selectSetValue]= useState("text");
const [isListening, setIsListening] = useState(false);
const [note, setNote] = useState(null);
const [savedNotes, setSavedNotes] = useState([]);
const [value, setValue] = useState("");
const [isSpeaking, setIsSpeaking] = useState(false);
const [copySuccess, setCopySuccess] = useState('');
const textAreaRef = useRef(null);


const { speak, cancel } = useSpeechSynthesis();

  
///////////////////////////////////speech to text /////////////////////

    const handleListen = useCallback(() => {
      if (isListening) {
        mic.start();
      } else {
        mic.stop();
      }
    }, [isListening]);
  
    useEffect(() => {
      handleListen();
    }, [handleListen]);
  
    useEffect(() => {
      mic.onstart = () => {
        console.log("Mic on");
      };
  
      mic.onend = () => {
        console.log("Mic off");
        if (isListening) {
          mic.start();
        }
      };
  
      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        setNote(transcript);
      };
  
      mic.onerror = (event) => {
        console.log(event.error);
      };
    }, [isListening]);
  
    const handleSaveNote = () => {
      if (note) {
        setSavedNotes([...savedNotes, note]);
        setNote("");
      }
    };

console.log("selectValue",selectValue)
  
////////////////////////////////text to speech //////////////////////

const handleSpeechToggle = () => {
  if (isSpeaking) {
    cancel();
  } else {
    speak({ text: value });
  }
  setIsSpeaking(!isSpeaking);
};

const handleSpeechEnd = () => {
  setIsSpeaking(false); // Automatically stop speech when it ends
};

useEffect(() => {
  if (isSpeaking) {
    const speechUtterance = new SpeechSynthesisUtterance(value);
    speechUtterance.onend = handleSpeechEnd;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speechUtterance);

  }
}, [isSpeaking, value]);

/////////////////////copy all by clicing on icon ///////////////////


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


const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
      event.preventDefault();
      handleSpeechToggle();
  }
};


  return (
   
  
    <div>
       <section class="main-container content content-2">
       <div className='container'>
           <Header/>
           <div class="content-writer">
          {selectValue === "text" ? <h2>Speech-to-Text</h2>  : <h2>Text-to-Speech</h2>}
            <select id="Modes" onChange={(e)=>selectSetValue(e.target.value)}>
                <option value="text" >Speech-to-Text</option>
                <option value="speech">Text-to-Speech</option>
             
            
            </select>
        </div>
           {selectValue === "text" &&
            <>
                  
        <div class="generate-box content_box">
            <div class="login-form">
                    <p>Simply press the record button and speak your prompt, just like you would in a conversation.</p>
                    <div class="text-wrap">
                        <h6>Example</h6>
                    <textarea id="textA">"Write a blog post about the latest mobile phones and their features. Include an introduction that highlights the importance of mobile phones in today's world."
                    </textarea>
                    {/* {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>} */}
                      <button onClick={() => setIsListening((prevState) => !prevState)} type="button">{isListening ? "STOP" : "START"}</button>
                </div>
            </div>
        </div>
        <div class="text-wrap">
            <textarea id="text-content-1" 
               ref={textAreaRef}
                value={note}
                readOnly
              ></textarea>
            <p> {copySuccess}</p>
           <img src={copyIcon} alt="copyicon"  onClick={copyToClipboard} style={{"cursor" :"pointer"}}/>
        </div>
            
            
            </> }  { selectValue==="speech"  && <>
            
      
        <div class="generate-box content_box">
            <div class="login-form">
                    <p>Listen here by simply wirte text in input box</p>
                    <div class="text-wrap">
                        <h6>Example</h6>
                    <textarea id="textA">"WRITE  blog post about the latest mobile phones and their features. Include an introduction that highlights the importance of mobile phones in today's world."
                     </textarea> 
                      <button  type="button"  onClick={handleSpeechToggle}>{isSpeaking ? "Stop" : "Listen"}</button>
                </div>
            </div>
        </div>
        <div class="text-wrap">
        <textarea
                      ref={textAreaRef}
                    id="text-content-1"
                    rows="10"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                ></textarea>

                    <p> {copySuccess}</p>
           <img src={copyIcon} alt="copyicon"  onClick={copyToClipboard} style={{"cursor" :"pointer"}}/>
        </div>
            
            
            
            </>
            
            
            }

        </div>
     <Footer/>
  </section>
    </div>
  )
}

export default SpeechTotext