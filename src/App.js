import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import { TuneProvider } from './components/TuneContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CurrentSession from './components/CurrentSession'
import Favorites from './components/Favorites'
import TuneLibrary from './components/TuneLibrary'
import './App.css';

function App() {
  return (
    <Router>
    <TuneProvider>
      <h1>Random Set Generator</h1>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/current-session" element={<CurrentSession />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tune-library" element={<TuneLibrary />} />
        </Routes>
      </TuneProvider>
    </Router>
  );
}

export default App;