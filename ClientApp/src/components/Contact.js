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
     <div className="about">
        <header>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" >
            <img src="images/wave.png" className="logo img-fluid" alt=""/>
                  </a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-toggle" aria-controls="navbarNavAltMarkup"
                   aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse navbar-toggle centered-nav" id="navbarNavAltMarkup">
                  <ul className="navbar-nav " style={{paddingRight: "14%", paddingLeft:"37%"}}>
                          <li>
                              <Link className="nav-link black"  to="/" >Home</Link>
                          </li>
                          <li>
                                <Link className="nav-link black  "  to="/about" >About</Link>
                          </li>
  
                          <li>
                               <Link className="nav-link black"  to="/blog" >Blog</Link>
                          </li>
                          <li>
                              <Link className="nav-link black active"  to="/contact" >Contact</Link>
                          </li>
                       </ul>
                       { !authentication() ? 
                       <>
                         <button className="auth-register">  <Link to="/register" className="allpurple"> Register </Link></button>
                         <button className="auth"  ><Link to="/login" className="allwhite"> Login</Link></button>
                  </>:

                     <Dropdownn/>
                  
                  }</div>

                 
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
          <div className="greyish-bg">
             <div className="centering">
                 <h2 className="center-h2">Contact Information</h2>
                 <p className="center-p">Wavcloud Team are always ready to give you the best support you need.</p>
                 <button className="blog-butt center-button">Contact us</button>  
             </div>
           </div>

           <div className="container">
              <div className="row pad-contact">
                  <div className="col-md-4">
                  <div className="card" style={{width: "18rem", border:"none", paddingBottom:"54px"}}>
                    <div className="card-body my-card">
                        <div className="d-flex">
                            <img className="" src="images/call.png"></img>
                            <div className="call-padding">
                                <h3 className="call-h3">Phone number</h3>
                                <p className="call-p">08112513333</p>
                            </div>

                        </div>
                    </div>
                    </div>
                    <div className="card" style={{width: "18rem"}}>
                    <div className="card-body my-card">
                        <div className="d-flex">
                            <img className="" src="images/cemail.png"></img>
                            <div className="call-padding">
                                <h3 className="call-h3">Email Address</h3>
                                <p className="call-p">jdneliaku@yahoo.co.uk </p>
                            </div>

                        </div>
                    </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                  <div className="card" style={{ border:"none"}}>
                    <div className="card-body my-card">
                        <h2 className="send">Send Message</h2>
                        <div className="d-flex">
                            <div>
                                <h3 className="details">Your Name</h3>
                               <input placeholder="" className="input-text form-control"/>
                            </div>
                            <div>
                               <h3 className="details">Email Address</h3>
                               <input placeholder="" className="input-text form-control"/>
                            </div>

                        </div>
                        <div className="d-flex">
                         <div>
                            <h3 className="details">Phone Number</h3>
                            <input placeholder="" className="input-text form-control"/>
                         </div> 
                         <div>
                            <h3 className="details">Subject</h3>
                            <input placeholder="" className="input-text form-control"/>
                         </div>
                        </div>
                        <div className="d-flex">
                          <div>
                            <h3 className="details">Description</h3>
                            <input className="input-text-description form-control"/>
                          </div>
                        </div>
                        <div className="d-flex">
                        <button className="blog-butt center-button" style={{marginLeft: "16px"}}>Send  Message</button> 
                        </div> 
                    </div>
                    </div>
                  </div>
              </div>
           </div>


     

          <Footer/>
    
      </>
  
      )
} 
