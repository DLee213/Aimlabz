import './App.css';
import { useState, useEffect } from "react";

import { MenuScreen } from "./components/MenuScreen/MenuScreen.jsx"
import { Game } from "./components/Game/Game.jsx"

const BUTTON_WIDTH = 50
const BUTTON_HEIGHT = 150

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [points, setPoints] = useState(0);
  const [highscore, setHighScore] = useState(0);
  const [logoPosition, setLogoPosition] = useState({top: 0, left: 0})

  useEffect(() => {
    const savedHighScore = localStorage.getItem("Highscore");
    setHighScore(savedHighScore);
  },[])

  useEffect(() => {
    let timer_two;
    if (seconds > 0) {
      timer_two = setTimeout(function () {
        setSeconds(seconds - 1)
      }, 1000)
    }

    if (seconds === 0 && isPlaying) {
      setIsPlaying(false);

      if(points > highscore){
        setHighScore(points);
        localStorage.setItem("Highscore", points);
      }
    }

    return () => clearTimeout(timer_two);

  }, [seconds, isPlaying])

  function handlePoints() {
    setPoints(prev => prev + 1);
    setRandomLogoPosition()
  }

  function setRandomLogoPosition() {
    const maxWidth = window.innerWidth - BUTTON_WIDTH;
    const maxHeight = window.innerHeight - BUTTON_HEIGHT;

    const randomTop = Math.floor(Math.random() * maxHeight);
    const randomLeft = Math.floor(Math.random() * maxWidth);

    setLogoPosition({top: randomTop, left: randomLeft});
  }

  function startGame() {
    setIsPlaying(true);
    setSeconds(10);
    setPoints(0);
    setRandomLogoPosition();
  }

  return (
    <div className="App">
      {isPlaying ? (
        <Game 
          points={points}
          handlePoints={handlePoints}
          logoPosition={logoPosition}
          seconds = {seconds}
        />
        ) : (
        <MenuScreen 
          points={highscore} 
          startGame={startGame} 
        />
      )}
    </div>
  );
}


export default App;