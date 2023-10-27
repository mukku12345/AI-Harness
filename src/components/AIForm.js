import React, { useEffect, useState, useRef } from 'react'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import Header from './Header';
import Footer from '../Footer';
import copyIcon from '../assets/copy.svg'
import { useApiKey } from './context';
import LoadingSpinner from './LoadingSpinner';
import DotPrinter from './DotPrinter';


function AIForm() {
  const getSecretValue = localStorage.getItem('secretKey')
  const [allCategories, setCategories] = useState([])
  const [fullpromptData, setFullPromptData] = useState([])
  const [allPromptData, setAllPromptData] = useState([])
  const [checkedItems, setCheckedItems] = useState([]);
  const [checkedItemsTemp, setCheckedItemsTemp] = useState([]);
  const [dynamicFields, setDynamicFields] = useState([])
  const [formData, setFormData] = useState({});
  const [promptTitle, setPromptTitle] = useState('')
  const [promptREsult, setPromptResult] = useState('')
  const [dynamicIndex, setDynamicIndex] = useState('');
  const [showDynamicField, setShowdynamicfield] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [error, setError] = useState('');
  const textAreaRef = useRef(null);

  const { apiKey } = useApiKey()
  console.log("apiikey==>", apiKey)

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


  useEffect(() => {

  }, [showDynamicField])

  function handleInputChange(event) {
    const { name, value } = event.target.value;
    // event.preventDefault()
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
    setError("")
    const headers = {
      "accept": "application/json",
      "secertkey": getSecretValue,
      "openai": apiKey
    }
    API.get(ApiEndPoint.getAIFormCategory, {
      headers: headers
    }).then((response) => {
      console.log('result getAIFormCategory', response);
      let data = response.data.data
      console.log("data 123", data)
      setCategories(data)
      setError("")

    })
      .catch((error) => {
        console.log('error', error);
        setError(error.response.data.message)

      });
  }

  const getPromptData = () => {
    setError("")
    const headers = {
      "accept": "application/json",
      "secertkey": getSecretValue,
      "openai": apiKey
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
        setError(error.response.data.message)
        setError("")


      });
  }




  const filterCheckbox = (event) => {
    let text = event.target.value;
    setSelectedItem(text)
    console.log("===========", text)
    var bodyFormData = new FormData();
    bodyFormData.append("category", text);
    setError("")
    const headers = {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "secertkey": getSecretValue,
      "openai": apiKey

    }

    API.post(ApiEndPoint.aiformCheckboxFilter, bodyFormData, {
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
  const detailbyId = (id, title) => {
    setError("")
    setPromptTitle(title)
    var bodyFormData = new FormData();
    bodyFormData.append("id", id);
    const headers = {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "secertkey": getSecretValue,
      "openai": apiKey
    }

    API.post(ApiEndPoint.searchByIdAi, bodyFormData, {
      headers: headers
    }).then((response) => {

      console.log('result searchByIdAi', response.data.data);
      console.log('result searchByIdAi2', response.data.data.response[0].fields);
      let fieldData = response.data.data.response[0].fields
      console.log("fieldData", parseInt(fieldData))
      setDynamicFields(JSON.parse(fieldData))
      setError("")



    })
      .catch((error) => {
        console.log('error', error);
        setError(error.response.data.message)

      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    let originalDat = formData
    promptai()
  }

  const promptai = (e) => {
    setError("")
    let originalData = formData
    let data = JSON.stringify(formData)
    console.log("prompt Title", promptTitle)
    // const entries = Object.entries(originalData);
    console.log("dat121221", data)
    setLoading(true);
    //    console.log(entries);
    var arrayData = []
    arrayData.push(originalData)
    console.log("arrayData data", arrayData)
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
      "openai": apiKey
    }
    API.post(ApiEndPoint.submitPromptAi, bodyFormData, {
      headers: headers
    }).then((response) => {
      console.log('result submitPromptAi', response.data.data.choices[0].text);
      setPromptResult(response.data.data.choices[0].text);
      setLoading(false);
      setError("")

    })
      .catch((error) => {
        console.log('error', error);
        setLoading(false)
        setError(error.response.data.message)

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


  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     handleSubmit();
  //   }
  // };
  const handleButtonClick = (id, title, index) => {
    detailbyId(id, title);
    setDynamicIndex(index);
    manageDynamicField();
  };


  return (

    <>

      <section className="main-container ai-forms">
        <div className='inner-container'>
          <Header />
          <div className="content-writer">
            <h2>AI Forms</h2>
            <select id="Modes" value={selectedItem} onChange={(e) => { filterCheckbox(e) }}>
              {allCategories.map((item, index) => {
                return (
                  <option value={item.key}>{item.name}</option>
                )
              })}
            </select>
          </div>
          <p style={{ "color": "red" }}>{error}</p>
          <div className="ai-generator-box">
            {allPromptData.map((item, index) => {
              return (
                <>
                  <button className="accordionmenu" onClick={() => handleButtonClick(item.id, item.title, index)}>
                    <div className="ai-box">
                      <div className="img-icon-box">
                        <div dangerouslySetInnerHTML={{ __html: item.icon_svg }} style={{ width: '50px', height: '50px', fill: 'blue' }} />
                      </div>
                      <div className="icon-box-text">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </button>


                  {showDynamicField ? <>

                    {index == dynamicIndex ?
                      <>
                        {dynamicFields.map((item, index) => {
                          return (
                            <div className="generate-box1">
                              {(item.id) &&
                                <div className="generator-box">

                                  <p>{item.label}</p>

                                  <form onSubmit={handleSubmit}  >

                                    <input type={item.type} name={item.label} placeholder="search" />
                                    <div className="btn67">
                                      {loading?<DotPrinter/>:  <button type="submit">GENERATE</button>}
                                      {/* <button type="submit">GENERATE</button> */}
                                    </div>
                                    <div className="text-wrap">
                                      {/* <div className='loading-div'>  {loading ? <LoadingSpinner /> : null} </div> */}
                                      <textarea id="text-content-1" ref={textAreaRef} value={promptREsult}></textarea>
                                      <p> {copySuccess}</p>
                                      <img src={copyIcon} alt="copyicon" onClick={copyToClipboard} style={{ "cursor": "pointer" }} />



                                    </div>
                                  </form>
                                </div>
                              }

                            </div>

                          )
                        })}
                      </> : null
                    }
                  </> : null}
                </>
              )
            })}

          </div>
        </div>
        <Footer />
      </section>
    </>

  )
}

export default AIForm









