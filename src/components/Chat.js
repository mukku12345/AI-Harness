import React, { useEffect, useState } from 'react'

import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import SideBar from './SideBar';
import LoadingSpinner from './LoadingSpinner';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Chat(props) {
    const getSecretValue = localStorage.getItem('secretKey')
    let navigate = useNavigate();
    console.log("hsi", props)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState("")
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);


    const chatApi = () => {
        setCopied(false)
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("content", query);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

        }

        API.post(ApiEndPoint.Chat, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result', response);
            setResults(response.data.data.choices[0].message.content);
            setLoading(false)
            setQuery("")
        })
            .catch((error) => {
                console.log('error in chatapi', error);
                setLoading(false)
                alert(error.response.data.message)
                setLoading(false)
            });

    }


    return (
        <>
            <SideBar />
            <div class="content">
                {results ?
                    <>
                        <h1>Chat GPT by Roopal</h1>
                        <h2>Here are the results</h2>
                        <p>{loading ? <LoadingSpinner /> : results}</p>
                        {loading ? null :
                            <CopyToClipboard onCopy={() => { setCopied(true) }} text={results}>
                                <button>Copy to clipboard</button>
                            </CopyToClipboard>
                        }
                        {copied == true ? <i style={{ color: 'red' }}>Copied</i> : null}

                    </> :
                    <div>
                        <h1>Chat GPT by Roopal</h1>
                        <h2>Please type the query below</h2>
                        {loading ? <LoadingSpinner /> : null}
                    </div>
                }
                <div class="input-container">
                    <input value={query} onChange={(e) => { setQuery(e.target.value) }} type="text" placeholder="Type your message here" />
                    <button onClick={() => { chatApi() }} type="submit">Send</button>
                </div>
            </div>


        </>
    )
}

export default Chat