import React from 'react';
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import { TuneProvider } from './components/TuneContext/TuneContext';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import CurrentSession from './components/RemainingTunes/CurrentSession'
import SessionMap from './components/SessionSpinner/SessionMap'
import TuneLibrary from './components/TuneLibrary/TuneLibrary'
import MapBackground from "./components/MapBackground/MapBackground";
import Help from "./components/Help/Help";
import './App.css';


function App() {

  <Helmet>
    <title>Tune Tumbler</title>
  </Helmet> 

  return (
    <Router>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <header>
        <MapBackground />
        <Help />
        <h1>Welcome to Tune Tumbler!</h1>
        <Navbar />
      </header>
      <hr></hr>
      <TuneProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tune-library" element={<TuneLibrary />} />
          <Route path="/current-session" element={<CurrentSession />} />
          {/* <Route path="/favorites" element={<Favorites />} /> */}
          <Route path="/session-map" element={<SessionMap />} />
        </Routes>
      </TuneProvider>
    </Router>
  );
}

export default App;