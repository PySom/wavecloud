import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';



export default function Header({userBeats,openModal}) {
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
						<li>
							<Link className="nav-link active"  to="/" >Home</Link>
						</li>
						<li>
						      <Link className="nav-link"  to="/about" >About</Link>
						</li>

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
						<li>
						     <Link className="nav-link"  to="/blog" >Blog</Link>
						</li>
						<li>
						    <Link className="nav-link"  to="/contact" >Contact</Link>
						</li>
					</ul>
					
					{ authentication() &&
					<Dropdown/>
                      }
					  { authentication() ? 
						
					    <>
					<a className="pointer" onClick={openModal}>
					  <img  className="cart" src="images/cart.png"/>
						  <span class="cart-span">{userBeats ? userBeats : ""}</span>			 
						  </a>
					  </>
					  : 
						 
						  <img className="cart2" src="images/cart2.png"/>
					 }
				
					
				
				
					
				</div>
			</nav>
		</header>

		<div className="banner-agile-text">
			<div className="container">
				<div className="banner-text-size-w3ls">
					<p className="mt-3 mb-5 banner-para-wthree">
						Let’s Hear It</p>
					
						{ !authentication() &&
						<>
						<Link className="btn button-style"  to="/register">Register</Link>
					   <Link  className="btn button-style-login" to="/login">Login</Link>
					   </>
					   }
					  
					  
						
					
				
				</div>
				
			</div>
		</div>
		</div>
    </>

    )
}
