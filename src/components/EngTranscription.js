import React, { useEffect, useState } from 'react'

import API from './service/ApiService';
import { ApiEndPoint } from './service/ApiEndPoint';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import SideBar from './SideBar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LoadingSpinner from './LoadingSpinner';

function EngTranscription(props) {
    const getSecretValue = localStorage.getItem('secretKey')
    let navigate = useNavigate();
    console.log("hsi", props)
    const [file, setFile] = useState("")
    const [results, setResults] = useState("")
    const [navigation, setNavigation] = useState(false)
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        console.log("navigation value", navigation)
        if (navigation == true) {
            navigate('/create')
        }
    }, [navigation])


    const audioToText = () => {
        setCopied(false)
        setLoading(true)
        var bodyFormData = new FormData();
        bodyFormData.append("file", file);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

        }

        API.post(ApiEndPoint.EnglishTranslation, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', response.data.data);
            setResults(response.data.data.text);
            setLoading(false)

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
                        <h1>Get English Translation from Audio</h1>
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
                        <h1>Get English Translation from Audio</h1>
                        <p>Please type the query below</p>
                        <p>Results will be displayed here</p>
                        <p>{loading ? <LoadingSpinner /> : null}</p>

                    </div>
                }
            </div>
            <div class="input-container">
            <label>Audio File</label>
            <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} placeholder='seand a message...' className='inputmessage' /><i class="fa fa-paper-plane" aria-hidden="true"></i>
                        <button onClick={() => { audioToText() }} type="submit">Send</button>
                </div>
        </>
    )
}

export default EngTranscription