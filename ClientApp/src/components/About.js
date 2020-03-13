import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Dropdownn from './Dropdownn';



const authentication = () => {
	const token = localStorage.getItem('token');
	console.log('token', token)
    if (token) {
      return true;
	}
  }


export default function About() {
    return (
        <>
     <div class="about">
        <header>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" >
            <img src="images/wave.png" className="logo img-fluid" alt=""/>
                  </a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-toggle" aria-controls="navbarNavAltMarkup"
                   aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse navbar-toggle centered-nav " id="navbarNavAltMarkup">
                  <ul className="navbar-nav " style={{paddingRight: "14%", paddingLeft:"37%"}}>
                          <li>
                              <Link className="nav-link black"  to="/" >Home</Link>
                          </li>
                          <li>
                                <Link className="nav-link black  active"  to="/about" >About</Link>
                          </li>
  
                          <li>
                               <Link className="nav-link black"  to="/blog" >Blog</Link>
                          </li>
                          <li>
                              <Link className="nav-link black"  to="/contact" >Contact</Link>
                          </li>
                       </ul>
                       { !authentication() ? 
                       <>
                         <button className="auth-register">  <Link to="/register" className="allpurple"> Register </Link></button>
                         <button className="auth"  ><Link to="/login" className="allwhite"> Login</Link></button>
                  </>:

                     <Dropdownn/>
                  
                  }
                     </div>

                 
              </nav>
          </header>
          </div>

          <div className="grey">
              <div className="pad-grey">
                  <div className="d-flex">
                  <input className="search-grey" placeholder="Search  beats, producer, studios #tags"/>
                  <div className="pad-grey-left">
                      <img className="reduced-mail" src="images/pmail.png"/>
                  </div>
                  <p className="subscribe">Subscribe To Our News Letter</p>
                  </div>
                 
              </div>
          </div>

          <div className="lighter-grey">
              <div className="d-flex first-layer">
              <div className="pad-grey">    
                    <h3 className="aboutus">About us</h3>
                            <p className="aboutparagraph">Wavcloud inspires the music industry world wide with undiluted instrumentals</p>
                            <p className="aboutbelow">The all-in-one commerce platform to start, run and grow your music career</p>     
                 </div>   
                <div>
                    <img className="firstpic" src="images/rectangle.png"></img>
                </div>  
              </div>
             
          </div>

          <div className="lighter-grey">
              <div className="d-flex">
                   <div className="pad-grey">  
                   <img className="firstpic" src="images/rectangle2.png"></img>
                    </div>   
                <div>
                <h3 className="aboutuswhite">About us</h3>
                            <p className="aboutparagraph">A growth engine for modern instrumentals</p>
                            <p className="aboutbelow">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 

when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</p>     
                 
                </div>  
              </div>
             
          </div>

          <div className="lighter-grey">
              <div className="d-flex first-layer">
              <div className="container">    
                    <h3 className="h3-about text-center">OUR MISSION</h3>
                    <h2 className="h2-about text-center">Making instrumentals better for everyone</h2>
                      <p className=" about-p text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make </p>     
                 </div>   
            
              </div>
             
          </div>

          <Footer/>
    
      </>
  
      )
} 
