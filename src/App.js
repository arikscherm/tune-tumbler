import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import Navbar from './Navbar';
import Home from './Home';
import CurrentSession from './CurrentSession'
import Favorites from './Favorites'
import TuneLibrary from './TuneLibrary'
import './App.css';

function App() {
  return (
    <Router>
    <h1>Random Set Generator</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/current-session" element={<CurrentSession />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/tune-library" element={<TuneLibrary />} />
      </Routes>
    </Router>
  );
}

export default App;