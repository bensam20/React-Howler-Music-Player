import React, { useContext } from 'react'
import { musicListBaseUrl } from '../constants/constants'
import { PlayerContext } from './MusicPlayer'
import { FaPlay, FaStop, FaStepForward, FaPause } from "react-icons/fa";


function PlayerControls() {
  const playerContext = useContext(PlayerContext);

  const handleAction = (action) => {
    if(action === 'play') {
      playerContext.playTrack(playerContext.selectedTrack, action);
      playerContext.setPlayPause('pause');
    }
    else if(action === 'pause') {
      playerContext.playTrack(playerContext.selectedTrack, action);
      playerContext.setPlayPause('play');
    }
    else if(action === 'stop') {
      playerContext.playTrack(playerContext.selectedTrack, action);
      playerContext.setPlayPause('play');
    }
    else if(action === 'next') {
      playerContext.playTrack(playerContext.selectedTrack, action);
      playerContext.setPlayPause('pause');
    }
  }



  return (
    <div className='playerControl' style={{'--bg-image': `url(${musicListBaseUrl+playerContext.selectedTrack?.artworkUrl})`}}>
      <div className='controls' style={{position: "absolute", top:"200px", left:"100px"}}>
        <span style={{height: "20px", marginLeft:"10px"}} onClick={()=>handleAction("stop")}><FaStop style={{fontSize: "70px",  background:"rgb(255, 255, 255,0.4)"}}/></span>
        {playerContext.playPause === 'play' ? 
          <span style={{height: "20px", marginLeft:"10px"}} onClick={()=>handleAction("play")}><FaPlay style={{fontSize: "70px", background:"rgb(255, 255, 255,0.4)"}}/></span>
          :
          <span style={{height: "20px", marginLeft:"10px"}} onClick={()=>handleAction("pause")}><FaPause style={{fontSize: "70px", background:"rgb(255, 255, 255,0.4)"}}/></span>
        }
        <span style={{height: "20px", marginLeft:"10px"}} onClick={()=>handleAction("next")}><FaStepForward style={{fontSize: "70px",  background:"rgb(255, 255, 255,0.4)"}}/></span>
      </div>
    </div>
  )
}

export default PlayerControls