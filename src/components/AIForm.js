import React, { useEffect, useState } from 'react'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import SideBar from './SideBar';
function AIForm() {
    const getSecretValue = localStorage.getItem('secretKey')
    const [allCategories, setCategories] = useState([])
    const [fullpromptData, setFullPromptData] = useState([])
    const [allPromptData, setAllPromptData] = useState([])
    const [checkedItems, setCheckedItems] = useState([]);
    const [checkedItemsTemp, setCheckedItemsTemp] = useState([]);
    const [dynamicFields, setDynamicFields] = useState([])
    const [formData, setFormData] = useState({});
    const [promptTitle,setPromptTitle] = useState('')
    const [promptREsult,setPromptResult] = useState('')
    useEffect(() => {
        getCategories()
        getPromptData()
    }, [])


    useEffect(() => {
        console.log("cheked value in useEffecrt", checkedItems)
        if (checkedItems.length == 0) {
            setAllPromptData(fullpromptData)
        }
        else {
            filterCheckbox()

        }
    }, [checkedItemsTemp])


    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
      }

  

    const handleCheckboxChange = (event, name) => {
        if (event.target.checked) {
            setCheckedItems([...checkedItems, name]);
            setCheckedItemsTemp([...checkedItems, name]);
        } else {
            setCheckedItems(checkedItems.filter((item) => item !== name));
            setCheckedItemsTemp(checkedItems.filter((item) => item !== name));

        }
        console.log("checkedItems", checkedItems)

    };


    const getCategories = () => {
        const headers = {
            "accept": "application/json",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey
        }
        API.get(ApiEndPoint.getAIFormCategory, {
            headers: headers
        }).then((response) => {
            console.log('result getAIFormCategory', response);
            let data = response.data.data
            console.log("data 123", data)
            setCategories(data)
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
        API.get(ApiEndPoint.getPromptDataAi, {
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


    const filterCheckbox = () => {
        let text = checkedItems.toString();
        console.log(text)
        var bodyFormData = new FormData();
        bodyFormData.append("category", text);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

        }

        API.post(ApiEndPoint.aiformCheckboxFilter, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result', typeof (response.data.data));

            setAllPromptData(response.data.data)

        })
            .catch((error) => {
                console.log('error', error);

            });
    }

    const detailbyId = (id,title) => {
         setPromptTitle(title)
        var bodyFormData = new FormData();
        bodyFormData.append("id", id);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

        }

        API.post(ApiEndPoint.searchByIdAi, bodyFormData, {
            headers: headers
        }).then((response) => {

            console.log('result searchByIdAi', response.data.data);
            console.log('result searchByIdAi2', response.data.data.response[0].fields);
            let fieldData = response.data.data.response[0].fields
            console.log("fieldData", parseInt(fieldData))
            setDynamicFields(JSON.parse(fieldData))


        })
            .catch((error) => {
                console.log('error', error);

            });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(formData);
        let originalDat=formData
        promptai()
      }

    const promptai=(e)=>{
        let originalData=formData
        let data=JSON.stringify(formData)
        console.log("prompt Title",promptTitle)
        // const entries = Object.entries(originalData);
        console.log("dat121221",data )

        //    console.log(entries);
        var arrayData=[]
        arrayData.push(originalData)
        console.log("arrayData data",arrayData)
        var bodyFormData = new FormData();
        bodyFormData.append("prompt", data);
        bodyFormData.append("title", promptTitle);
        bodyFormData.append("presence_penalty", '0.1');
        bodyFormData.append("top_p", '1');
        bodyFormData.append("frequency_penalty", '0.1');
        bodyFormData.append("model", 'text-davinci-003');
        bodyFormData.append("best_of", '1');
        bodyFormData.append("temperature", '0.5');
        bodyFormData.append("maxtoken", '300');
        bodyFormData.append("type", 'extension');

        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey
        }
        API.post(ApiEndPoint.submitPromptAi, bodyFormData, {
            headers: headers
        }).then((response) => {
            console.log('result submitPromptAi',response.data.data.choices[0].text);
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
                {allCategories.map((item, index) => {
                    return (
                        <div>
                            <input type="checkbox" id="vehicle1" value={item.key} name="vehicle1" checked={checkedItems.includes(item.key)} onChange={(event) => handleCheckboxChange(event, item.key)} />
                            <label for="vehicle1">{item.name}</label><br />
                        </div>
                    )
                })}

                {allPromptData.map((item) => {
                    return (
                        <div class="card">
                            {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */}
                            <div class="container" onClick={() => { detailbyId(item.id,item.title) }}>
                                <h4><b>{item.title}</b></h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    )
                })}
                {console.log("dynamicFields=>", dynamicFields)}
                <form onSubmit={handleSubmit}>
                {dynamicFields.map((item, index) => {
                    return (
                        <div>
                            <label for="vehicle1">{item.label}</label><br />
                            <input type={item.type} id="vehicle1" name={item.label}  onChange={handleInputChange}/>
                        </div>
                    )
                })}
                <button type="submit">Submit</button>
                </form>
                <textarea value={promptREsult} placeholder='response'></textarea>


            </div>
        </div>
    )
}

export default AIForm