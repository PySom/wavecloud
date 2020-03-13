import React, { useState } from 'react'


const play = document.getElementById('play');
const pause = document.getElementById('pause');

const volume = document.getElementById("volume")
const muted = document.getElementById("muted")
const audioTime = document.getElementById('audio-time');

export default function Audio(props) {
    const [audio, setAudio] = useState(false);
    const [volume, setVolume] = useState(false);
    const [audioTimeText, setAudioTimeText] = useState("0.00");
    
 
     function displayVolumeControl(type){
         if(type === "volume"){
             setVolume(() => false)
         }
         else{
            setVolume(() => true)
         }
 
     }

    // const audioPaused = (e) => {
    //     setAudio(() => true)
    //     //displayVolumeControl("muted")
    // }


    const audioCanPlay = (e) => {
        setVolume(() => true)
    }

    const audioTimeUpdated = (e) => {
        const myAudio = document.getElementById('my-audio');
        const bar = document.getElementById('bar');
        bar.style.width = parseInt(((myAudio.currentTime / myAudio.duration) * 100), 10) + "%";
        const currentTime = Math.floor(myAudio.currentTime);
        let minutes = Math.floor(currentTime / 60);
        let secs = Math.floor(currentTime % 60);
        let sec = secs < 10 ? `0${secs}`: secs 
        console.log(`${minutes}:${sec}`)
        setAudioTimeText(() => `${minutes}:${sec}`)
    }

    const rewindAudio = (e) => {
        const myAudio = document.getElementById('my-audio');
        myAudio.currentTime = myAudio.currentTime < 2 ? 0 : myAudio.currentTime - 2;
    }

    const playAudio = (e) => {
       const myAudio = document.getElementById('my-audio');
       myAudio.play();
       setAudio(() => false)
    }

    const pauseAudio = (e) => {
       const myAudio = document.getElementById('my-audio'); 
       myAudio.pause();
       setAudio(() => true)
    }

    const fastForwardAudio = (e) => {
        const myAudio = document.getElementById('my-audio');
        myAudio.currentTime = myAudio.currentTime + 2 >= myAudio.duration ? myAudio.duration : myAudio.currentTime + 2;
    }

    function progressAudio(e)  {
        // calculate the normalized position clicked
        console.log("the event",e)
        const myAudio = document.getElementById('my-audio');
        const pro = document.getElementById("progress")
        console.log("offsetting",pro.offsetLeft)
        const clickPosition = (e.pageX  - pro.offsetLeft) / pro.offsetWidth;
        console.log(clickPosition, myAudio.duration)
        const clickTime = clickPosition * myAudio.duration;

        // move the playhead to the correct position
        myAudio.currentTime = clickTime;
    }

    const showVolume = (e) => {
        const myAudio = document.getElementById('my-audio');
        myAudio.muted = true;
        setVolume(()=> false)
    }

    const muteVolume = (e) => {
        const myAudio = document.getElementById('my-audio');
        myAudio.muted = false;
        setVolume(()=> true)
    }

    function progressVolume (e) {
        // calculate the normalized position clicked
        const myAudio = document.getElementById('my-audio');
        const pV = document.getElementById('progress-v-bg');
        console.log("offsetting",window, window.offsetLeft)
        const clickPosition = (e.pageX  - pV.offsetLeft) / pV.offsetWidth;
        console.log(clickPosition)
        const volumeTime = clickPosition * 1;
        const pb = document.getElementById("progress-bar");
        pb.style.width = parseInt(volumeTime * 100) + "%";
        myAudio.volume = volumeTime;
    }



    return (
        <>
           <audio 
                onTimeUpdate={audioTimeUpdated}
                onCanPlay={audioCanPlay}
                id="my-audio">
              <source src="music/music.mp3" type="audio/mpeg"/>
            </audio>
            
            <div id="controls" class="audio-bg">
                <img src="images/smallpic.png" className="smallpic"/>
                <button onClick={rewindAudio} id="rw"><img src="images/left.png" className="leftright" alt="click to rewind the audio"/></button>
                <button onClick={playAudio} id="play" style={{display: audio ? "block": "none"}}><img src="images/playbutton.png" className="pauseplay" alt="click to play the audio"/></button>
                <button onClick={pauseAudio} id="pause" style={{display: !audio ? "block": "none"}}><img src="images/pausebutton.png" className="pauseplay" alt="click to pause the audio"/></button>
                <button onClick={fastForwardAudio} id="ff"><img src="images/right.png" className="leftright" alt="click to fast forward the audio"/></button>
                <div onClick={progressAudio} id="progress" class="played-bg">
                    <div id="bar" class="played-pc"></div>
                </div>
                <span id="audio-time">{audioTimeText}</span>
                <button onClick={showVolume} id="volume" style={{display: volume ? "block": "none"}}><img src="images/volume.png" className="volume" alt="click to mute or unmute the audio"/></button>
                <button onClick={muteVolume} id="muted" style={{display: !volume ? "block": "none"}}><img src="images/muted.png" className="mute" alt="click to mute or unmute the audio"/></button>
                <div onClick={progressVolume} id="progress-v-bg" class="volume-bg">
                    <div id="progress-bar" class="volume-pc"></div>
                </div>
          </div>
        </>
    )
}
