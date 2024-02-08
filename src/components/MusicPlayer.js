import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import {Howl, Howler} from 'howler';
import { musicListBaseUrl } from '../constants/constants';
import SongCard from './SongCard';
import PlayerControls from './PlayerControls';

export const PlayerContext = createContext(null);

function MusicPlayer() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [playPause, setPlayPause] = useState('play');
    const [trackIndex, setTrackIndex] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://retrowave.ru/api/v1/tracks?limit=10&cursor=1');
          setTracks(response.data.body.tracks);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const playTrack = (track, action, index) => {
        setSelectedTrack(track);
        setTrackIndex(index);
        if (currentTrack) {
            currentTrack.stop();
        }
        const sound = new Howl({
            src: [musicListBaseUrl+track?.streamUrl],
            html5: true,
            onplay: () => {
            setCurrentTrack(sound);
            },
            onend: () => {
            setCurrentTrack(null);
            },
            onstop: () => {
            setCurrentTrack(sound);
            },
            onpause: () => {
            setCurrentTrack(sound);
            },
            onloaderror: (id, error) => {
            console.error('Error loading sound:', error);
            }
        });
        if(action==='play'){
            sound.play();
            setPlayPause('pause');
        }
        else if(action==='pause'){
            sound.pause();
            setPlayPause('play');
        }
        else if(action==='stop'){
            sound.stop();
        }
        else if(action==='next'){
            console.log("next clicked", trackIndex+1, tracks[trackIndex+1]);
            sound.stop();
            if(tracks[trackIndex+1]===undefined){
                playTrack(tracks[0], 'play', 0);
                setTrackIndex(0);
            }
            else{
                playTrack(tracks[trackIndex+1], 'play', trackIndex+1);
                setTrackIndex(trackIndex+1);
            }
        }
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }  

  return (
    <div>
        <PlayerContext.Provider value={{selectedTrack, playTrack, playPause, setPlayPause}}>
            <div style={{position:"relative"}}>
                <h1 style={{color: "white"}}>Play Music</h1>
                <ul style={{listStyle: "none", marginLeft:"100px"}}>
                {tracks.map((track, index) => (
                    <li key={track.id} style={{border:`${track?.id === selectedTrack?.id ? "5px solid red":""}`, width:"510px"}} onClick={() => playTrack(track, "play", index)}>
                        <SongCard track={track}/>
                    </li>
                ))}
                </ul>
                <div style={{position:'absolute', right: "150px", top:"100px"}}>
                    <PlayerControls />
                </div>
            </div>
        </PlayerContext.Provider>
    </div>
  )
}

export default MusicPlayer