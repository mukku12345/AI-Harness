import React, { useState, useEffect, useRef } from 'react'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import SideBar from './SideBar';
import Header from './Header';
import Footer from '../Footer';
import netowrking from '../assets/networking.svg';
import copyIcon from '../assets/copy.svg'
import { Button } from '@mui/material';
import LoadingSpinner from './LoadingSpinner';
import { useApiKey } from './context';
import DotPrinter from './DotPrinter';


function PromptAi() {
    const getSecretValue = localStorage.getItem('secretKey')
    const [allCategories, setCategories] = useState({})
    const [fullpromptData, setFullPromptData] = useState([])
    const [allPromptData, setAllPromptData] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [promptText, setPromptText] = useState('')
    const [promptResult, setPromptResult] = useState('')
    const [dynamicIndex, setDynamicIndex] = useState('');
    const [showDynamicField, setShowdynamicfield] = useState(false);
    const [copySuccess, setCopySuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const textAreaRef = useRef(null);


    const { apiKey } = useApiKey()
    console.log("apiikey==>", apiKey)

    useEffect(() => {
        getCategories()
        getPromptData()
    }, [])

    useEffect(() => {

    }, [promptText])



    const getCategories = () => {
        setLoading(true)
        setError("")
        const headers = {
            "accept": "application/json",
            // "secertkey": getSecretValue,
            "openai": apiKey
        }
        API.get(ApiEndPoint.getPromptCheckbox, {
            headers: headers
        }).then((response) => {
            console.log('result getPromptCheckbox', response);
            let data = response.data.data
            console.log("data 123 getPromptCheckbox", data)
            for (let value in data) {
                console.log(data[value]);
            }
            let values = Object.values(data);
            console.log("value================s", values);
            setCategories(values)
            setLoading(false)
            setError("")


        })
            .catch((error) => {
                console.log('error', error);
                setError(error.response.data.message)
                setLoading(false)

            });
    }

    const getPromptData = () => {
        setLoading(true)
        setError("")
        const headers = {
            "accept": "application/json",
            // "secertkey": getSecretValue,
            "openai": apiKey
        }
        API.get(ApiEndPoint.getPromptContent, {
            headers: headers
        }).then((response) => {
            console.log('result getPromptDataAi', response);
            let data = response.data.data
            console.log("data getPromptDataAi", data)
            setAllPromptData(data)
            setFullPromptData(data)
            setLoading(false)
            setError("")


        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)
                setError(error.response.data.message)
            });
    }

    const filterCheckbox = (event) => {

        setError("")
        let text = event.target.value;
        setSelectedItem(text)
        console.log("===========", text)
        var bodyFormData = new FormData();
        bodyFormData.append("category", text);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": apiKey

        }

        API.post(ApiEndPoint.checkBoxFilter, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', response.data.data);

            setAllPromptData(response.data.data)
            setError("")


        })
            .catch((error) => {
                console.log('error', error);
                setError(error.response.data.message)
            });
    }

    const detailbyId = (id) => {

        setError("")
        var bodyFormData = new FormData();
        bodyFormData.append("id", id);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretValue,
            "openai": apiKey
        }
        API.post(ApiEndPoint.deatilbyid, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result searchByIdAi', response.data.data);
            let prompt = response.data.data.response[0].prompt
            console.log("prompt", prompt)
            setPromptText(prompt);
            setError("")


        })
            .catch((error) => {
                console.log('error', error);
                setError(error.response.data.message)
            });

    }

    const onSubmitPrompt = () => {
        setError("")
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", promptText);
        bodyFormData.append("presence_penalty", '0.1');
        bodyFormData.append("top_p", '1');
        bodyFormData.append("frequency_penalty", '0.1');
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("best_of", '1');
        bodyFormData.append("temperature", '0.5');
        bodyFormData.append("maxtoken", '300');

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            // "secertkey": getSecretValue,
            "openai": apiKey
        }
        API.post(ApiEndPoint.submitPrompt, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result submitPrompt', response.data.data.choices[0].text);
            setPromptResult(response.data.data.choices[0].text)
            setError("")
            setLoading(false)
        })
            .catch((error) => {
                console.log('error', error);
                setError(error.response.data.message)
                setLoading(false)

            });
    }
    const manageDynamicField = () => {
        if (showDynamicField) {
            setPromptResult("")
            setShowdynamicfield(false)
        }
        else {
            setShowdynamicfield(true)
        }
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
        <section class="main-container prompt09">
            <div className='inner-container'>
                <Header />
                <div class="content-writer">
                    <h2>PromptBase</h2>
                    <select id="Modes" value={selectedItem} onChange={(e) => { filterCheckbox(e) }} >
                        {allCategories.length > 0 ? allCategories.map((item) => {
                            return (
                                <option value={item}>{item}</option>
                            )
                        })
                            : null}

                    </select>
                </div>
                <p style={{ "color": "red" }}>{error}</p>
                <div className='prompt-base'>

                    {allPromptData.map((item, index) => {
                        return (
                            <>
                                <button key={index} class="accordionmenu" onClick={() => { detailbyId(item.id); setDynamicIndex(index); manageDynamicField() }}>
                                    <div class="ai-box">
                                        <div class="img-icon-box" >
                                            <div dangerouslySetInnerHTML={{ __html: item.icon_svg }} style={{ width: '50px', height: '50px', fill: 'blue' }} />


                                        </div>
                                        <div class="icon-box-text">
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </button>


                                {showDynamicField ? <>

                                    {index == dynamicIndex ?
                                        <div>
                                            <div class="generate-box1">
                                                <p>Prompt</p>
                                                <div class="text-wrap">
                                                    {/* <div className='loading-div'>  {loading ? <LoadingSpinner /> : null} </div> */}

                                                    <textarea id="textA1" value={promptText}></textarea>
                                                </div>

                                                <div class="btn67">
                                                    {loading ? <DotPrinter /> : <button onClick={() => { onSubmitPrompt() }} type="button">GENERATE</button>}
                                                    {/* <button onClick={() => { onSubmitPrompt() }} type="button">GENERATE</button> */}

                                                </div>

                                            </div>
                                            <div class="text-wrap">

                                                <textarea id="text-content-1" ref={textAreaRef} value={promptResult}></textarea>
                                                <p className='copy-pop'> {copySuccess}</p>
                                                <img src={copyIcon} alt="copyicon" onClick={copyToClipboard} style={{ "cursor": "pointer" }} />

                                            </div>
                                        </div> : null}
                                </> : null}
                            </>

                        )
                    })


                    }

                </div>

                {/* {allPromptData.map((item, index) => {
          return (
            <>
              <button class="accordionmenu" onClick={() => { detailbyId(item.id, item.title); setDynamicIndex(index); manageDynamicField() }}>
                <div class="ai-box">
                  <div class="img-icon-box">
                    <img src="images/networking.svg" alt="" />
                  </div>
                  <div class="icon-box-text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </button>
         
            </>
          )
        })} */}
            </div>
            <Footer />
        </section>

    )
}

export default PromptAi