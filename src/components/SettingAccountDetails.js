import React, { useState, useEffect } from 'react'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import logo from '../assets/ge-logo.png'
import Footer from '../Footer';
import Modal from 'react-modal';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import { useApiKey } from './context';



Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "rgb(219 210 210",
    border: "none",
    height: " 237px",
    width: "350px",
    padding:" 53px"

  },
};

const cancelledPlanStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "orange",
    border: "none"

  },
};




function SettingAccountDetails() {
  const {apiKey,getApiKey} = useApiKey();
  // const {getApiKey} =useApiKey();

const[modalIsOpen,setModelIsOpen] = useState(false);
const[loading,setLoading] = useState(false);
const[status,setStatus] = useState(false)
const [apikeys, setApikeys] = useState(apiKey || '');
const [error,setError] = useState("")

  const navigate = useNavigate();


  const secretKey = localStorage.getItem('secretKey')
  const email = localStorage.getItem('email')
  const personal_key = localStorage.getItem('personal_key')
  const subscription = localStorage.getItem('subscription')
  const user_id = localStorage.getItem('user_id')
  
  // const apikey = localStorage.getItem('api_key')


  console.log("secretKey",secretKey);
  console.log("email",email);
  console.log("personal_key",personal_key);
  console.log("subscription",subscription);

  const handleInputChange = (e) => {
    // e.preventDefault();
    const newApikey = e.target.value;
   
    if(newApikey.length === 51){
      setError("")
    setApikeys(newApikey);

      localStorage.setItem('api_key', newApikey);
    
    }else {
      setError("Invalid Key")
    }
  
  };


  useEffect(()=>{
    apiSetting();
  },[apikeys])


  const apiSetting = () => {
    console.log("gptApiKey", apikeys,"length==>",apikeys.length,"getApiKey>>")

    if(apikeys.length === 51){
    
      

    var bodyFormData = new FormData();
    bodyFormData.append("apiKey", apikeys);
  
    const headers = {
        "accept": "application/json",
        "Content-Type": "multipart/form-data",
        "secertkey": secretKey,
      
    }
    API.post(ApiEndPoint.keySetting, bodyFormData, {
        headers: headers
    }).then((response) => {
        console.log('response apikey==>', response.data);
        getApiKey();
        
    })
        .catch((error) => {
            alert(error.response.data.message)
        });
    }

}




   const cancelSubscription = () =>{
  
             
    const headers = {
        "accept": "application/json",
         "secertkey": secretKey,
         "openai": apiKey
     
    }
    API.delete(ApiEndPoint.Cancelsubscription,{
        headers: headers
    }).then((response) => {
        console.log('result cancelSubscription==>', response.data);
    // setStatus(response.data.message.status)
    setTimeout(()=>{
      setLoading(false);
      setStatus(true)
    },1500)
             

        localStorage.setItem('subscription',"false")
        
    
    })
        .catch((error) => {
            console.log('error in checksubscription', error);
            alert(error.response.data.message)
       
        });

   }

   useEffect(()=>{
    handelcancelModel();

   },[])
   const handelcancelModel = () =>{
        
    setTimeout(()=>{
      setStatus(false);
      setModelIsOpen(false);

    },800)

  }
   

  return (
    <section class="main-container activated-container accounts">
       <div className="inner-container">
      <Header />
      <div  className='account-details'>
        Account Details
      </div>
      <div class="login-form">
        <form action="" className='account-details-form'>
          <div>
          <label>Email</label>
          <input type="email" className='acc-det-in' placeholder="" value={email} readonly/>
          </div>
          {/* <div>
          <label>User ID:</label>

          <input type="number" className='acc-det-in' placeholder="" value={user_id} readonly/>
          </div> */}
          <div>
          <label>Public Key</label>

          <input type="text" className='acc-det-in' placeholder="" value={personal_key} readonly/>
          </div>
          <div>
          <label>Secret Key</label>

          <input type="text" className='acc-det-in' placeholder="" value={secretKey} readonly/>
          </div>
          <div>
          <label>Plan</label>
          <input type="text" className='acc-det-in' placeholder="" value={subscription === "true"? 'PREMIUM ' : 'FREE PLAN'} readonly/>
 {  subscription ==="true" ? <button onClick={(e)=>{e.preventDefault();setModelIsOpen(true)}} className="cancelplane-btn" >Cancel</button> : null}
          </div>
          <div>
          <label>Version</label>
              <input className='acc-det-in' value="1.5.75" readonly/>
              </div>
                {error && <p className='invalid-text' style={{color:"red"}} >{error}</p>}
              <div  className='change-apiKey-div'>  
         <label htmlFor='openaikey'>Change ApiKey</label>
            <input className='acc-det-input' id='openaikey' defaultValue={apikeys}   onChange={handleInputChange}  />
            </div>
        </form>
      </div>
      </div>

      <div>
          {/* <button onClick={openModal}>Open Modal</button> */}
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {loading ?  
             <div className='cancel-plan-load-div' >
              <h2  className='cancel-plan-load-h'>Please wait</h2>
              <h2 className='cancel-plan-load-h'> Your plan is being cancel</h2> 
              {loading ? <LoadingSpinner /> : null} 
              </div> :
              <div>
                <h2 className='cancel-plan-warn'>Are you sure want to cancel plan ?</h2>
                <div className='cancel-plan-btn-div'>
                <button className='cancel-plan-btn' onClick={()=>{cancelSubscription();setLoading(true)}}>Yes</button>
            <button className='cancel-plan-btn' onClick={()=>{setModelIsOpen(false)}}>No</button>
                </div>
         
            </div>
            
            }
            
          </Modal>
              
          <Modal
            isOpen={status}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            style={cancelledPlanStyles}
            contentLabel="Example Modal"
          >
   
              <div>
                <h2 className='cancelled-h'>Now your plan is cancelled</h2>

            <button className='cancelled-btn'  onClick={handelcancelModel}>x</button>
            </div>
            
            
            
          </Modal>
              



        </div>

      <Footer />
    </section>

  )
}

export default SettingAccountDetails