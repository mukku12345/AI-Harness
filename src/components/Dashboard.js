import React,{useState,useEffect} from 'react'
import Chat from './Chat'
import SideBar from './SideBar'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
function Dashboard() {
  const [loading, setLoading] = useState(false);

  const getSecretValue = localStorage.getItem('secretKey')



  useEffect(()=>{
          checkSubscription()
  },[])

  const checkSubscription=async(data)=>{
  

    const headers = {
        "accept": "application/json",
        "secertkey": getSecretValue,
        "openai": ApiEndPoint.OpenAIKey

    }


   await API.post(ApiEndPoint.CheckSubscription,"", {
        headers: headers
    }).then((response) => {
      console.log('reeeeeeeeeee checkSubscription1', response);

        console.log('reeeeeeeeeee checkSubscription', response.data.message);
        let subscriptionStatus=response.data.message.status;
        localStorage.setItem("Subscription",subscriptionStatus)
        console.log("subscriptionStatus",subscriptionStatus)
    })
        .catch((error) => {
            setLoading(false)
            console.log('error in checkSubscription', error.response.data);
        });
           
}

  return (
    <div>
      <SideBar/>
      <div class="content">
      <div className='heading'>
           <h2>Cards</h2>
        </div>
    <div className='image-container'>
     
   <div className='container_child1'>
   
 <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuApi6Ni3QyUd9xfADzqtAPMHO-bSXk-ftdc_3k6QIJp_SWwE3erIqeC00azt6KjopG0&usqp=CAU'
 className='images'
 />
 <p>ChatGPT is an artificial-intelligence chatbot developed by AI research company OpenAI.</p>
   </div>
   <div className='container_child1'>
   
   <img src='https://resize.indiatvnews.com/en/resize/newbucket/730_-/2023/03/openai-chatgpt-1678193797.jpg' 
   className='images'
   />
   <p>OpenAPI is a specification that is used to describe, produce, consume, and visualize RESTful APIs and web services</p>
     </div>
     <div className='container_child1'>
   
   <img src='https://t3.ftcdn.net/jpg/05/60/67/88/360_F_560678800_Ykc1nL0PcsS7hhKgbwXXxikij5HdsyOn.webp'
   className='images'
   />
   <p>It is faster than chatGPT and more responsive</p>
     </div>
    </div>
    <div className='started_button'>
        <button type='submit'>Let's get started</button>
    </div>


        </div>

    {/* <Chat/> */}
    </div>
  )
}

export default Dashboard