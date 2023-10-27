import React, { useState, useEffect } from 'react'
import API from '../components/service/ApiService';
import { ApiEndPoint } from '../components/service/ApiEndPoint';
import { Link, useNavigate, Navigate, useLocation  } from 'react-router-dom';
import logo from '../assets/ge-logo.png';
import Modal from 'react-modal';
import LoadingSpinner from "./LoadingSpinner";
import { useApiKey } from './context';



Modal.setAppElement('#root');

const loadingStyles = {
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
  const isKeySettingStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "red",
      border: "none",
      width: "185px",
      textAlign: "center",
      color:" white"
  
    },
  };

function Header() {
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const[isKeySetting,setIsKeySetting] = useState(true);
    const navigate = useNavigate()
    const location = useLocation();
    const { apiKey,getApiKey} = useApiKey();


    const [hover,setHover] = useState(false);
    const [hoverSetting,setHoverSetting] = useState(false);

    const onHover =()=>{
      setHover(true)
    }
    const onLeave = () =>{
      setHover(false)
    }

const onSettinngHover = ()=>{
    setHoverSetting(true)
}
const onSettinngLeave = ()=>{
    setHoverSetting(false)
}
    console.log("apiikey==>",apiKey)
    var routeName = location.pathname
    console.log("routeName", routeName);
localStorage.setItem("pathName",routeName)

    const secret_key = localStorage.getItem('secretKey');
    const subscriptionStatus = localStorage.getItem('subscription');
    const isKey = localStorage.getItem('isKey');

    console.log("isKey in Header",isKey);



    const onLogout = () => {
        localStorage.removeItem("Subscription");
        localStorage.removeItem("secretKey");
        localStorage.removeItem("api_key");
        localStorage.removeItem("isLoggedIn");
        


        navigate('/')
        window.location.reload()

    }

    ////////check subscription ////////////////////////

    useEffect(() => {
        checkSubsciption();
        getApiKey()
    },[])

    const checkSubsciption = () => {
  

        const headers = {
            "accept": "application/json",
            "secertkey": secret_key,
        }


        API.post(ApiEndPoint.CheckSubscription, "", {
            headers: headers
        }).then((response) => {
          
            console.log('response checkSubscription', response.data.message);
            let subscriptionStatus = response.data.message.status;
            localStorage.setItem("subscription", subscriptionStatus)
            console.log("subscriptionStatus==>", subscriptionStatus)
            setLoading(false);
        })
            .catch((error) => {
                console.log('error in checkSubscription', error.response.data);
                setLoading(false);

            });
    }

    useEffect(()=>{

        handleKey();
    },[apiKey])

    const handleKey = () =>{

    if(isKey === "false"){
        navigate("/keysetting");
}

    
}



    return (
        <>
         {/* {isKeySetting && <Link to="/keySetting" onClick={()=>{setIsKeySetting(false)}}>Haven't set apiKey?</Link>} */}
            <div class="ai-header">
                {routeName == '/' ? <div class="ai-logo">
                    <img src={logo} alt="logo" className='ai-logo-image' />
                    <h2>AI Harness</h2>
                </div> :
                    <div class="ai-back">
                        <h2> <Link to='/'> <i class="fa-solid fa-angle-left"></i> Back </Link></h2>
                    </div>
                }
                      
                <div class="right-side">

                <a  href="https://aiharness.io/ai-harness-for-chrome/" target="_blank" >
                       <button className="upgrade_btn"> {subscriptionStatus === "true" ? "Premium" : "Upgrade!!"}</button>
                    </a>
{/* 
                <a className="upgrade_btn" href={`https://aiharness.io/extension-payment/?secretKey=${secret_key}&email=${email}`} target="_blank" >
                        {subscriptionStatus === "true" ? "Premium" : "Upgrade!!"}
                    </a> */}

                    {/* <a className="upgrade_btn" href={`https://aiharness.io/extensions/parameter.php?secretKey=${secret_key}&email=${email}`} target="_blank" onClick={checkPaymentStatus}>
                        {subscriptionStatus === "true" ? "Premium" : "Upgrade!!"}
                    </a> */}
                    {/* <Link class="upgrade_btn" to="/upgradeToPlus">{subscriptionStatus === "true"? "Premium" : "Upgrade!!"}</Link>  */}
                    {
                        routeName == '/setting_details' ? null :
                           <>
                           {hoverSetting && <p className='hover-text'>Setting</p>}
                           <Link class="setting" to="/setting_details"><i onMouseEnter={onSettinngHover} onMouseLeave={onSettinngLeave}    class="fa-sharp fa-solid fa-gear"></i></Link></>
                    }


                       
                    <Link class="power-off"  ><i onClick={() => { onLogout() }} onMouseEnter={onHover} onMouseLeave={onLeave} class="fa-solid fa-power-off"></i></Link>
                    {hover && <p className='hover-text-logout'>Logout</p>}
                </div>
            </div>

            <Modal
                isOpen={loading}
                style={loadingStyles}
                contentLabel="Example Modal"
            >
                {/* <p style={{ color: "whitesmoke" }}>Processing...</p> */}
                <LoadingSpinner />

            </Modal>
{/* 
           <Modal
                isOpen={isKeySetting}
                style={isKeySettingStyles}
                contentLabel="Example Modal"
            >
            </Modal> */}
        </> 
    )
}

export default Header