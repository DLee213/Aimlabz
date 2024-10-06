import gif from "../../assets/dance.gif"
import './module.menuscreen.css';
import { useState } from "react";
import { motion } from "framer-motion";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import { CardMedia } from "@mui/material";

// Game Imports

export const MenuScreen = ({ points, startGame, userName, leaderboard }) => {
  const [cursorCoord, setCursorCoord] = useState({ left: 0, top: 0 })
  const [selectedGame, setSelectedGame] = useState(null);


  function handleMouseMove(e) {
    setCursorCoord({ left: e.clientX })
  }

  return (
    <div className="menu-screen">
      <div className="menu-info">
        {selectedGame === "normal" ? (
          <h1>High Score: {points}</h1>
        ) : (
          <h1>Longest Time: {points}</h1>
        )}
        {selectedGame === "normal" ? (
          <div className="normal-leaderboard">
            <h2>Normal Game Leaderboard</h2>
            <ul>
              {leaderboard.slice(0, 5).map((entry, index) => (
                <li key={index}>
                  {index + 1}. {userName === entry.user ? (
                    <strong>{entry.user} (you): {entry.score}</strong>
                  ) : (
                    <>
                      {entry.user} : {entry.score}
                    </>
                  )}

                </li>
              ))}
            </ul>

          </div>
        ) : (
          <div className="normal-leaderboard">
            <h2>Tracking Game Leaderboard</h2>
            <ul>
              {leaderboard.slice(0, 5).map((entry, index) => (
                <li key={index}>
                  {index + 1}. {userName === entry.user ? (
                    <strong>{entry.user} (you): {entry.score}</strong>
                  ) : (
                    <>
                      {entry.user} : {entry.score}
                    </>
                  )}

                </li>
              ))}
            </ul>
          </div>
        )}


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

      <div className="game-options">
        <h1>GAME OPTIONS</h1>

        {/* Normal Gamemode */}
        <motion.div
          className="normal-card"
          onClick={() => setSelectedGame("normal")}
          animate={{
            scale: selectedGame === "normal" ? 1.2 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 300 }}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={"normal-game.gif"}
                alt="Normal Game"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Normal Game
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Try and click as many blue balls in 30 seconds!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </motion.div>

        {/* Tracking Game */}
        <motion.div
          className="tracking-card"
          onClick={() => setSelectedGame("tracking")}
          animate={{
            scale: selectedGame === "tracking" ? 1.2 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 300 }}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/345x140"
                alt="Tracking Game"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Tracking Game
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Try to follow the blue ball for as long as you can!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
