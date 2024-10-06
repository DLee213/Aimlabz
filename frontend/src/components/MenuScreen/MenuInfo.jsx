import { useState } from "react";
import gif from "../../assets/dance.gif"
import { motion } from "framer-motion"

const MenuInfo = ({ selectedGame, userName, points, leaderboard, startGame}) => {
    const [cursorCoord, setCursorCoord] = useState({ left: 0, top: 0 })

    function handleMouseMove(e) {
        setCursorCoord({ left: e.clientX })
      }

  return (
    <div className="menu-info">
      {selectedGame === "normal" && (
        <>
          <h1>High Score: {points}</h1>
          <div className="normal-leaderboard">
            <h2>Normal Game Leaderboard</h2>
            <ul>
              {leaderboard.slice(0, 5).map((entry, index) => (
                <li key={index}>
                  {index + 1}.{" "}
                  {userName === entry.user ? (
                    <strong>
                      {entry.user} (you): {entry.score}
                    </strong>
                  ) : (
                    <>
                      {entry.user} : {entry.score}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {selectedGame === "tracking" && (
        <>
          <h1>Longest Time: {points}</h1>
          <div className="normal-leaderboard">
            <h2>Tracking Game Leaderboard</h2>
            <ul>
              {leaderboard.slice(0, 5).map((entry, index) => (
                <li key={index}>
                  {index + 1}.{" "}
                  {userName === entry.user ? (
                    <strong>
                      {entry.user} (you): {entry.score}
                    </strong>
                  ) : (
                    <>
                      {entry.user} : {entry.score}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <motion.button
        onClick={selectedGame ? startGame : null}
        onMouseMove={handleMouseMove}
        className="start-game-btn"
        whileHover={{ scale: 1.1 }}
      >
        <img
          src={gif}
          alt="dancing marshmallow guy"
          id="dancing-marshmallow-gif"
          style={{ left: `${cursorCoord.left}px` }}
        />
        {selectedGame ? `Play ${selectedGame}` : "Select Game"}
      </motion.button>
    </div>
  );
};

export default MenuInfo;
