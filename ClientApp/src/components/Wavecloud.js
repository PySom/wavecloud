import React, { useState, useEffect } from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import Audiomac from './Audiomac';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Rated from "./Rated";
import Modal from 'react-responsive-modal';


const buttonData = [
  {
    id: 1,
    name: "happy",
    color:"#FFE000"
  },
  {
    id: 2,
    name: "hypnotic",
    color:"#E66AC3"
  },
  {
    id: 3,
    name: "calm",
    color:"#84C4FF"
  },
  {
    id: 4,
    name: "sad",
    color:"#0A329A"
  },


]

const options = {
  responsiveClass: true,
  responsive: {
      0: {
          items: 1,
      },
      400: {
          items: 1,
      },
      600: {
          items: 2,
      },
      700: {
          items: 3,
      },
      1024: {
          items: 4,

      },

      1200: {
        items: 5,

    }
  },
};

export default function Wavecloud({addToCart,open,closeModal}) {
  const [beat, setBeat]= useState()
  const [beatCategory, setBeatCategory] = useState([])
  const [filter, showFilter] = useState()
  const [audio, setAudio] = useState()
  const [pic, setPic] = useState()
  const [beatData, setBeatData] = useState([])
  const [uploadData, setUploadData] = useState([])
  const [beatSet, setBeatSet] = useState(false)
  const [currentBeat, setCurrentBeat] = useState();


  const getUser = () => {
    if (localStorage.getItem('userdata')) {
        return JSON.parse(localStorage.getItem('userdata'));
    }
  }

  
  const getUserCart = () => {
    return JSON.parse(localStorage.getItem('usercart'))
  }

  console.log("cart", getUserCart())
  const beatStore = () => {
    document.getElementById("store").style.display = "none";
    document.getElementById("find").style.display = "none";
     setBeat(true)
     axios.get('/api/genres')
    .then(response => {
        console.log('genres',response)
        setBeatCategory(() => response.data)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log("changing times")
    if(!beatData.length){
      setBeatSet(() => true)
    }
    console.log("category", beatCategory)
    axios.get('/api/beats')
    .then(response => {
        console.log('beatdata',response)
        setBeatData(() => response.data)
        const newupload = response.data.filter(d => (Date.now() - new Date(d.dateAdded))/(1000 * 60 * 60 * 24) <= 2 )
       console.log("new", newupload)
       setUploadData(() => newupload)
    })
    .catch(err => console.log(err))
  
  
  
  }, [beatSet])

 


  const genre = (id) => {
    axios.get('/api/beats/'+id+"?parentId=true")
    .then(response => {
        console.log('beatdata',response)
        setBeatData(() => response.data)
        showFilter(true)
        setBeatCategory(() => beatCategory.filter(c => c.id === id))
        //console.log(response)
    })
    .catch(err => console.log(err))
    
  }

  const [decision, setDecision] = useState();

  const handleShow = (beat) => {
    const music = beat.content
    const pic = beat.image
    setCurrentBeat(beat)
    setDecision(true);
    setAudio(() => music);
    setPic(() => pic);
  };

  const handleClose = () => {
    setDecision(false);
  };

  const emotionChange = (id) => {
    console.log("beat cat", beatCategory[0].id)
    axios.get('/api/beats?emotion='+id+'&genreId='+beatCategory[0].id)
    .then(response => {
        console.log('emotion data',response)
        setBeatData(() => response.data)
        setBeatCategory(() => beatCategory.filter(c => c.id ))
        //console.log(response)
    })
    .catch(err => console.log(err))
  }

    return (
    
   <>
    
     <Modal open={open} onClose={closeModal} little>
     <div className="container up-studio" >
       <h2 className="main-studio">Cart</h2>
      {getUserCart() && getUserCart().map((cart) => (
        <div className="row spacing">
        <div className="col-md-5">
            <img className="widthy-studio" src={cart.image}/>
        </div>
        <div className="col-md-7">
              <h3 className="studio-name"> {cart.description}</h3>
              <Rated  beatId={cart.id} rate={cart.rating} userId={getUser() && getUser().id}/>
               <p>({cart.rating})</p>
              <h4 className="rating-amount"><span className="naira"> ₦</span>{cart.amount}</h4>
        </div>

         
      </div>
        
      ))}
      
      <div>
          <button className="butt-studio">Checkout</button>
        </div>

 </div>
     </Modal>
     
    <div className="banner-bottom-agile text-center">
		<div className="py-xl-5 py-lg-3">
			<div className="mb-lg-5 mb-sm-4 mb-3">
				<h3 className="title-wthree mb-2 mt-4">
				  <span className="mt-2 text-uppercase font-weight-bold">What’s On Wavcloud</span>
                  </h3>
			</div>
                <button id="store" onClick={beatStore} className="beatstore">
                  <span>
                    <img className="headphone" src="images/Group.png" ></img>
                      </span>Beatstore
                    <img className="icon-drop" src="images/Polygon.png"></img>
                 </button>

                 <div className={beat ? "beat container" : "beat-none"}>
                   <div className="d-flex">
                      <h3 className="what">What will you like to hear?</h3>       
                      <h3 className={filter ? "filter instrumental " : "filter-none"}  >Instrumental Legend</h3>
                    
                   </div>
                  <div className="row" id="cat">
                    <div className={beatCategory.length === 1 ? "col-md-10" : " d-flex"}>
                    {beatCategory.map((category) => (
                      <div className="beat-store-padding d-flex">
                      <button key={category.id} onClick={() => genre(category.id) } id="purple" className={beatCategory.length === 1 ? "beatstore pink purple-bg" :"beatstore pink beat-width"} >
                       {category.name}
                     </button>
                      </div>
                      
                  ))}
                    </div>
                    <div className="d-inline">
                      {buttonData.map((button) => (
                     
                      <button onClick={() => emotionChange(button.id)} className={filter ? "filter  instrumental-button" : "filter-none"} style={{ backgroundColor: button.color, border:"none", color:"#fff"}}>
                        {button.name}
                      </button>
                  
                       
                      ))}
               
                   </div> 
                   
                    </div> 
                   
                  
                
                    
                
                              
                 </div>
               
          
                        <Link to="/studiofind">
                        <button id="find" className="beatstore"><span>
                              <img className="search-button" src="images/groupsearch.png" ></img>
                                </span>Studiofind
                              <img className="icon-drop" src="images/Polygon.png"></img>
                          </button>
                        </Link>  
                
                    
                      <div className={decision ? "decision" : "decision-none"}>
                           <Audiomac music={audio} pic={pic} addToCart={(b) => addToCart(b)} beat={currentBeat} userId={getUser() && getUser().id}/>
                    </div>
                
                   
            
                


              <div className="contain">
                <div className="top-padding">
                   <OwlCarousel
                     items="5"
                     className="owl-theme"
                     autoplay
                     dots
                     loop
                     {...options}
                     
                     >
               {beatData.map((bd) => {
                 return (
                    
                    <div className="item item-carousel">                         
                        <div className="card widthy">
                            <div>
                              <img className="imaging" src={bd.image}/>
                              <img onClick={() => handleShow(bd)} className="play-it" src="images/play.png"></img>   
                            </div>
                            <div className="card-body">
                               <h2 className="title">{bd.description}</h2>                           
                               <Rating beatId={bd.id} rate={bd.rating} userId={getUser() && getUser().id}/>
                              <p className="amount">₦{bd.amount}</p>
                            </div>
                        </div>
                  </div>
         
    
               )})}
                 </OwlCarousel>
                 </div>
         
              </div>
                 <div className={uploadData === null ? "display-none" : "container display-block"}>
                     <div className="top-padding">
				                <h3 className="uploaded">New Uploads</h3>
                          <OwlCarousel
                     items="5"
                     className="owl-theme"
                     autoplay
                     dots
                     loop
                     >
               {uploadData.map((bd) => (
                    
                    <div className="item item-carousel">                         
                        <div className="card widthy">
                        <div>
                              <img className="imaging" src={bd.image}/>
                              <img onClick={() => handleShow(bd.content, bd.image)} className="play-it" src="images/play.png"></img>
                            </div>
                            <div className="card-body">
                               <h2 className="title">{bd.description}</h2>                           
                               <Rating/>
                              <p className="amount">₦{bd.amount}</p>
                            </div>
                        </div>
                  </div>
         
    
               ))}
                 </OwlCarousel>
                      </div>
                 </div>
            
         
               
            </div>
        </div>
    </>
                )
            }
