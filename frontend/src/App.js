import './App.css';

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import { MenuScreen } from "./components/MenuScreen/MenuScreen.jsx"
import { NormalGame } from "./components/Game/NormalGame/NormalGame.jsx"
import { TrackingGame } from "./components/Game/TrackingGame/TrackingGame.jsx"
import { SignIn } from "./components/SignIn/SignIn.jsx"


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
  const [selectedGame, setSelectedGame] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isHovering, setIsHovering] = useState(false);


  const saveHighScoreMutation = useMutation(async ({ userName, score }) => {
    return await axios.post("http://localhost:5000/saveHighScore", { userName, score })
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
        saveHighScoreMutation.mutate({ userName, score: points })
      }
    }

    return () => clearTimeout(timer_two);

  }, [seconds, isPlaying])

  useEffect(() => {
    let timerInterval;
    if (isHovering) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 10);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isHovering]);

  useEffect(() => {
    
  })

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
    setTimer(0);
  }

  function login() {
    setIsSignedIn(true);
  }

  return (
    <div className="App">
      {isSignedIn ? (
        isPlaying ? (
          (selectedGame === "normal") ? (
            <NormalGame
              points={points}
              handlePoints={handlePoints}
              logoPosition={logoPosition}
              seconds={seconds} />
          ) : (
            <TrackingGame
              logoPosition={logoPosition}
              timer={timer}
              seconds={seconds}
              setIsHovering={setIsHovering}
            />
          )
        ) : (
          <MenuScreen
            points={highscore}
            startGame={startGame}
            userName={userName}
            leaderboard={fetchLeaderboard.data}
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
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
