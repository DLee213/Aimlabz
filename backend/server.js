const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.port || 5000;

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/game', { useNewUrlParser: true, useUnifiedTopology: true });

const highScoreSchema = new mongoose.Schema({
    user: String,
    score: Number
  });


const HighScore = mongoose.model('HighScore', highScoreSchema);

app.post('/saveHighScore', async (req, res) => {
    const { userName, score} = req.body

    if(!userName || score === undefined){
        return res.status(400).json({message: 'Username required'})
    }

    try{
        const highScore = await HighScore.findOneAndUpdate(
            {user: userName},
            {$set: {score}},
            {new: true, upsert: true} // Creates a new document if none exists
        )
        res.status(200).json(highScore)
    }catch(err) {
        console.error(err)
        res.status(500).json({message: 'Error saving highscore'})
    }
})

app.get('/getHighScore/:userName', async (req, res) => {
    const {userName} = req.params

    try{
        const highScore = await HighScore.findOne({user: userName})
        if(!highScore){
            return res.status(404).json({message: 'User not found'})
        }
        res.status(200).json(highScore)
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Error fetching highscore'})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})