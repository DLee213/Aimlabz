import React from 'react'
import './module.menuscreen.css';

export const MenuScreen = ({ points, startGame }) => {
  return (
    <div className="menu-screen">
        <h1 className="prev-point-name">Highscore: {points}</h1>
        <hr/>
        <button 
          onClick={startGame}
          className="start-game"
        >
          Start Game!
        </button>
    </div>
  )
}
