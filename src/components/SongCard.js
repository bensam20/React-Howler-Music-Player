import React from 'react'
import { musicListBaseUrl } from '../constants/constants'

function SongCard(props) {
  return (
    <div style={{height:"70px", background:"rgb(255, 255, 255,0.4)", width:"500px", margin:"5px", borderRadius:"10px"}}>
        <img style={{width:"50px", height:"auto"}} src={musicListBaseUrl+props.track.artworkUrl} alt=""/>
        <strong style={{color: "black"}}>{props.track.title}</strong> - {props.track.artist}
    </div>
  )
}

export default SongCard