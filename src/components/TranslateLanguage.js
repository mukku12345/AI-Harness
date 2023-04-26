import React, { useEffect, useState } from 'react'
import SideBar from './SideBar';
import { ApiEndPoint } from './service/ApiEndPoint'
import API from './service/ApiService'
import LoadingSpinner from './LoadingSpinner';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function TranslateLanguage() {
    const getSecretValue = localStorage.getItem('secretKey')
    const [query, setQuery] = useState("")
    const [language, setLanguage] = useState("")
    const [results, setResults] = useState("")
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);


    useEffect(() => {

    }, [query])
    const generateChatApi = () => {
        setLoading(true)
        setCopied(false)
        var bodyFormData = new FormData();
        bodyFormData.append("text", query);
        bodyFormData.append("transalate_language", language);

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

        }
        setLoading(true)
        API.post(ApiEndPoint.LanguageTranslation, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', response.data.data);
            console.log('reply', response.data.data.choices[0].text);
            setResults(response.data.data.choices[0].text);
            setQuery("")
            setLanguage("Select language")
            setLoading(false)

        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)
            });

    }

    return (
        <div>
            {/* <LoadingSpinner/> */}
            <SideBar />
            <div class="content">
                {console.log(loading)}
                {results ?
                    <>
                        <h1>You can translate text to any language you want</h1>
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
                        <h1>You can translate text to any language you want</h1>
                        <p>Please type the text below</p>
                        <p>Results will be displayed here</p>
                        {loading ? <LoadingSpinner /> : null}
                    </div>
                }

                <form onSubmit={(event) => event.preventDefault()}>
                    <div className='input-container'>
                        <input value={query} onChange={(e) => { console.log("hh", e.target.value); setQuery(e.target.value) }} placeholder='Text to translate' className='inputmessage' required /><i class="fa fa-paper-plane" aria-hidden="true"></i>
                        <select value={language} onChange={(e) => { setLanguage(e.target.value) }} placeholder="Choose a Language..." required >
                        <option value="afrikaans">Afrikaans</option>
                    <option value="arabic">Arabic</option>
                    <option value="armenian">Armenian</option>
                    <option value="azerbaijani">Azerbaijani</option>
                    <option value="belarusian">Belarusian</option>
                    <option value="bosnian">Bosnian</option>
                    <option value="bulgarian">Bulgarian</option>
                    <option value="catalan">Catalan</option>
                    <option value="chinese">Chinese</option>
                    <option value="croatian">Croatian</option>
                    <option value="czech">Czech</option>
                    <option value="danish">Danish</option>
                    <option value="dutch">Dutch</option>
                    <option value="english">English</option>
                    <option value="estonian">Estonian</option>
                    <option value="finnish">Finnish</option>
                    <option value="french">French</option>
                    <option value="galician">Galician</option>
                    <option value="german">German</option>
                    <option value="greek">Greek</option>
                    <option value="hebrew">Hebrew</option>
                    <option value="hindi">Hindi</option>
                    <option value="hungarian">Hungarian</option>
                    <option value="icelandic">Icelandic</option>
                    <option value="indonesian">Indonesian</option>
                    <option value="italian">Italian</option>
                    <option value="japanese">Japanese</option>
                    <option value="kannada">Kannada</option>
                    <option value="kazakh">Kazakh</option>
                    <option value="korean">Korean</option>
                    <option value="latvian">Latvian</option>
                    <option value="lithuanian">Lithuanian</option>
                    <option value="macedonian">Macedonian</option>
                    <option value="malay">Malay</option>
                    <option value="marathi">Marathi</option>
                    <option value="maori">Maori</option>
                    <option value="nepali">Nepali</option>
                    <option value="norwegian">Norwegian</option>
                    <option value="persian">Persian</option>
                    <option value="polish">Polish</option>
                    <option value="punjabi">Punjabi</option>
                    <option value="portuguese">Portuguese</option>
                    <option value="romanian">Romanian</option>
                    <option value="russian">Russian</option>
                    <option value="serbian">Serbian</option>
                    <option value="slovak">Slovak</option>
                    <option value="slovenian">Slovenian</option>
                    <option value="spanish">Spanish</option>
                    <option value="swahili">Swahili</option>
                    <option value="swedish">Swedish</option>
                    <option value="tagalog">Tagalog</option>
                    <option value="tamil">Tamil</option>
                    <option value="thai">Thai</option>
                    <option value="turkish">Turkish</option>
                    <option value="turkish">Ukrainian</option>
                    <option value="turkish">Urdu</option>
                    <option value="turkish">Vietnamese</option>
                    <option value="turkish">Welsh</option>
                        </select>
                        <button onClick={() => { generateChatApi() }} type="submit">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TranslateLanguage