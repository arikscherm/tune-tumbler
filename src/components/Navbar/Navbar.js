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
          <NavLink to="/current-session" activeclassname="active">Remaining Tunes</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/session-map" activeclassname="active">Session Spinner</NavLink>
        </li>
        {/* <li className="nav-link">
          <NavLink to="/favorites" activeClassName="active">Favorites</NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
