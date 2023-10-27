import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import API from './service/ApiService';
import { ApiEndPoint } from './service/ApiEndPoint';
import Modal from 'react-modal';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import Test from './Testing';
import { Link ,useNavigate} from 'react-router-dom';
import Footer from '../Footer';
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
    width: "350px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    border: "none"
  },
};



function UpgradetoPlus() {
  const getSecretValue = localStorage.getItem('secretKey');
  const subscriptionStatus = localStorage.getItem("subscription");
  const navigate = useNavigate()

  console.log("subscriptionStatus in UpgradePlus", JSON.parse(subscriptionStatus))

  console.log("secret key on Upgrade page", getSecretValue)
  const email = localStorage.getItem('email')

  const [loading, setLoading] = useState(false);
  const [freePlan, setFreePlan] = useState([]);
  const [premium, setPremium] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(JSON.parse(localStorage.getItem('modalIsOpen')) || false);
  const [cvc, setCvc] = useState('')
  const [expiry, setExpiry] = useState('')
  const [focus, setFocus] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [planDetail, setPlanDetail] = useState([]);
  const [pi_id, setPi_id] = useState('');



  const api_key = useApiKey()



  let subtitle;


  useEffect(() => {
    getPlans();
    getPlanPrices();
  }, [])



  const getPlans = () => {

    const headers = {
      "accept": "application/json",
      "secertkey": getSecretValue,
      "openai": api_key

    }
    setLoading(true)
    API.get(ApiEndPoint.GetPlan, "", {
      headers: headers
    }).then((response) => {

      console.log('result GetPlan', response.data.data[1]);
      setPlanDetail([response.data.data[1]]);

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
      "openai": api_key

    }
    setLoading(true)
    API.get(ApiEndPoint.PlanPrices, {
      headers: headers
    }).then((response) => {

      console.log('result PlanPrices', response.data);
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

  const createPaymentIntent = () => {

    var bodyFormData = new FormData();
    bodyFormData.append("email", email);
    const headers = {
      "accept": "application/json",
      "Content-Type": "multipart/form-data",
      "secertkey": getSecretValue,
      "openai": api_key

    }

    API.post(ApiEndPoint.CreatePaymentIntent, {
      headers: headers
    }).then((response) => {

      console.log('result CreatePaymentIntent', response.data.data);
      console.log("paymentIntent is", response.data.data.client_secret)
      setPi_id(response.data.data.client_secret);
      localStorage.setItem('paymentIntent', response.data.data.client_secret)
      setIsOpen(true);
      setLoading(false);
      localStorage.setItem('modalIsOpen',JSON.stringify(true));

    })
      .catch((error) => {
        console.log('error', error);
        setLoading(false)

      });

  }

  const createSubscription = () => {

  }
  console.log("chekingmodel",typeof modalIsOpen ,modalIsOpen)
  return (
    <div className='upgrade-plan'>
      {/* <SideBar /> */}
      <div class="content">
        {/* <h2>Responsive Column Cards</h2>
        <p>Resize the browser window to see the effect.</p> */}

        <div class="row">
          {planDetail.map((item) => {

            return (
              <div class="column">
                <div class="card">
                  <span><i class="fa-solid fa-angle-left back-arrorw-prem" onClick={()=>{navigate(-1)}}></i> </span>
           <h3> {item.name}</h3>
           <h1> $10/MO</h1>

                  {

                    (item.id == 1 && subscriptionStatus) ? <button >Your current plan</button>

                      :
                      (item.id == 1) ? <button>Purchase</button> :
                        <>
                          {/* <button disabled>Purchased</button> */}
                          {JSON.parse(subscriptionStatus) ?

                            <button>Purchased</button>
                            :
                            <>
                            <button onClick={() => { createPaymentIntent(item) }}>Upgrade Plan</button>
                            </>
                          }
                        </>
                  }

<div className='upgrade-para'>

                  {(item.plan_feature_associates
                  ).map((item) => {
                    return (
                      <>
                      { item.plan_id ==2 && <p>{item.name}</p>}
                      
                      </>
                    )
                  })}

</div>

                </div>
              </div>

            )

          })}
        </div>
        <div>
          {/* <button onClick={openModal}>Open Modal</button> */}
          { modalIsOpen ? <Modal
            isOpen="true"
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            {/* {console.log("chekingmodel",typeof modalIsOpen ,modalIsOpen)} */}
            <div id="PaymentForm">
              <Test  />
            <button className='payment-cancel-btn'  onClick={closeModal}>cancel</button>
            </div>
          </Modal>
          : null
}
         



        </div>
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default UpgradetoPlus