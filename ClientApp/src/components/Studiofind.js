import React, { useState, useEffect} from 'react';
import { Link, Route } from 'react-router-dom';


const data = [
	{
		name: "El corazon Studio",
		location: "22a professor Kiumiu Akingbehin street Lekki phase one",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
		amount:" 20,000",
		image:"images/Rectangle.png"

	},
	{
		name: "Hitmix Studio",
		location: "33b Adebayo Doherty Lekki phase one",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
		amount:" 300,000",
		image:"images/Rectangle2.png"

	},
	{
		name: "Mavin Studios",
		location: "8b Ademulegun street isolo, lagos",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
		amount:" 50,000",
		image:"images/Rectangle3.png"

	}
]


export default function Studiofind() {
	
const [search, setSearch] = useState(data)
const [searched, setSearched] = useState("");

useEffect(() => {
	if(searched){
		setSearch(() => data.filter(c => c.name.toLowerCase().includes(searched.toLowerCase()) 
								|| c.location.toLowerCase().includes(searched.toLowerCase())))
	}
	else setSearch(() => data)

}, [searched])

const searchStudio = ({target: {value}}) => {
	setSearched(() => value)
  }

	console.log()
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
						<div class="wrapper">
							<input onChange={searchStudio} value={searched} class="input" className="search-input" placeholder="Search" type="text" />
							<span class="underline"></span>
						</div>
				</div>
				
			</div>
		</div>
		</div>
    

<div className="container up-studio" >
	<h2 className="main-studio">Studios</h2>
{search.map((bd) => (
	 <div className="row spacing">
	 <div className="col-md-4">
      <img className="width-studio" src={bd.image}/>
	 </div>
	 <div className="col-md-8">
        <h3 className="studio-name"> {bd.name}</h3>
		<h1 className="studio-location">{bd.location}</h1>
		<p className="studio-description">{bd.description}</p>
        <h4 className="studio-amount">N{bd.amount}</h4>
	 </div>
	 
 </div>
	
))}

 </div>

</>
     
    )
}
