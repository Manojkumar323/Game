import React, { useState } from 'react';
import axios from 'axios';

const Game = () => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [rounds, setRounds] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    const maxRounds = 6;
    const choices = ['stone', 'paper', 'scissors'];
    const [choice1, setChoice1] = useState('');
    const [choice2, setChoice2] = useState('');

    const handleRound = () => {
        if (!choice1 || !choice2) {
            alert("Both players need to make a choice!");
            return;
        }
        const result = determineWinner(choice1, choice2);
        setRounds(prev => [...prev, { choice1, choice2, result }]);
        setCurrentRound(prev => prev + 1);
        setChoice1('');
        setChoice2('');
    };

    const determineWinner = (choice1, choice2) => {
        if (choice1 === choice2) return 'Tie';
        if ((choice1 === 'stone' && choice2 === 'scissors') ||
            (choice1 === 'scissors' && choice2 === 'paper') ||
            (choice1 === 'paper' && choice2 === 'stone')) {
            return player1;
        }
        return player2;
    };

    const saveGame = async () => {
        const winner = calculateFinalWinner();
        const gameData = { player1, player2, rounds, winner };
        await axios.post('https://game-backend-94pp.onrender.com', gameData);
    };

    const calculateFinalWinner = () => {
        const scores = { [player1]: 0, [player2]: 0 };

        rounds.forEach(round => {
            if (round.result !== 'Tie') {
                scores[round.result]++;
            }
        });

        return scores[player1] > scores[player2] ? player1 : scores[player1] < scores[player2] ? player2 : 'Tie';
    };

    return (
        <div>
            <h1 style={{alignItems:"center"}}>Rock Paper Scissors</h1>
            <input 
                placeholder="Player 1 Name" 
                value={player1} 
                onChange={e => setPlayer1(e.target.value)} 
            />
            <input 
                placeholder="Player 2 Name" 
                value={player2} 
                onChange={e => setPlayer2(e.target.value)} 
            />
            <h2>Current Round: {currentRound + 1}/{maxRounds}</h2>
            <div>
                <h3>{player1}'s Choice</h3>
                {choices.map(choice => (
                    <button 
                        key={choice} 
                        onClick={() => setChoice1(choice)} 
                        disabled={currentRound >= maxRounds}
                    >
                        {choice}
                    </button>
                ))}
            </div>
            <div>
                <h3>{player2}'s Choice</h3>
                {choices.map(choice => (
                    <button 
                        key={choice} 
                        onClick={() => setChoice2(choice)} 
                        disabled={currentRound >= maxRounds}
                    >
                        {choice}
                    </button>
                ))}
            </div>
            <button onClick={handleRound} disabled={currentRound >= maxRounds}>
                Submit Round
            </button>
            {currentRound >= maxRounds && <button onClick={saveGame}>Save Game</button>}
            <h2>Rounds</h2>
            {rounds.map((round, index) => (
                <div key={index}>
                    <p>{round.choice1} vs {round.choice2}: {round.result}</p>
                </div>
            ))}
            {currentRound >= maxRounds && <h2>Final Winner: {calculateFinalWinner()}</h2>}
        </div>
    );
};

export default Game;
