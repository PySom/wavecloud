import React, { useState, useEffect } from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import Audiomac from './Audiomac';
import axios from 'axios';

const data = [
    {
      userId: "1",
      title: "Love",
      image: "images/m1.png",
      star: "images/star.svg",
      amount: "$112",
      music: "music/music.mp3"
    },
    {
        userId: "2",
        title: "hate",
        image: "images/m2.png",
        star: "images/star.svg",
        amount: "$112",
        music: "music/music.mp3"
      },
      {
        userId: "3",
        title: "Love",
        image: "images/m3.png",
        star: "images/star.svg",
        amount: "$112",
        music: "music/music.mp3"
      },
      {
        userId: "4",
        title: "hate",
        image: "images/m4.png",
        star: "images/star.svg",
        amount: "$112",
        music: "music/music.mp3"
      },
      {
        userId: "5",
        title: "love",
        image: "images/m1.png",
        star: "images/star.svg",
        amount: "$112",
        music: "music/music.mp3"
      },
      {
        userId: "6",
        title: "hate",
        image: "images/m2.png",
        star: "images/star.svg",
        amount: "$112",
        music: "music/music.mp3"
      },
      {
        userId: "7",
        title: "love",
        image: "images/m3.png",
        star: "images/star.svg",
        amount: "$112",
        music: "music/music.mp3"
      },
      {
        userId: "8",
        title: "hate",
        image: "images/m4.png",
        star: "images/star.svg",
        amount: "$112",
        music: "music/music.mp3"
      },
  ];

  console.log("data", data)


const categories = [
  {
    id: 1,
    name:"Hip Hop/ Trap",
    cat: [
      {
        image: "images/m1.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m4.png",
      },     
      {
        image: "images/m1.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m4.png",
      },     
    ] 
  },
  {
    id: 2,
    name: "Afro Beat",
    cat: [
      {
        image: "images/m4.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m1.png",
      },     
      {
        image: "images/m1.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m4.png",
      },     
    ] 
  },

  {
    id: 3,
    name: "House",
    cat: [
      {
        image: "images/m1.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m4.png",
      },     
      {
        image: "images/m1.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m4.png",
      },     
    ] 
  },
  {
    id: 4,
    name: "R & B",
    cat: [
      {
        image: "images/m4.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m1.png",
      },     
      {
        image: "images/m1.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m4.png",
      },    
    ] 
  },

  {
    id: 5,
    name: "EDM/ Electronic",
    cat: [
      {
        image: "images/m1.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m4.png",
      },     
      {
        image: "images/m1.png",
      },
      {
        image: "images/m2.png",
      },
      {
        image: "images/m3.png",
      },
      {
        image: "images/m4.png",
      },     
    ] 
  }
];

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

export default function Wavecloud() {
  const [beat, setBeat]= useState()
  const [beatCategory, setBeatCategory] = useState(categories)
  const [filter, showFilter] = useState()
  const [audio, setAudio] = useState()
  const [pic, setPic] = useState()
  const [beatData, setBeatData] = useState([])
  const [beatSet, setBeatSet] = useState(false)

  const beatStore = () => {
    document.getElementById("store").style.display = "none";
    document.getElementById("find").style.display = "none";
     setBeat(true)
  }

  useEffect(() => {
    if(!beatData.length){
      setBeatSet(() => true)
    }
    console.log("category", beatCategory)
    axios.get('/api/beats')
    .then(response => {
        console.log('beatdata',response)
        setBeatData(() => response.data)
        //console.log(response)
    })
    .catch(err => console.log(err))
  }, [beatSet])




  const genre = (id) => {
    const data = categories.filter(category => category.id === id,
       showFilter(true)
       );
    console.log(data)
    setBeatCategory(() => data);
  }

  const [decision, setDecision] = useState();

  const handleShow = (music, pic) => {
    setDecision(true);
    setAudio(() => music);
    setPic(() => pic);
  };

  const handleClose = () => {
    setDecision(false);
  };


    return (
     
    <div className="banner-bottom-agile text-center">
		<div className="py-xl-5 py-lg-3">
			<div className="mb-lg-5 mb-sm-4 mb-3">
				<h3 className="title-wthree mb-2">
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
                     
                      <button className={filter ? "filter  instrumental-button" : "filter-none"} style={{ backgroundColor: button.color, border:"none", color:"#fff"}}>
                        {button.name}
                      </button>
                  
                       
                      ))}
               
                   </div> 
                   
                    </div> 
                   
                  
                
                    
                
                              
                 </div>
               
          
                 <button id="find" className="beatstore"><span>
                    <img className="search-button" src="images/groupsearch.png" ></img>
                      </span>Studiofind
                    <img className="icon-drop" src="images/Polygon.png"></img>
                 </button>
                
                    
                      <div className={decision ? "decision" : "decision-none"}>
                           <Audiomac music={audio} pic={pic}/>
                    </div>
                
                   
            
                

            {beatCategory.length > 1 ?
              <>
              <div className="contain">
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
        
        
                 <div className="container">
                     <div className="top-padding">
				                <h3 className="uploaded">New Uploads</h3>
                          <OwlCarousel
                     items="4"
                     className="owl-theme"
                     autoplay
                     dots
                     loop
                     >
               {beatData.map((bd) => (
                    
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
         
    
               ))}
                 </OwlCarousel>
                      </div>
                 </div>
            
         
              </>
              : <div className="container">
              <div className="top-padding">
                 <OwlCarousel
                   items="4"
                   className="owl-theme"
                   autoplay
                   dots
                   loop
                   >
             {categories[0].cat.map((category) => (
                  
                  <div className="item item-carousel">                         
                      <div className="card widthy">
                          <div>
                            <img className="imaging" src={category.image}/>
                            <img onClick={handleShow} className="cat-it" src="images/play.png"></img>   
                          </div>
                      </div>
                </div>
       
  
             ))}
               </OwlCarousel>
            
               </div>
              
            </div>
            }
               
            </div>
        </div>
    
                )
            }
