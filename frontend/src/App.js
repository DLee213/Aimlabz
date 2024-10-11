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
  // Signin
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Game Settings
  const [selectedGame, setSelectedGame] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ top: 0, left: 0 })

  // Normal Game
  const [seconds, setSeconds] = useState(0);
  const [points, setPoints] = useState(0);
  const [highscore, setHighScore] = useState(0);

  // Tracking Game
  const [timer, setTimer] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [highscoreTime, setHighScoreTime] = useState(0);

  // Fetch user high score
  const fetchUserHighScore = useQuery(["highscore", userName], async () => {
    const response = await axios.get(`http://localhost:5000/getHighScore/${userName}`)
    return response.data
  }, {
    enabled: !!userName && isSignedIn,
    onSuccess: (data) => {
      setHighScore(data.score);
      setHighScoreTime(data.time);
    }
  })

  const saveNormalGameMutation = useMutation(async ({ userName, score }) => {
    return await axios.post("http://localhost:5000/saveHighScore", { userName, score })
  })
  const saveTrackingGameMutation = useMutation(async ({ userName, time }) => {
    return await axios.post("http://localhost:5000/saveHighScore", { userName, time })
  })


  const fetchLeaderboard = useQuery("leaderboard", async () => {
    const response = await axios.get("http://localhost:5000/getAllHighScores");
    return response.data;
  });

  const fetchTimeLeaderboard = useQuery("timeLeaderboard", async () => {
    const response = await axios.get("http://localhost:5000/getAllHighScoreTimes");
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
      if (selectedGame === "normal") {
        if (points > highscore) {
          setHighScore(points);
          saveNormalGameMutation.mutate({ userName, score: points})
        }
      } else if (selectedGame === "tracking") {
        if (timer > highscoreTime) {
          setHighScoreTime(timer)
          saveTrackingGameMutation.mutate({ userName, time: timer })
        }
      }
    }

    return () => clearTimeout(timer_two);

  }, [seconds, isPlaying])

  useEffect(() => {
    let timerInterval;
    if (isHovering && selectedGame === "tracking") {
      console.log("Tracking game is being played")
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
              setRandomLogoPosition={setRandomLogoPosition}
              logoPosition={logoPosition}
              timer={timer}
              seconds={seconds}
              setIsHovering={setIsHovering}
            />
          )
        ) : (
          <MenuScreen
            timer={highscoreTime}
            points={highscore}
            startGame={startGame}
            userName={userName}
            leaderboard={fetchLeaderboard.data}
            timeLeaderboard={fetchTimeLeaderboard.data}
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
