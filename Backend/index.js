const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Use environment variables for MongoDB connection string
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the schema for each round
const roundSchema = new mongoose.Schema({
    roundNumber: Number,
    choice1: String,
    choice2: String,
    result: String,
});





// Define the schema for the game
const gameSchema = new mongoose.Schema({
    player1: String,
    player2: String,
    rounds: [roundSchema], // Use the defined round schema
    winner: String,
});

const Game = mongoose.model('Game', gameSchema);

// API to save a game
app.post('/api/games', async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).send(game);
    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).send('Internal Server Error');
    }
});

// API to get all games
app.get('/api/games', async (req, res) => {
    try {
        const games = await Game.find();
        res.send(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
