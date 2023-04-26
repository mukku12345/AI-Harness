import React, { useState } from 'react'

import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import LoadingSpinner from './LoadingSpinner';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function CreateContent() {
    const getSecretValue = localStorage.getItem('secretKey')

    const [query, setQuery] = useState("")
    const [getdata, setGetdata] = useState("")
    const [results, setResults] = useState("")
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateChatApi = () => {
        setLoading(true)
        setCopied(false)
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", query);
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("maxtoken", '200');
        bodyFormData.append("temperature", '0');

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

        }

        API.post(ApiEndPoint.GenerateContent, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', response.data.data);
            console.log('reply', response.data.data.choices[0].text);
            setResults(response.data.data.choices[0].text);
            setLoading(false)
            let apiStatus = response.status;
        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)

            });

    }

    return (
        <>
            <SideBar />
            <div class="content">
                {results ?
                    <>
                        <h1>You can create Content by entering the topic name</h1>
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
                        <h1>You can create Content by entering the topic name</h1>
                        <h2>Please type the query below</h2>
                        {loading ? <LoadingSpinner /> : null}

                    </div>
                }
                <div class="input-container">
                    <input value={query} onChange={(e) => { setQuery(e.target.value) }} type="text" placeholder="Enter topic name" />
                    <button onClick={() => { generateChatApi() }} type="submit">Send</button>
                </div>
            </div>

        </>
    )
}

export default CreateContent