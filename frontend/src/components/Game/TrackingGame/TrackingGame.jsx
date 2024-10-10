// React Imports
import { useEffect } from "react";

// CSS
import './module.TrackingGame.css';



export const TrackingGame = ({ timer, logoPosition, setRandomLogoPosition, seconds, setIsHovering }) => {

    // Game Difficulty
    const EASY = 4
    const MEDIUM = 2
    const HARD = 1

    useEffect(() => {
        const interval = setInterval(setRandomLogoPosition, 1000)
        return () => clearInterval(interval); 
    }, [])

  return (
    <div className="game-container">
        <h1 className="second-name">Timer: {seconds}</h1>
        <p className="point-name">Tracked Time: {(timer / 100).toFixed(2)} seconds</p>
        
        <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            id='ball'
            alt="logo"
            style={{ 
                position: "absolute", 
                top: `${logoPosition.top}px`,
                left: `${logoPosition.left}px`,
                transition: `all ${EASY}s linear`
            }}
        ></div>

    </div>
)
}
