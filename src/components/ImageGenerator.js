import React, { useState, useEffect } from 'react'
import { ApiEndPoint } from './service/ApiEndPoint'
import API from './service/ApiService'
import SideBar from './SideBar'
import LoadingSpinner from './LoadingSpinner'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Footer from '../Footer'
import Header from './Header';
import { useApiKey } from './context'
import DotPrinter from './DotPrinter'

export default function ImageGenerator() {
    const getSecretValue = localStorage.getItem('secretKey')

    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [numofImages, setNumofImages] = useState("1");
    const [imageSize, setImageSize] = useState("256x256")
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');
    const [dots, setDots] = useState("");
    const maxDots = 3;
    const dotCharacter = ".";

    const { apiKey } = useApiKey()
    console.log("apiikey==>", apiKey)


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
            "openai": apiKey,
            "userType": "extension"

        }
        console.log("Image size", imageSize)
        API.post(ApiEndPoint.GenerateImage, bodyFormData, {
            headers: headers
        }).then((response) => {
            setLoading(false)

            console.log('result', response.data.data.data);
            setResults(response.data.data.data);
            setError("")
        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)
                setError(error.response.data.message)

            });

    }

    const handleDownload = (urll) => {
        const imgUrl = urll; // Replace with your image URL
        const date = new Date()
        const fileName = `${date.getTime()}.jpeg`; // Replace with desired file name
        
        fetch(imgUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            
            console.log("imageUrl==>",url)

                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }).catch(error => 
                
                console.log("Error",error)
                )
    };

    
      
    
      
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            generateImage();
        }
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
        const intervalId = setInterval(printDots, 1000);

        // Clean up the interval when the component unmounts or when loading becomes false
        return () => {
            clearInterval(intervalId);
        };

    }, [dots, maxDots]);


    return (

        <section class="main-container image-generator content">
            <div className='container'>
                <Header />
                <div class="content-writer">
                    <h2>Image Generator</h2>
                </div>
                <p style={{ "color": "red" }}>{error}</p>
                <div class="image-generator-box">
                    <p>You can generate image by entering the topic name of image</p>
                    <div class="generator-box">
                        <p>Image Topic</p>
                        <form action="">
                            <input type="text" value={query} onChange={(e) => { console.log("hh", e.target.value); setQuery(e.target.value) }} placeholder="Image name" onKeyDown={handleKeyDown} />
                        </form>
                    </div>
                    <div class="generator-box">
                        <p>Select Size</p>
                        <select id="Modes" onChange={(e) => { setImageSize(e.target.value) }} onKeyDown={handleKeyDown}>
                            <option value="256x256" >256x256</option>
                            <option value="512x512">512x512</option>
                            <option value="1024x1024">1024x1024</option>
                        </select>
                    </div>
                    <div class="generator-box">
                        <p>Number of Images</p>
                        <select id="Modes2" onChange={(e) => { setNumofImages(e.target.value) }} onKeyDown={handleKeyDown}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <span>(max 5)</span>
                        <span>  <div class="generator-btn content_box">

                            {loading ? <button onClick={() => { generateImage() }} type="button">{dots}</button> : <button onClick={() => { generateImage() }} type="button">GENERATE</button>}

                        </div></span>
                    </div>
                    {results ?
                        <div class="wrapper">

                            {results.map((item) => {
                                return (
                                    <div class="box1">
                                        <img src={item.url} alt="" />
                                        {/* <button onClick={()=>{handleDownload(item.url)}}>
                                            Download Image
                                        </button> */}
                                    </div>

                                )
                            })}

                        </div>
                        : null}
                    {/* <div class="generator-btn content_box">
                    <button onClick={() => { generateImage() }} type="button">GENERATE</button>
                </div> */}

                </div>
            </div>
            <Footer />

        </section>
    )
}
