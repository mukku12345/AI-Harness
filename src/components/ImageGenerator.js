import React, { useState } from 'react'
import { ApiEndPoint } from './service/ApiEndPoint'
import API from './service/ApiService'
import SideBar from './SideBar'
import LoadingSpinner from './LoadingSpinner'
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ImageGenerator() {
    const getSecretValue = localStorage.getItem('secretKey')

    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [numofImages, setNumofImages] = useState("")
    const [imageSize, setImageSize] = useState(0)
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);


    const generateImage = () => {
        setLoading(true)
        setCopied(false)
        var bodyFormData = new FormData();
        bodyFormData.append("size", imageSize);
        bodyFormData.append("prompt", query);
        bodyFormData.append("n", numofImages);

        console.log("imagesize", imageSize)
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

        }
        console.log("Image size", imageSize)
        API.post(ApiEndPoint.GenerateImage, bodyFormData, {
            headers: headers
        }).then((response) => {
            setLoading(false)

            console.log('result', response.data.data.data);
            setResults(response.data.data.data);
        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)

            });

    }
    return (
        <div>
            <SideBar />
            <div class="content">
                {console.log("result in return", results)}
                {results ?
                    <>
                        <h1>You can generate image by entering the topic name for Image</h1>
                        <h2>Here are the results</h2>
                        {loading ? <LoadingSpinner /> :
                            <>
                                {
                                    results.map((item) => {
                                        return (
                                            <div>
                                                <img src={item.url}></img>
                                                {loading ? null :
                                                    <CopyToClipboard onCopy={() => { setCopied(true) }} text={item.url}>
                                                        <button>Copy Image Url</button>
                                                    </CopyToClipboard>
                                                }
                                                {copied == true ? <i style={{ color: 'red' }}>Copied</i> : null}
                                            </div>


                                        )
                                    })
                                }
                            </>
                        }
                    </> :
                    <div>
                        <h1>You can generate image by entering the topic name for Image</h1>
                        <h2>Enter details below</h2>
                        {loading ? <LoadingSpinner /> : null}

                    </div>
                }
                <div class="input-container">
                    <input value={query} onChange={(e) => { console.log("hh", e.target.value); setQuery(e.target.value) }} placeholder='Enter Image topic name' className='inputmessage' /><i class="fa fa-paper-plane" aria-hidden="true"></i>
                    <input value={numofImages} onChange={(e) => { console.log("hh", e.target.value); setNumofImages(e.target.value) }} placeholder='Enter number of images you want' className='inputmessage' /><i class="fa fa-paper-plane" aria-hidden="true"></i>
                    <select
                        value={imageSize || 0}
                        id="pixels"
                        name="selectOptions"
                        onChange={(e) => { setImageSize(e.target.value) }}
                        className="options"
                    >
                        <option>Select Image Size</option>
                        <option value="256x256" >256x256</option>
                        <option value="512x512">512x512</option>
                        <option value="1024x1024">1024x1024</option>

                    </select>                    <button onClick={() => { generateImage() }} type="submit">Send</button>
                </div>
            </div>
        </div>
    )
}
