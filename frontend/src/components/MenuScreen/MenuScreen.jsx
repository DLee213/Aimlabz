import gif from "../../assets/dance.gif"
import './module.menuscreen.css';
import { useState } from "react";

export const MenuScreen = ({ points, startGame, userName }) => {
  const [cursorCoord, setCursorCoord] = useState({left: 0, top: 0})

  function handleMouseMove(e) {
    setCursorCoord({left: e.clientX})
  }

  return (
    <div className="menu-screen">
        <h1 className="prev-point-name">{userName}'s High Score: {points}</h1>
        <hr/>

        <button 
          onClick={startGame}
          onMouseMove={handleMouseMove}
          className="start-game-btn"
        >
          <img 
            src={gif} 
            alt="dancing marshmallow guy"
            id="dancing-marshmallow-gif"  
            style={{left: `${cursorCoord.left}px`}}        
          />
          Start Game!
        </button>
    </div>
  )
}
