import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import axios from 'axios';
import Footer from './Footer';


String.prototype.toTitleCase = function () {
 return this[0].toUpperCase() + this.slice(1)
};

export default function Header() {
const [topMenu, setTopMenu] = useState(false)
const [bottomMenu, setBottomMenu] = useState(true)

console.log(topMenu, bottomMenu)

const setStarter = () => {
	setTopMenu(() => true)
	setBottomMenu(() => true)
}

const getUser = () => {
  if (localStorage.getItem('userdata')) {
      return JSON.parse(localStorage.getItem('userdata'));
  }
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
  const [edit, setEdit] = useState()
  const [profile, setProfile] = useState()
  const [name, setName] = useState(getUser().firstName)
  const [surname, setSurname] = useState(getUser().surName)
  const [address, setAddress] = useState(getUser().address)
  const [image, setImage] = useState('')
  const [upload, setUpload] = useState(getUser().image)

  const handleImageChange = (e) => {
     setImage(e.target.files[0])
   } 


 const handleImageUpload = () => {
    let formData = new FormData()
    formData.append('file', image)
     
    if (!getUser().image){
      axios.post('/api/files/upload', formData)
      .then(response => { 
          alert("Uploaded")
          console.log('imageform', response)
          setUpload(response.data.name)
      
    }).catch(err => console.log(err))
     
  
    }

    else {
      formData.append('oldImage', getUser().image)
      axios.put('/api/files/edit', formData)
      .then(response => { 
          alert("Uploaded")
          console.log('imageform', response)
          setUpload(response.data.name)
      
    }).catch(err => console.log(err))
    }

  }
  const addressChange = (e) => {
    setAddress(e.target.value)
  } 

  const surnameChange = (e) => {
    setSurname(e.target.value)
  }


  const nameChange = (e) => {
    setName(e.target.value)
  }

  const editProfile = () => {
    setEdit(true)
    setProfile(false)
  }

  const Profile = () => {
    setProfile(true)
    setEdit(false)
  }
  useEffect(() => {
    if(!beatData.length){
      setEdit(true)
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

  const onProfileEdit = () =>{
    const user = {...getUser(), firstName: name, surName: surname, image: upload, address}
    console.log("token", getUser().token)
    axios.put('/api/account/user', user, 
    {
      headers: {
        'Authorization': `Bearer ${getUser().token}`
      }
    })
      .then(response => { 
          alert("Uploaded")
          console.log('user', response)
          const {data} = response;
          setName(data.firstName)
          setSurname(data.surName)
          setAddress(data.address)
          
      
    }).catch(err => console.log(err))
  }
  


console.log("user",getUser())
console.log("name",name)
console.log("surname",surname)
console.log("address",address)
console.log("image",image)
console.log("upload",upload)



    return (
 
      <>
	   <div class="main-banner-w3ls2">
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

		<div className="banner-agile-text banner-size">
			<div className="container">
				<div className="banner-text-size-w3ls">
                 
					<div className="banner-para-wthree">
            <div className="row">
              <div className="col-md-4">
                 <img src={upload} className="circle"/>
              </div>
              <div className="col-md-8 pad-circle">
                 <h3 className="banner-first">User</h3>
                  <h2 className="banner-second">{getUser().firstName.toTitleCase()} {getUser().surName && getUser().surName.toTitleCase()}</h2>
                    <p className="banner-p">{getUser().email}</p>
                 <div className="d-flex edit">
                   <p onClick={Profile} className="profile-edit">Edit Profile</p>
                   <p onClick={editProfile} className="profile-update">Purchased Sounds</p>
                 </div>
              </div>
            </div>
        
            
          </div>
					
			
					  
					  
						
					
				
				</div>
			</div>
		</div>
		</div>
        <div className={ edit ? "contain filter": "beat-none"}>
             <h3 class="uploaded collection">Purchased Sounds</h3>
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
        
        <div className={ profile ? "container filter": "beat-none"}>
        <div className="row pad-contact">
                        <div className="col-md-12">
                        <div className="card" style={{ border:"none"}}>
                        <div className="card-body my-card">
                            <h2 className="send">Edit profile</h2>
                            <div className="d-flex">
                                <div style={{width:"100%"}}>
                                    <h3 className="details">FirstName</h3>
                                    <input onChange={nameChange} value={name} className="input-text form-control" type="text"/>
                                </div>
                                <div style={{width:"100%"}}>
                                    <h3 className="details">Surname</h3>
                                    <input onChange={surnameChange} value={surname} className="input-text form-control" type="text"/>
                                </div>

                            </div>

                            <div className="d-flex">
                                <div style={{width:"100%"}}>
                                    <h3 className="details">Address</h3>
                                    <input onChange={addressChange} value={address} placeholder={getUser().address && getUser().address.toTitleCase()}  className="input-text form-control" type="text"/>
                                </div>
                                <div style={{width:"100%"}}>
                                    <h3 className="details">Image</h3>
                                    <div>
                                    <input type="file" name="file" id="file"  onChange={handleImageChange}  className="inputfile input-text form-control" type="file"/>
                                    <button className="btn-style button-image"  type="button" onClick={handleImageUpload}>Upload</button>
                                    </div>
                                   
                                </div>

                            </div>
                           <div className="d-flex">
                            <button className="blog-butt center-button" onClick={onProfileEdit} style={{marginLeft: "16px"}}>Edit Profile</button> 
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
