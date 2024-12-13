import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="current-session">Remaining Tunes</Link></li>
          <li><Link to="favorites">Favorites</Link></li>
          <li><Link to="tune-library">Tune Library</Link></li>
        </ul>
      </nav>
    )
}

export default Navbar;