import React from 'react'
import { Link, Route } from 'react-router-dom';

export default function Studiofind() {
    return (
        <>
	   <div class="main-banner-w3ls">
      <header>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" >
          <img src="images/WAVCLOUD.png" className="logo img-fluid" alt=""/>
				</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-toggle" aria-controls="navbarNavAltMarkup"
				 aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse navbar-toggle " id="navbarNavAltMarkup">
					<ul className="navbar-nav mx-lg-auto" style={{paddingRight: "180px"}}>
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
		
						<img className="cart" src="images/cart.png"/><span class="cart-span">1</span>
					
					
				</div>
			</nav>
		</header>

		<div className="banner-agile-text">
			<div className="container">
				<div className="banner-text-size-w3ls">
					<p className="mt-3 mb-5 banner-para-wthree">
						Studiofind</p>
				
				</div>
				
			</div>
		</div>
		</div>
    

<div className="container">
    <div class="card" style={{marginTop: "40px", border:"none", marginBottom:"40px"}}>
    <div class="card-body">
    <div className="card-body my-card">
                        <h2 className="studio-sound">Find a Studio nearby</h2>
                        <div className="d-flex">
                            <div className="higher-width">
                                <h3 className="details">WHERE</h3>
                               <input placeholder="" className="input-text form-control"/>
                            </div>
                    

                        </div>
                        <div className="d-flex">
                         <div className="higher-width">
                            <h3 className="details">CHECK-IN</h3>
                            <input placeholder="" className="input-text form-control"/>
                         </div> 
                         <div className="higher-width">
                            <h3 className="details">CHECK-OUT</h3>
                            <input placeholder="" className="input-text form-control"/>
                         </div>
                        </div>
                        <div className="d-flex">
                         <div className="higher-width">
                            <h3 className="details">ADULTS</h3>
                            <input placeholder="" className="input-text form-control"/>
                         </div> 
                         <div className="higher-width">
                            <h3 className="details">CHILDREN</h3>
                            <input placeholder="" className="input-text form-control"/>
                         </div>
                        </div>
                        <div className="d-flex">
                        <button className="blog-butt center-button" style={{marginLeft: "16px"}}>SEARCH</button> 
                        </div> 
                    </div>
                  
    </div>
    </div>
</div>

</>
     
    )
}
