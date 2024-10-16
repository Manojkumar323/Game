import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Game from './Game';
import GameData from './GameData';
import './App.css'; // Import your CSS file for styles

function App() {
    return (
        <Router>
            <nav>
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/games">Game Data</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/games" element={<GameData />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
