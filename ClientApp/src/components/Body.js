import React, {useState, useEffect} from 'react'
import Header from './Header'
import Wavecloud from './Wavecloud';
import Footer from './Footer';


const getUserCart = () => {
  return JSON.parse(localStorage.getItem('usercart'))
}

export default function Body() {
    const [open, setOpen] = useState(false);
    const [userBeats, setUserBeat] = useState(getUserCart() || []);



    useEffect(() => {
      localStorage.setItem("usercart", JSON.stringify(userBeats))
    
    
    }, [userBeats])

    


    const addToCart = (beat) => {
      console.log("my stuff", beat)
      console.log('mybeat', userBeats)
      const exist = userBeats.some(c => c.id === beat.id);
      console.log(exist)
      if(!exist){
        setUserBeat(() => [...userBeats, beat])
      }
    }

  

    const onOpenModal = () => {
      console.log("clicked", open)
      setOpen(true)
    }

    const onCloseModal = () => {
      setOpen(false)
    }

    return (
      <>
      <Header openModal={onOpenModal}  userBeats={userBeats.length}/>
      <Wavecloud  open={open} closeModal={onCloseModal} addToCart={(beat) => addToCart(beat)}/>
      <Footer/>
      </>
    )
}
