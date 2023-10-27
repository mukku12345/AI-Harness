// import React, { useEffect, useState } from "react";
// import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
// import LoadingSpinner from "./LoadingSpinner";
// import Modal from 'react-modal';
// import { Link, useNavigate } from 'react-router-dom'
// import API from '../components/service/ApiService';
// import { ApiEndPoint } from '../components/service/ApiEndPoint';
// import CardSection from "./CardSection";
// import { useApiKey } from "./context";


// Modal.setAppElement('#root');
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// const loadingStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: "orange",
//     border: "none"

//   },
// };
// const paymentStatusStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: "white",
//     border: "none",
//     height: " 237px",
//     width: "350px"

//   },
// };




// const CheckoutForm = (props) => {
//   const [loading, setLoading] = useState(false);
//   const [congrats, setCongrates] = useState(false);
//   const [paymentMessage, setPaymentMessage] = useState("");
//   const navigate = useNavigate()



//   const getSecretValue = localStorage.getItem('secretKey')
//   const getPI = localStorage.getItem('paymentIntent')
//   const api_key =  useApiKey();


//   useEffect(() => {
//     checkSubsciption()
//   }, [])

//   const handleSubmit = async event => {
//     const { stripe, elements } = props;

//     if (!stripe || !elements) {
//       return;
//     }
//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       localStorage.setItem('modalIsOpen', JSON.stringify(false));
//       setLoading(true)
//       console.log('[PaymentMethod]', paymentMethod);
//       const tokenId = paymentMethod.id;
//       var bodyFormData = new FormData();
//       bodyFormData.append("plan", '2');
//       bodyFormData.append("token", tokenId);


//       const headers = {
//         "accept": "application/json",
//         "Content-Type": "multipart/form-data",
//         "secertkey": getSecretValue,
//         "openai": api_key

//       }

//       API.post(ApiEndPoint.CreateSubscription, bodyFormData, {
//         headers: headers
//       }).then((response) => {

//         console.log('result', response.data.message);

//         setCongrates(true);

//         setPaymentMessage(response.data.message);

//         setLoading(false)

//         checkSubsciption();

//         setTimeout(() => {
//           setCongrates(false);
//           navigate("/");
//         }, 1000)

//       })
//         .catch((error) => {
//           console.log('error', error);
//           setLoading(false)
//         });
//     }
//   };

//   const checkSubsciption = () => {
//     const headers = {
//       "accept": "application/json",
//       "secertkey": getSecretValue,
//       "openai": api_key

//     }


//     API.post(ApiEndPoint.CheckSubscription, "", {
//       headers: headers
//     }).then((response) => {

//       console.log('checkSubscription', response.data.message);
//       let subscriptionStatus = response.data.message.status;
//       localStorage.setItem("subscription", subscriptionStatus)
//       console.log("subscriptionStatus", subscriptionStatus)
//     })
//       .catch((error) => {
//         console.log('error in checkSubscription', error.response.data);
//       });
//   }

//   return (
//     <div>
//       <div class="product-info">
//         <h3 className="product-title">Please provide payment Details</h3>
//       </div>
//       <CardSection />
//       <button data-secret={getPI} onClick={() => { handleSubmit() }} className="btn-pay">
//         Buy Now
//       </button>

//       <>

//         {/* payment status model */}

//         <Modal
//           isOpen={congrats}
//           style={paymentStatusStyles}
//           contentLabel="Example Modal"
//         >

//           <div>
//             <div className="congrts-div">
//               <h1><i class="fa-solid fa-check fa-beat-fade"></i></h1>
//             <h2 className="congrts-result">Payment Successfull</h2>
//             {/* <p className="congrts-para">successfull created account</p> */}

//             <p className="congrts-para">{paymentMessage}</p>
//             </div>
          

//           </div>
//         </Modal>

//         {/* /////////////////loading model ///////////////////// */}
//         <Modal
//           isOpen={loading}
//           style={loadingStyles}
//           contentLabel="Example Modal"
//         >
//           <p style={{ color: "whitesmoke" }}>Processing...</p>
//           <LoadingSpinner />

//         </Modal>

//       </>



//     </div>
//   );

// }

// export default function InjectedCheckoutForm() {
//   return (
//     <ElementsConsumer>
//       {({ stripe, elements }) => (
//         <CheckoutForm stripe={stripe} elements={elements} />
//       )}
//     </ElementsConsumer>
//   );
// }