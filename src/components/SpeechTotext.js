import React,{useState} from 'react'
import { useSpeechRecognition } from 'react-speech-kit';
import SideBar from './SideBar';
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
function SpeechTotext() {
  const getSecretValue = localStorage.getItem('secretKey')

    const [value, setValue] = useState('')
    const { listen, stop } = useSpeechRecognition({
      onResult: (result) => {
        setValue(result)
      }
    })

    const onSubmitSpeech = () => {
    
      var bodyFormData = new FormData();
      bodyFormData.append("prompt", value);
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
          // setResults(response.data.data.choices[0].text);
          // setLoading(false)
          let apiStatus = response.status;
      })
          .catch((error) => {
              console.log('error', error);
              // setLoading(false)

          });

  }

  return (
    <div>
      <SideBar/>
        <div className='content'>
          <p>Hold the mike to speak and left to stop</p>
       <textarea
         value={value}
         onChange={(event) => setValue(event.target.value)}
        />
        <button onMouseDown={listen} onMouseUp={stop}>
          🎤
        </button>
        <br/>

        <button onClick={()=>{onSubmitSpeech()}} type='submit'>Submit</button>

        <textarea
         value={value}
         onChange={(event) => setValue(event.target.value)}
        />
        
       </div>
    </div>
  )
}

export default SpeechTotext