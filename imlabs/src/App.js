import './App.css';
import { useState } from "react";
import logo from "./logo.svg"


function App() {
  const [gameStarted, setGameStarted] = useState(true);
  const [seconds, setSeconds] = useState(5);
  const [points, setPoints] = useState(0);
  const [pastPoints, setPastPoints] = useState(0);

  
  function game() {
    setGameStarted(false);
    
    let timer = setInterval(function() {
      setSeconds(prev => prev - 1);
      if (setSeconds(prev) === 0) {
        setPastPoints(points);
        setPoints(0);
        setGameStarted(true);
        clearInterval(timer);        
      }

    }, 1000);
    
    

  }

  function handlePoints() {
    setPoints(prev => prev + 1);
  }
  

  return (
    <div className="App">
      <p id="seconds">{seconds}</p>
      
      {gameStarted ? (
        <div>
          <p>Last game points: </p>
          <p id="past-points">{pastPoints}</p>
          
          <hr/>
          <button onClick={game}>Start Game!</button>
        </div>
      ) : (
        <div className="game-container">
            <p>Points: </p>
            <p id="points">{points}</p>
            <img onClick={handlePoints} src={logo} alt="logo" width={50} height={50}/>
            <h1>GAME HAS STARTED!</h1>
        </div>
      )}
    </div>
  );
}


export default App;