import { motion } from "framer-motion";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import { CardMedia } from "@mui/material";

const GameOptions = ({selectedGame, setSelectedGame}) => {
  return (
    <div className="game-options-container">
        <h1>GAME OPTIONS</h1>

        <div className="game-options">

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
                  image={"tracking-game.gif"}
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

export default GameOptions