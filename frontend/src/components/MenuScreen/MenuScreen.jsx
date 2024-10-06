import GameOptions from "./GameOptions";
import MenuInfo from "./MenuInfo";

import './module.menuscreen.css';
import { useState } from "react";

// Game Imports

export const MenuScreen = ({ points, startGame, userName, leaderboard }) => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="menu-screen">
      <MenuInfo
        selectedGame={selectedGame} 
        setSelectedGame={setSelectedGame}
        userName={userName}
        leaderboard={leaderboard}
        startGame={startGame}
      />

      <GameOptions 
        selectedGame={selectedGame} 
        setSelectedGame={setSelectedGame}
      />
    </div>
  )
}
