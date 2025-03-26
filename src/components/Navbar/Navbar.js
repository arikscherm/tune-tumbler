import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import '../../index.css'; // Make sure to import the CSS file
import './Navbar.css'

function Navbar() {
  return (
    <nav>
      <ul>
        <li className="nav-link">
          <NavLink to="/" activeclassname="active">Home</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/tune-library" activeclassname="active">Tune Library</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/remaining-tunes" activeclassname="active">Remaining Tunes</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/session-spinner" activeclassname="active">Session Map</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
