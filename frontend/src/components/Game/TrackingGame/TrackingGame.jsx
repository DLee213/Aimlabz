import React from 'react'
import './module.TrackingGame.css';

export const TrackingGame = ({ timer, ballPosition, seconds, setIsHovering }) => {
  return (
    <div className="game-container">
        <h1 className="second-name">Timer: {seconds}</h1>
        <p className="point-name">Tracked Time: {(timer / 100).toFixed(2)} seconds</p>
        
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            id='ball'
            alt="logo"
            style={{ position: "absolute", top: ballPosition.top, left: ballPosition.left }}
        ></div>

    </div>
)
}
