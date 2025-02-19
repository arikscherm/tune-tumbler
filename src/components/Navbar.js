import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import '../index.css'; // Make sure to import the CSS file

function Navbar() {
  return (
    <nav>
      <ul>
        <li className="nav-link">
          <NavLink to="/" exact activeClassName="active">Home</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/tune-library" activeClassName="active">Tune Library</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/current-session" activeClassName="active">Remaining Tunes</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/map" activeClassName="active">All Sessions</NavLink>
        </li>
        {/* <li className="nav-link">
          <NavLink to="/favorites" activeClassName="active">Favorites</NavLink>
        </li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
