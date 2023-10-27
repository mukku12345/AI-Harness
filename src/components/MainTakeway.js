import React,{useState,useRef} from 'react';
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import LoadingSpinner from './LoadingSpinner';
import copyIcon from '../assets/copy.svg';
import Footer from '../Footer';
import { useApiKey } from './context';
import Header from './Header';
import DotPrinter from './DotPrinter';

function MainTakeway() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState("");
    const [loading, setLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const[error,setError] = useState('');
    const textAreaRef = useRef(null);
    
    const { apiKey} = useApiKey()
    console.log("apiikey==>",apiKey)

     const getSecretValue = useApiKey();
  



    const mainTakewayApi = () => {
        setError("")
        console.log("secret key",getSecretValue)

        console.log("query",query)
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", "What is this url about?"+query);
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("maxtoken", '3000');
        bodyFormData.append("temperature", '0');

       
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretValue,
            "openai":apiKey

        }
     

        API.post(ApiEndPoint.ContentText, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result', response);
            setResults(response.data.data.choices[0].text);
            setError("")
            setLoading(false)
        })
            .catch((error) => {
                console.log('error in chatapi', error);
                setError(error.response.data.message)
                setLoading(false);
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


      const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            mainTakewayApi();
        }
    };



console.log("results",results)

  return (
    <section className="main-container content content-2 key-insights">
            <div className='container'>

    <Header/>
        <div className="content-writer">
            <h2>Main Takeaway</h2>
        </div>
        <p style={{"color":"red"}}>{error}</p>

        <div className="generate-box content_box main-take">
            <div className="login-form">
                <p>What is this Page about?</p>
   
                <input type="email" placeholder="https://wordpress.org/documentation/article"  value={query} onChange={(e) => { setQuery(e.target.value) }} onKeyDown={handleKeyDown}/>
                <div className="gen-btn">
                    {loading?<DotPrinter/>:   <button onClick={()=>{mainTakewayApi()}} type="button">GENERATE</button>}
                    {/* <button onClick={()=>{mainTakewayApi()}} type="button">GENERATE</button> */}
                </div>
                
            </div>
        </div>
        <div className="text-wrap">
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

export default MainTakeway