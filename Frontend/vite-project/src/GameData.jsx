import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameData = () => {
    const [games, setGames] = useState([]);
    console.log(games); // For debugging

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/games');
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        fetchGames();
    }, []);

    

    return (
        <div>
            <h1>Game Data</h1>
            {games.length === 0 ? (
                <p>No game data available.</p>
            ) : (
                games.map((game, index) => (
                    <div key={index}>
                        <h2>{game.player1} vs {game.player2}</h2>
                        <h3>Rounds:</h3>
                        {game.rounds.map((round, roundIndex) => (
                            <p key={roundIndex}>
                                Round {round.roundNumber}: {round.choice1} vs {round.choice2}: {round.result}
                            </p>
                        ))}
                        <p><strong>Winner: {game.winner}</strong></p>
                    </div>
                ))
            )}
        </div>
    );
};

export default GameData;
