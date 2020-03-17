import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import axios from 'axios';


export default function Header() {
const [topMenu, setTopMenu] = useState(false)
const [bottomMenu, setBottomMenu] = useState(true)

console.log(topMenu, bottomMenu)

const setStarter = () => {
	setTopMenu(() => true)
	setBottomMenu(() => true)
}

const authentication = () => {
	const token = localStorage.getItem('token');
	console.log('token', token)
    if (token) {
      return true;
	}
  }
  const [audio, setAudio] = useState()
  const [pic, setPic] = useState()
  const [beatSet, setBeatSet] = useState(false)
  const [beatData, setBeatData] = useState([])

  useEffect(() => {
    if(!beatData.length){
      setBeatSet(() => true)
    }
    axios.get('/api/beats')
    .then(response => {
        console.log('beatdata',response)
        setBeatData(() => response.data)
        //console.log(response)
    })
    .catch(err => console.log(err))
  }, [beatSet])

  const [decision, setDecision] = useState();

  const handleShow = (music, pic) => {
    setDecision(true);
    setAudio(() => music);
    setPic(() => pic);
  };

  const handleClose = () => {
    setDecision(false);
  };

  
  const getUser = () => {
    if (localStorage.getItem('userdata')) {
        return JSON.parse(localStorage.getItem('userdata'));
    }
}

console.log("user",getUser())

    return (
 
      <>
	   <div class="main-banner-w3ls">
      <header>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" >
              <Link to="/"><img src="images/WAVCLOUD.png" className="logo img-fluid" alt="" /> </Link>   
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-toggle" aria-controls="navbarNavAltMarkup"
				 aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
                <div className="collapse navbar-collapse navbar-toggle " id="navbarNavAltMarkup">
					<ul className="navbar-nav " style={{paddingRight: "14%", paddingLeft:"24%"}}>

						<li className="nav-item dropdown fix-it">
							
							<img
							src="images/menu.png" className="nav-link img-hover"
						/>
							<div className="dropdown-menu d-hover second" style={{paddingTop:"20px"}}>
								<div className="bg-white purple">
									<Link className="dropdown-item scroll" to="/">Beatstore/Instrumentals</Link>
									<Link className="dropdown-item scroll" to="/studiofind">StudioFind</Link>
									<Link className="dropdown-item" to="/profile" >My Profile</Link>
								</div>
							   </div>
						</li>

						<li  className="search">
							<img src="images/search.png" className="nav-link "/>
						</li>
					
					</ul>
					
				
					
				
				
					
				</div>
			
			</nav>
		</header>

		<div className="banner-agile-text">
			<div className="container">
				<div className="banner-text-size-w3ls">
                    <img src={getUser().image}className="circle"/>
					<p className="mt-3 mb-5 banner-para-wthree">
						Let’s Hear It</p>
					
			
					  
					  
						
					
				
				</div>
				
			</div>
		</div>
		</div>
        <div className="contain">
        <h3 class="uploaded collection">Collections</h3>
                <div className="top-padding">
                   <OwlCarousel
                     items="5"
                     className="owl-theme"
                     autoplay
                     dots
                     loop
                     >
               {beatData.map((bd) => {
                 console.log("inside beat data", bd)
                 return (
                    
                    <div className="item item-carousel">                         
                        <div className="card widthy">
                            <div>
                              <img className="imaging" src={bd.image}/>
                              <img onClick={() => handleShow(bd.content, bd.image)} className="play-it" src="images/play.png"></img>   
                            </div>
                            <div className="card-body">
                               <h2 className="title">{bd.description}</h2>                           
                               <img className="star-ish" src="images/star.svg" />
                              <p className="amount">${bd.amount}</p>
                            </div>
                        </div>
                  </div>
         
    
               )})}
                 </OwlCarousel>
                 </div>
         
              </div>
    </>

    )
}
