import React from 'react'
import { Link, useNavigate, Navigate,useLocation } from 'react-router-dom';

function SideBar() {
  const subscriptionStatus = localStorage.getItem("Subscription")

  const navigate=useNavigate()
  const location = useLocation();
  console.log(location.pathname);
  var routeName=location.pathname

  const onLogout = () => {
    // localStorage.removeItem("secretKey");
    localStorage.removeItem("Subscription");
    localStorage.removeItem("secretKey");

    // window.location.reload()
    navigate('/')
        window.location.reload()


  }
  return (
    <div class="sidebar">
          {console.log("in retun",routeName)}

      <Link  to='/dashboard'>Home</Link>
      <Link className= {routeName=='/chat'?"active":null} to='/chat'>Ask queries</Link>
      <Link className= {routeName=='/create'?"active":null}  to='/create'>Create Content</Link>
      <Link className= {routeName=='/image-generator'?"active":null} to='/image-generator'>Image Generator</Link>
      <Link className= {routeName=='/translate'?"active":null} to='/translate'>Language Translation</Link>
      <Link className= {routeName=='/audiototext'?"active":null} to='/audiototext'>Audio to Text</Link>
      <Link className= {routeName=='/engtranscription'?"active":null} to='/engtranscription'>English Transcriptions</Link>
      <Link className= {routeName=='/playground'?"active":null} to={subscriptionStatus?'/playground':'/upgradeToPlus'}>Playground*</Link>
      <Link className= {routeName=='/aiForm'?"active":null} to='/aiForm'>AI Form</Link>
      <Link className= {routeName=='/promptai'?"active":null} to='/promptai'>Prompt AI </Link>
      <Link className= {routeName=='/speechtotext'?"active":null} to='/speechtotext'>Speech To Text </Link>

      <Link className= {routeName=='/upgradeToPlus'?"active":null} to='/upgradeToPlus'>Upgade To Plus</Link>
      <Link className= {routeName=='/accountSetting'?"active":null} to='/accountSetting'>Account Settings</Link>

      <Link to='/' onClick={() => { onLogout() }}>Logout</Link>
    </div>
  )
}

export default SideBar