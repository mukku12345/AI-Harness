import React from 'react'

import Header from './Header';
import Footer from '../Footer';

import { Link, useLocation } from 'react-router-dom';

function Dashboard() {
 
  const location = useLocation();
  console.log(location.pathname);
  var routeName = location.pathname

  

 
  return (
   
    <section class="main-container">
    <div class="inner-container">
        <div className='ext-prompt-chat'>
        <div ><Link className={routeName == '/dashboard' ? "active" : "/" ? "active" :null} to=''>Propmts</Link></div>
        <div><Link className={routeName == '/chat' ? "active" : null} to='/chat'>Chat</Link></div>
        </div>
        <Header />
        


      <div class="page-list">

        <li><Link className={routeName == '/create' ? "active" : null} to='/create'><span><i class="fa-solid fa-book-open"></i> Content Writer</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>
        <li><Link className={routeName == '/create' ? "active" : null} to='/speechtotext'><span><i class="fa-solid fa-book-open"></i> Speech-to-Text</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>
        <li><Link className={routeName == '/image-generator' ? "active" : null} to='/image-generator'><span><i class="fa-solid fa-book-open"></i> Image Generator</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>
        {/* <li><Link className={routeName == '/image-generator' ? "active" : null} to='/image-generator'><span><i class="fa-solid fa-book-open"></i> Comparison</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li> */}
        <li><Link className={routeName == '/promptai' ? "active" : null} to='/promptai'><span><i class="fa-solid fa-book-open"></i> Prompt Base</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>
        <li><Link className={routeName == '/aiForm' ? "active" : null} to='/aiForm'><span><i class="fa-solid fa-book-open"></i>AI Forms</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>

        <li><Link className={routeName == '/audiototext' ? "active" : null} to='/audiototext'><span><i class="fa-solid fa-book-open"></i> Audio Convertor</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>
        <li><Link className={routeName == '/readpdf' ? "active" : null} to='/readpdf'><span><i class="fa-solid fa-book-open"></i> Read PDF</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>
        <li><Link className={routeName == '/summarize' ? "active" : null} to='/summarize'><span><i class="fa-solid fa-book-open"></i> Summarize</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>
        <li><Link className={routeName == '/key-insight' ? "active" : null} to='/key-insight'><span><i class="fa-solid fa-book-open"></i> Key Insights</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>
        <li><Link className={routeName == '/main-takeway' ? "active" : null} to='/main-takeway'><span><i class="fa-solid fa-book-open"></i> Main Takeaway</span> <span> <i class="fa-solid fa-angle-right"></i></span></Link></li>
        {/* <ul>
          <li> <Link className={routeName == '/create' ? "active" : null} to='/create'><span><img src={Outline} alt="" /> Content Writer</span> <span><img src={Caret} alt="" /></span></Link></li>
          <li> <Link className={routeName == '/chat' ? "active" : null} to='/chat'><span><img src={Outline} alt="" /> ChatGPT</span> <span>  <img src={Caret} alt="" /></span></Link></li>
          <li> <Link className={routeName == '/image-generator' ? "active" : null} to='/image-generator'><span><img src={Outline} alt="" /> Image Generator</span> <span>  <img src={Caret} alt="" /></span></Link></li>
          <li><Link className={routeName == '/aiForm' ? "active" : null} to='/aiForm'><span><img src={Outline} alt="" /> AI Forms</span> <span>  <img src={Caret} alt="" /></span></Link></li>
          <li><Link className={routeName == '/promptai' ? "active" : null} to='/promptai'><span><img src={Outline} alt="" /> Prompt Base</span> <span>  <img src={Caret} alt="" /></span></Link></li>
          <li> <Link className={routeName == '/audiototext' ? "active" : null} to='/audiototext'><span><img src={Outline} alt="" /> Audio Convertor</span> <span>  <img src={Caret} alt="" /></span></Link></li>
        </ul> */}

      </div>
      </div>
      <Footer />
    </section>
  )
}

export default Dashboard