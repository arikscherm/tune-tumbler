import React from 'react';
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import { TuneProvider } from './components/TuneContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CurrentSession from './components/CurrentSession'
import Favorites from './components/Favorites'
import TuneLibrary from './components/TuneLibrary'
import './App.css';

function App() {

  <Helmet>
    <meta name="description" content="Welcome to TuneDice! Click the Generate Set button to create a random set of 3 Irish Reels. 
    Keep on playing random sets until you run out of tunes! Once out of tunes, click the Reset button to refresh. 
    Visit the Tune Library page to view and edit your collection of tunes, 
    or visit the Remaining Tunes page to view tunes that haven't been randomly selected yet." />
    <title>Reel-Roulette</title>
  </Helmet> 

  return (
    <Router>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <header>
        <h1>Reel-Roulette</h1>
        <Navbar />
      </header>
      <TuneProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tune-library" element={<TuneLibrary />} />
          <Route path="/current-session" element={<CurrentSession />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </TuneProvider>
    </Router>
  );
}

export default App;