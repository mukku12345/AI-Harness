import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import API from './service/ApiService';
import { ApiEndPoint } from './service/ApiEndPoint';
import Modal from 'react-modal';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import Test from './Testing';


Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



function UpgradetoPlus() {
  const getSecretValue = localStorage.getItem('secretKey')
  const subscriptionStatus = localStorage.getItem("Subscription")
  console.log("subscriptionStatus in UpgradePlus",JSON.parse(subscriptionStatus))

  console.log("secret key on Upgrade page",getSecretValue)
  const email = localStorage.getItem('email')

  const [loading, setLoading] = useState(false);
  const [freePlan, setFreePlan] = useState([]);
  const [premium, setPremium] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [cvc, setCvc] = useState('')
  const [expiry, setExpiry] = useState('')
  const [focus, setFocus] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [planDetail, setPlanDetail] = useState([]);
  const [pi_id, setPi_id] = useState('');





  let subtitle;


  useEffect(() => {
    getPlans();
    getPlanPrices();
  }, [])



  const getPlans = () => {

    const headers = {
      "accept": "application/json",
      "secertkey": getSecretValue,
      "openai": ApiEndPoint.OpenAIKey

    }
    setLoading(true)
    API.get(ApiEndPoint.GetPlan, "",{
      headers: headers
    }).then((response) => {

      console.log('result GetPlan', response.data.data);      
      setPlanDetail(response.data.data);

    })
      .catch((error) => {
        console.log('error', error);
        setLoading(false)
      });

  }

  const getPlanPrices = () => {

    const headers = {
      "accept": "application/json",
      "secertkey": getSecretValue,
      "openai": ApiEndPoint.OpenAIKey

    }
    setLoading(true)
    API.get(ApiEndPoint.PlanPrices, {
      headers: headers
    }).then((response) => {

      console.log('result PlanPrices', response.data.data);
    })
      .catch((error) => {
        console.log('error', error);
        setLoading(false)
      });

  }


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleInputFocus = (e) => {
    setFocus(e.target.name)
  }

  const handleInputChange = (e) => {
    setNumber(e.target.value)
  }

  const createPaymentIntent=()=>{

    var bodyFormData = new FormData();
        bodyFormData.append("email", email);
        const headers = {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
            "secertkey": getSecretValue,
            "openai": ApiEndPoint.OpenAIKey

        }

        API.post(ApiEndPoint.CreatePaymentIntent,{
            headers: headers
        }).then((response) => {

            console.log('result CreatePaymentIntent', response.data.data);
            console.log("paymentIntent is", response.data.data.client_secret)
            setPi_id(response.data.data.client_secret);
            localStorage.setItem('paymentIntent',response.data.data.client_secret)
            setIsOpen(true);
            setLoading(false)

        })
            .catch((error) => {
                console.log('error', error);
                setLoading(false)

            });

  }

  const createSubscription=()=>{
    
  }

  return (
    <div>
      <SideBar />
      <div class="content">
        <h2>Responsive Column Cards</h2>
        <p>Resize the browser window to see the effect.</p>

        <div class="row">
          {planDetail.map((item) => {

            return (
              <div class="column">
                <div class="card">
                  <h3 style={{ color: 'green' }}>{item.name}</h3>
                {
                
                (item.id==1 && subscriptionStatus )?<button onClick={()=>{createPaymentIntent(item)}}>Your Current Plan</button>
                
                :
                (item.id==1)?<button>Your Current Plan</button>:
                <>
                 {/* <button disabled>Purchased</button> */}
                {JSON.parse(subscriptionStatus)?
                
                <button>Purchased</button>
              :
              <button onClick={()=>{createPaymentIntent(item)}}>Upgrade Plan</button>
            }
                </>
                }  

                  {(item.plan_feature_associates
                  ).map((item) => {
                    return (
                      <p>{item.name}</p>
                    )
                  })}
                </div>
              </div>

            )

          })}
        </div>
        <div>
          {/* <button onClick={openModal}>Open Modal</button> */}
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button style={{marginTop:20}} onClick={closeModal}>close</button>
            <div id="PaymentForm">
              <Test/>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default UpgradetoPlus