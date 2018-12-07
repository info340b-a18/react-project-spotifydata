import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import logo from './img/spotify.png';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top px-2">
        <Link className="navbar-brand p-0" to='/Home'>
            <img className="d-inline-block align-middle" id="nav-logo" src={logo} alt="spotify-logo" />
            <span className="d-inline-block align-middle" id="banner-text">SpotifyStats</span>
        </Link>
        <ul className="navbar-nav mr-2">
          <li className="nav-item">
            <Link className="nav-link" to='/Home'>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/Spotify/Songs'>Top Songs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/Spotify/Artists'>Top Artists</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/UserProfile'>User Profile</Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to='/Firebase'>Login / Logout</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
  