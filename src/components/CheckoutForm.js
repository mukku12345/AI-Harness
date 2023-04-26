
import React,{useEffect} from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import CardSection from "./CardSection";

const CheckoutForm =(props)=> {
    const getSecretValue = localStorage.getItem('secretKey')
    const getPI=  localStorage.getItem('paymentIntent')



 useEffect(()=>{
    checkSubsciption()
 },[])

 const handleSubmit = async event => {
    const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
       const tokenId=paymentMethod.id;
      var bodyFormData = new FormData();
      bodyFormData.append("plan", '2');
      bodyFormData.append("token", tokenId);
     

      const headers = {
          "accept": "application/json",
          "Content-Type": "multipart/form-data",
          "secertkey": getSecretValue,
          "openai": ApiEndPoint.OpenAIKey

      }

      API.post(ApiEndPoint.CreateSubscription, bodyFormData, {
          headers: headers
      }).then((response) => {

          console.log('result', response);
          alert(response.data.message)
          checkSubsciption();
        
      })
          .catch((error) => {
              console.log('error', error);
          });
    }
  };
  
  const checkSubsciption=()=>{
    const headers = {
      "accept": "application/json",
      "secertkey": getSecretValue,
      "openai": ApiEndPoint.OpenAIKey

  }


  API.post(ApiEndPoint.CheckSubscription,"", {
      headers: headers
  }).then((response) => {
    console.log('reeeeeeeeeee checkSubscription1', response);
      console.log('reeeeeeeeeee checkSubscription', response.data.message);
      let subscriptionStatus=response.data.message.status;
      localStorage.setItem("Subscription",subscriptionStatus)
      console.log("subscriptionStatus",subscriptionStatus)
  })
      .catch((error) => {
          console.log('error in checkSubscription', error.response.data);
      });
  }

    return (
      <div>
        <div class="product-info">
          <h3 className="product-title">Enter You Card Details</h3>
        </div>
          <CardSection />
          <button data-secret={getPI} onClick={()=>{handleSubmit()}} className="btn-pay">
            Buy Now
          </button>
      </div>
    );
  
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}