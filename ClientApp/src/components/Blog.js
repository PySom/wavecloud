import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Dropdownn from './Dropdownn';


const datum = [
    {
        theme: "Education",
        time: "SEPT.21, 2019",
        header: "WAVCLOUD ENHANCES STUDENTS’ ACCESS TO QUALITY MUSIC EDUCATION THROUGH ITS EDUCATION-FOCUSED MATERIAL RESOURCES",
        short: "donates hundreds of SUBEB approved reading & writing materials to Agidingbi Grammar School, Ikeja As part of activities earmarked to celebrate its 7th anniversary in Nigeria, leading online shopping destination, Jumia recently donated to Agidingbi",
        image:"images/rectangle.png"
    },
    {
        theme: "Sports",
        time: "SEPT.29, 2019",
        header: "WAVCLOUD ENHANCES STUDENTS’ ACCESS TO QUALITY MUSIC EDUCATION THROUGH ITS EDUCATION-FOCUSED MATERIAL RESOURCES",
        short: "donates hundreds of SUBEB approved reading & writing materials to Agidingbi Grammar School, Ikeja As part of activities earmarked to celebrate its 7th anniversary in Nigeria, leading online shopping destination, Jumia recently donated to Agidingbi",
        image:"images/rectangle2.png"
    },
]

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
                  <div className="collapse navbar-collapse navbar-toggle centered-nav" id="navbarNavAltMarkup">
                  <ul className="navbar-nav " style={{paddingRight: "14%", paddingLeft:"37%"}}>
                          <li>
                              <Link className="nav-link black"  to="/" >Home</Link>
                          </li>
                          <li>
                                <Link className="nav-link black  "  to="/about" >About</Link>
                          </li>
  
                          <li>
                               <Link className="nav-link black active"  to="/blog" >Blog</Link>
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
                  
                  }</div>

                 
              </nav>
          </header>
          </div>
             <div className="grey-bg">
           
            </div>

            <div className="lighter-grey">
            {datum.map((data) => (
                   <div className="container-fluid first-layer">
                  <div className="row">
                      <div className="col-md-6">
                      <h3 className="blog-starter">{data.theme} <span>|</span><span className="time">{data.time}</span></h3>
                        <p className="blog-mid">{data.header}</p>
                        <p className="blog-end">{data.short}</p>   
                        <button className="blog-butt">Read more</button>  
                      </div>
                   <div className="col-md-6">    
                   <img className="firstpic" src={data.image}></img>
                     </div>   
                    
                   </div>
                   </div>
            ))}
           
             
          </div>

          <Footer/>
    
      </>
  
      )
} 
