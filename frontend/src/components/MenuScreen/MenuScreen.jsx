import GameOptions from "./GameOptions";
import MenuInfo from "./MenuInfo";

import './module.menuscreen.css';
import { useState } from "react";

// Game Imports

export const MenuScreen = ({ timer, points, startGame, userName, leaderboard, selectedGame, setSelectedGame }) => {

  return (
    <div className="menu-screen">
      <MenuInfo
        timer={timer}
        selectedGame={selectedGame} 
        setSelectedGame={setSelectedGame}
        userName={userName}
        leaderboard={leaderboard}
        startGame={startGame}
        points={points}
      />

      <GameOptions 
        selectedGame={selectedGame} 
        setSelectedGame={setSelectedGame}
      />
    </div>
  )
}
