import React from 'react'
import './module.NormalGame.css';


export const NormalGame = ({ points, handlePoints, logoPosition, seconds }) => {
    return (
        <div className="game-container">
            <h1 className="second-name">Timer: {seconds}</h1>
            <p className="point-name">Points: {points}</p>
            
            <div
                onClick={handlePoints}
                id='ball'
                alt="logo"
                style={{ position: "absolute", top: logoPosition.top, left: logoPosition.left }}
            ></div>

        </div>
    )
}
