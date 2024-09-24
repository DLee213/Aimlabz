import './App.css';

import { useState, useEffect } from "react";
import { useMutation, useQuery} from "react-query";
import axios from "axios";

import { MenuScreen } from "./components/MenuScreen/MenuScreen.jsx"
import { Game } from "./components/Game/Game.jsx"
import {SignIn} from "./components/SignIn/SignIn.jsx"


const BUTTON_WIDTH = 50
const BUTTON_HEIGHT = 150

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [points, setPoints] = useState(0);
  const [highscore, setHighScore] = useState(0);
  const [logoPosition, setLogoPosition] = useState({ top: 0, left: 0 })
  const [userName, setUserName] = useState("");

  const saveHighScoreMutation = useMutation(async ({userName, score}) => {
    return await axios.post("http://localhost:5000/saveHighScore", {userName, score})
  })

  const fetchHighScore = useQuery(["highscore", userName], async () => {
    const response = await axios.get(`http://localhost:5000/getHighScore/${userName}`)
    return response.data
  }, {
    enabled: !!userName && isSignedIn, 
    onSuccess: (data) => {
      if (data && data.score) {
        setHighScore(data.score);
      }
    }
  })

  const fetchLeaderboard = useQuery("leaderboard", async () => {
    const response = await axios.get("http://localhost:5000/getAllHighScores");
    return response.data;
  });

  useEffect(() => {
    let timer_two;
    if (seconds > 0) {
      timer_two = setTimeout(function () {
        setSeconds(seconds - 1)
      }, 1000)
    }

    if (seconds === 0 && isPlaying) {
      setIsPlaying(false);

      if (points > highscore) {
        setHighScore(points);
        saveHighScoreMutation.mutate({ userName, score: points})
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

    setLogoPosition({ top: randomTop, left: randomLeft });
  }

  function startGame() {
    setIsPlaying(true);
    setSeconds(10);
    setPoints(0);
    setRandomLogoPosition();
  }

  function login(){
    setIsSignedIn(true);
  }

  return (
<div className="App">
  {isSignedIn ? (
    isPlaying ? (
      <Game 
        points={points}
        handlePoints={handlePoints}
        logoPosition={logoPosition}
        seconds={seconds}
      />
    ) : (
      <MenuScreen 
        points={highscore} 
        startGame={startGame} 
        userName={userName}
        leaderboard = {fetchLeaderboard.data}
      />
    )
  ) : (
    <SignIn
      userName={userName}
      login={login}
      setUserName={setUserName}
      />
  )}
    </div>
  );
}

export default App;
