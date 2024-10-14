import GameOptions from "./GameOptions";
import MenuInfo from "./MenuInfo";

import './module.menuscreen.css';


// Game Imports

export const MenuScreen = ({ timer, points, startGame, userName, timeLeaderboard, leaderboard, selectedGame, setSelectedGame, isOn, toggleSwitch }) => {


  return (
    <div className="menu-screen" data-isOn={isOn}>
      <MenuInfo
        timer={timer}
        selectedGame={selectedGame} 
        setSelectedGame={setSelectedGame}
        userName={userName}
        timeLeaderboard={timeLeaderboard}
        leaderboard={leaderboard}
        startGame={startGame}
        points={points}
      />

      <GameOptions 
        selectedGame={selectedGame} 
        setSelectedGame={setSelectedGame}
        isOn={isOn}
        toggleSwitch={toggleSwitch}
      />
    </div>
  )
}
