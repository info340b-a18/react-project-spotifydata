import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

export class Nav extends Component {
    render() {
      return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
          <Link className="nav-link" to='/Home'>Spotify Web App</Link>
          {/* <a className="navbar-brand" href="index.html">Spotify Web App</a> */}
          <div className="navbar-nav" id="navlinks">
              <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to='/Spotify/Songs'>Spotify Songs</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/Spotify/Artists'>Spotify Artists</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/UserProfile'>User Profile</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={this.authorize}>Spotify Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link">Login to WebApp</a>
                  </li>  
              </ul>
          </div> 
          </nav>
      );
    }
  
    authorize() {
      var loginQuery = "https://accounts.spotify.com/authorize?client_id=f09bc8aafe37492495c170958f4282f5&response_type=token&scope=user-top-read&show_dialog=true&redirect_uri=http://localhost:3000";
      window.location = loginQuery;
    }
}

export default Nav;
  