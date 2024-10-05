import gif from "../../assets/dance.gif"
import './module.menuscreen.css';
import { useState } from "react";
import { motion } from "framer-motion";
// Game Imports

export const MenuScreen = ({ points, startGame, userName, leaderboard }) => {
  const [cursorCoord, setCursorCoord] = useState({ left: 0, top: 0 })
  const [isNormalOpen, setIsNormalOpen] = useState(false);
  const [isDifferentOpen, setIsDifferentOpen] = useState(false);

  function handleMouseMove(e) {
    setCursorCoord({ left: e.clientX })
  }

  return (
    <div className="menu-screen">
      <div className="menu-info">
        <h1>High Score: {points}</h1>

        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <ul>
            {leaderboard.slice(0, 5).map((entry, index) => (
              <li key={index}>
                {index + 1}. {userName === entry.user ? (
                  <strong>{entry.user} (you): {entry.score}</strong>
                ) : (
                  <>
                    {entry.user} : {entry.score}
                  </>
                )}

              </li>
            ))}
          </ul>

        </div>

        <button
          onClick={startGame}
          onMouseMove={handleMouseMove}
          className="start-game-btn"
        >
          <img
            src={gif}
            alt="dancing marshmallow guy"
            id="dancing-marshmallow-gif"
            style={{ left: `${cursorCoord.left}px` }}
          />
          Start Game!
        </button>
      </div>

      <div className="game-options">
          <h1>GAME OPTIONS</h1>

          <motion.div
            layout
            data-isOpen={isNormalOpen}
            initial={{borderRadius: 50}}
            className="parent"
            onClick={() => setIsNormalOpen(!isNormalOpen)}
            >
              <motion.div layout className="child"/>
            </motion.div>

            <motion.div
            layout
            data-isOpen={isDifferentOpen}
            initial={{borderRadius: 50}}
            className="parent"
            onClick={() => setIsDifferentOpen(!isDifferentOpen)}
            >
              <motion.div layout className="child"/>
            </motion.div>
      </div>
    </div>
  )
}
