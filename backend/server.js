const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/game', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to MongoDB using Mongoose!"))
.catch(err => console.error("Connection error", err));

const highScoreSchema = new mongoose.Schema({
    user: String,
    score: Number,
    time: Number
});

const HighScore = mongoose.model('HighScore', highScoreSchema);

app.post('/saveHighScore', async (req, res) => {
    const { userName, score, time} = req.body

    if (!userName || score === undefined || time === undefined) {
        return res.status(400).json({ message: 'Username required' })
    }

    try {
        const highScore = await HighScore.findOneAndUpdate(
            { user: userName },
            { $set: { score, time } },
            { new: true, upsert: true } // Creates a new document if none exists
        )
        res.status(200).json(highScore)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error saving highscore' })
    }
})

app.get('/getHighScore/:userName', async (req, res) => {
    const { userName } = req.params

    try {
        const highScore = await HighScore.findOne({ user: userName })
        if (!highScore) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(highScore)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error fetching highscore' })
    }
})

app.get('/getAllHighScores', async (req, res) => {
    const highScores = await HighScore.find().sort({score: -1})
    res.json(highScores)
})

app.get('/getAllHighScoreTimes', async (req, res) => {
    const highScoreTimes = await HighScore.find().sort({time: -1})
    res.json(highScoreTimes)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})