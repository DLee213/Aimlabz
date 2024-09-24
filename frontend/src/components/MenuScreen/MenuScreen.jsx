import gif from "../../assets/dance.gif"
import './module.menuscreen.css';
import { useState } from "react";

export const MenuScreen = ({ points, startGame, userName, leaderboard }) => {
  const [cursorCoord, setCursorCoord] = useState({ left: 0, top: 0 })

  function handleMouseMove(e) {
    setCursorCoord({ left: e.clientX })
  }

  return (
    <div className="menu-screen">
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.slice(0, 5).map((entry, index) => (
            <li key={index}>
              {index + 1}. {entry.user}: {entry.score}
            </li>
          ))}
        </ul>
      </div>

      <h1 className="prev-point-name">{userName}'s High Score: {points}</h1>
      <hr />

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
  )
}
