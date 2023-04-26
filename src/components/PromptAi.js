import React, { useState, useEffect } from 'react'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import SideBar from './SideBar';
function PromptAi() {
    const getSecretValue = localStorage.getItem('secretKey')
    const [allCategories, setCategories] = useState({})
    const [fullpromptData, setFullPromptData] = useState([])
    const [allPromptData, setAllPromptData] = useState([])
    const [selectedItem, setSelectedItem] = useState([])
    const [promptText, setPromptText] = useState('')
    const [promptResult,setPromptResult] = useState('')
    useEffect(() => {
        getCategories()
        getPromptData()
    }, [])

    useEffect(() => {

    }, [promptText])


    // useEffect(() => {
    //     console.log("cheked value in useEffecrt", checkedItems)
    //     if (checkedItems.length == 0) {
    //         setAllPromptData(fullpromptData)
    //     }
    //     else {
    //         filterCheckbox()

    //     }
    // }, [checkedItemsTemp])


    const getCategories = () => {
        const headers = {
            "accept": "application/json",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey
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
            // const dataArray = Object.entries(data);
            // const dataObjects = dataArray.map(([key, value]) => ({ key, value }));
            // console.log(dataObjects);
            setCategories(values)
        })
            .catch((error) => {
                console.log('error', error);
            });
    }

    const getPromptData = () => {
        const headers = {
            "accept": "application/json",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey
        }
        API.get(ApiEndPoint.getPromptContent, {
            headers: headers
        }).then((response) => {
            console.log('result getPromptDataAi', response);
            let data = response.data.data
            console.log("data getPromptDataAi", data)
            setAllPromptData(data)
            setFullPromptData(data)
        })
            .catch((error) => {
                console.log('error', error);
            });
    }

    const filterCheckbox = (event) => {
        let text = event.target.value;
        setSelectedItem(text)
        console.log("===========", text)
        var bodyFormData = new FormData();
        bodyFormData.append("category", text);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

        }

        API.post(ApiEndPoint.checkBoxFilter, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', response.data.data);

            setAllPromptData(response.data.data)

        })
            .catch((error) => {
                console.log('error', error);

            });
    }

    const detailbyId = (id) => {

        var bodyFormData = new FormData();
        bodyFormData.append("id", id);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey
        }
        API.post(ApiEndPoint.deatilbyid, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result searchByIdAi', response.data.data);
            let prompt = response.data.data.response[0].prompt
            console.log("prompt", prompt)
            setPromptText(prompt);

        })
            .catch((error) => {
                console.log('error', error);

            });

    }

    const onSubmitPrompt = () => {

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
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey
        }
        API.post(ApiEndPoint.submitPrompt, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result submitPrompt', response.data.data.choices[0].text);
            setPromptResult(response.data.data.choices[0].text)


        })
            .catch((error) => {
                console.log('error', error);

            });
    }

    return (
        <div>
            <SideBar />
            <div class="content">

                <select name="cars" value={selectedItem} onChange={(e) => { filterCheckbox(e) }} id="cars" onC>
                    {console.log(typeof allCategories)}
                    {allCategories.length > 0 ? allCategories.map((item) => {
                        return (
                            <option value={item}>{item}</option>
                        )
                    })
                        : null}


                </select>
                {allPromptData.map((item) => {
                    return (
                        <div class="card">
                            {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */}
                            <div class="container" onClick={() => { detailbyId(item.id) }}>
                                <h4><b>{item.title}</b></h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    )
                })}


                <>
                    <div>
                        {console.log("in return promptText", promptText)}
                        <textarea id="w3review" name="w3review" rows="4" cols="50" value={promptText}></textarea>
                        <br />
                        <input type="submit" value="Submit" onClick={() => { onSubmitPrompt() }} />

                        <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Response' value={promptResult}></textarea>

                        <div />
                    </div>
                </>

            </div>
        </div>
    )
}

export default PromptAi