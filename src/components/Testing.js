import React from 'react'
import { Elements, ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import InjectedCheckoutForm from './CheckoutForm';
import CheckoutForm from './CheckoutForm';
import CardSection from './CardSection';

const stripePromise = loadStripe('pk_test_51MOJinSCLva0PA1sPjAdppP0I7ZSKgNqIHL5GIfxczthPHeixMXPK2uf3S4fGHrkPy8NO8KNPP2BTglevCWtfnPK00X5s79O8a');




function Test() {

   const handleSubmit = async (data) => {
        const { stripe, elements } = data
        console.log("elements are",elements)
        if (!stripe || !elements) {
          return;
        }
    
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
          console.log(result.error.message);
        } else {
          console.log(result.token);
        }
      };

      
    return (
      <div className="App">
      <div className="product">
        {/* <img
          src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress"
          alt="laptop"
          style={{ width: "100%", height: "auto" }}
        /> */}
        <div>
          <Elements stripe={stripePromise}>
            <InjectedCheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
    )
}

export default Test