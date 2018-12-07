import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import logo from './img/spotify.png';

class Nav extends Component {
    render() {
      return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
          <Link className="nav-link" to='/Home'>Home</Link>
          <div className="navbar-nav" id="navlinks">
              <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to='/Spotify/Songs'>Top Songs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/Spotify/Artists'>Top Artists</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/UserProfile'>User Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/Firebase'>Login / Logout</Link>
                  </li>
              </ul>
          </div> 
          </nav>
      );
    }
}

export default Nav;
  