import { useState, useEffect } from "react"
import { sounds } from "./audios"
const BuildDrum = () => {
    const [drumName, setDrumName] = useState("");
    const [power, setPower] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const [color, setColor]=useState("blue")
    const toggler=()=>{
        setPower(!power)
        setDrumName(!power?"":"Closed drum")
        setColor(!power?"blue":"grey")
    }
    const handleVolume=(event)=>{
        setVolume(parseFloat(event.target.value))
        setDrumName(volume*100)
    }
   
    const playSound = (soundId) => {
        if (!power) return;
    
        const sound = sounds.find(s => s.id === soundId);
        if (sound) {
          const audio = new Audio(sound.src);
          audio.volume = volume; 
          audio.play();
          setDrumName(sound.name);
        }
      };
      const handleKey=(event)=>{
playSound(event.key.toUpperCase())
      }
      useEffect(()=>{
        window.addEventListener('keydown', handleKey)
        return()=>{
            removeEventListener('keydown', handleKey)
        }
    }, [power, volume])
    return(
        <div className="big">
<div className="drumBoard">
<div className="keyBoard">
{sounds.map(sound => (
            <input
              key={sound.id}
              type="button"
              className="drumKeys"
              value={sound.id}
              onClick={() => playSound(sound.id)}
              disabled={!power} // Disable keys when power is off
            />
          ))}
</div>
<div className="controller">
    <h3 style={{fontFamily: "fantasy"}}>Power</h3>
    <button className="power" onClick={toggler} style={{backgroundColor: color}}></button>
    <div className="displayer">
        {drumName}
    </div>
    <div>
        <label htmlFor="volume">
            <input type="range" className="range" id="volume" value={volume}
             step="0.01" min="0" max="1" onChange={handleVolume} disabled={!power}/>
        </label>
    </div>
</div>
</div>
        </div>
    )
}
export default BuildDrum