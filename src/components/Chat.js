import React, { useEffect, useState ,useRef} from 'react';

import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import { Link, useLocation } from 'react-router-dom';

import Footer from '../Footer';
import sendIcon from '../assets/send.png';
import { useApiKey } from './context';
import LoadingSpinner from './LoadingSpinner';
import DotPrinter from './DotPrinter';


function Chat() {

    const lastMessageRef = useRef(null);
    const [query, setQuery] = useState("")
    const [conversation, setConversation] = useState([]);
    const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    const [dots, setDots] = useState("");
    const maxDots = 3;
    const dotCharacter = ".";

    const {apiKey} =  useApiKey();
    const location = useLocation();

 
    var routeName = location.pathname

   

    const chatApi = (e) => {
        e.preventDefault();
   
              if(query.trim() === ""){
                return ;
              }

        setLoading(true)
       

        const newConversation = [...conversation, { role: 'user', content: query }];
        setConversation(newConversation);
        setQuery("");
     

        var bodyFormData = new FormData();
        bodyFormData.append("content", query);
        bodyFormData.append("conversation", JSON.stringify(newConversation));

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretValue,
            "openai":apiKey
        };

        API.post(ApiEndPoint.Chat, bodyFormData, { headers })
            .then((response) => {
                console.log('result', response);
                const newMessage = response.data.data.choices[0].message.content;
                const newConversationWithAI = [...newConversation, { role: 'ai', content: newMessage }];
                setConversation(newConversationWithAI);
                setError("");
                setLoading(false);
            })
            .catch((error) => {
                console.log('error in chatapi', error);
              
                setError(error.response.data.message);
                setLoading(false)
            });
    };

  
  
    useEffect(() => {
   
        const printDots = () => {
          if (dots.length < maxDots) {
            setDots((prevDots) => prevDots + dotCharacter);
          } else {
            setDots("");
          }
        };
  
        console.log("Logging for not");
        const intervalId = setInterval(printDots, 300);
  
        // Clean up the interval when the component unmounts or when loading becomes false
        return () => {
          clearInterval(intervalId);
        };
      
    }, [ dots, maxDots]);





    

    useEffect(() => {
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block:'end' });
        }
      }, [conversation]);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            chatApi();
        }
    };


    const newChat = () => {
        setConversation([]);
    }

    return (
        <>
            <section className="main-container content">
                <div class="container">
            <div className='ext-prompt-chat'>
                <div ><Link className={routeName === '/dashboard' ? "active" : null} to='/'>Propmts</Link></div>
                <div ><Link className={routeName === '/chat' ? "active" : null} to='/chat'>Chat</Link></div>
            </div> 
          
            {error && <p style={{color:"red"}} >{error}</p>}
                <div className="content-writer">
                </div>
                <div className="chat-box">
                    {conversation.length < 1 && <p className='chat-text'>AI:Hello human GPT powered AI chatbot ask me anything !</p>}

                    <div className="message-container">
                        {conversation.map((message, index) => (
                            <div key={index} className={`message ${message.role}`}>
                                <p className="message-content user-reply">{message.content}</p>
                             
                            </div>
                        ))}
                    </div>
                 
                    <div ref={lastMessageRef} />
                    <div className="chat-form">
                        <form className='chat-form' onSubmit={chatApi}>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Type..."
                                ref={lastMessageRef}
                            />
                            { <div className='chat-arrow-btn'></div>}
                            {loading? <button className='chat-dot-loading'>{dots}</button> :   <button type="submit"  className="chat-btn" ><img src={sendIcon} alt="send" /></button> }
                         
                        </form>
                   
                    </div>
                </div>
                <div className='chat-btn1'><i class="fa-regular fa-message"></i>   <button onClick={() => { newChat() }}  >New chat</button></div>
              
                </div>
                <Footer />
            </section>
        </>
    )
}

export default Chat;