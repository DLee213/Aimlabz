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
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => setIsOn(!isOn);

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

  const saveGameMutation = useMutation(async ({ userName, score, time }) => {
    return await axios.post("http://localhost:5000/saveHighScore", { userName, score, time })
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
          saveGameMutation.mutate({ userName, score: points, time: highscoreTime})
        }
      } else if (selectedGame === "tracking") {
        if (timer > highscoreTime) {
          setHighScoreTime(timer)
          saveGameMutation.mutate({ userName, score: highscore, time: timer })
        }
      }
      
    }

    return () => clearTimeout(timer_two);
  }, [seconds, isPlaying])

  useEffect(() => {
    let timerInterval;
    if (isHovering && selectedGame === "tracking") {
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
    setSeconds(3);
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
            isOn={isOn}
            toggleSwitch={toggleSwitch}
          />
        )
      ) : (
        <SignIn
          userName={userName}
          login={login}
          setUserName={setUserName}
          isOn={isOn}
        />
      )}
    </div>
  );
}

export default App;


// function useQuery(queryKey, queryFn, options = {}) {
//   const { enabled = true, retry = 3, refetchInterval } = options; 
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState('idle');
//   const [retryCount, setRetryCount] = useState(0);

//   useEffect(() => {
//     let intervalId;

//     const fetchData = async () => {
//       setStatus('loading');

//       try {
//         const result = await queryFn();
//         setData(result);
//         setError(null);
//         setStatus('success');
//       } catch (err) {
//         setError(err);
//         setStatus('error');

//         if (retryCount < retry) {
//           setRetryCount((prevCount) => prevCount + 1);
//         }
//       }
//     };

//     if (enabled) {
//       fetchData();
//       if (refetchInterval) {
//         intervalId = setInterval(fetchData, refetchInterval);
//       }
//     }

//     return () => {
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, [queryKey, queryFn, enabled, retry, refetchInterval, retryCount]);

//   return { data, error, status };
// }