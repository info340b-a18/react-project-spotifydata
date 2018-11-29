import React, { Component } from 'react';
import logo from './img/spotify.png';
import Home from './Home';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Spotify from './SpotifyData'

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      accessToken: ""
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Nav></Nav>
          <div className="jumbotron">
                <div className="container-fluid">
                    <img src={logo}/>
                    <h1>Spotify Web App</h1>
                </div>
          </div>
          <Switch>
            <Route path="/Spotify" render={() => <Spotify accessToken={this.state.accessToken}/>}/>
            <Route path="/Home" component={Home}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  }

  componentWillMount() {
    this.getAccessToken();
  }

  componentDidMount() {
    this.getAccessToken();
  }

  getAccessToken() {
    // Get the hash of the url
    const hash = window.location.hash.substring(1).split('&').reduce(function (initial, item) {
      if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});

    // Set token
    this.setState({accessToken: hash.access_token});
  }
}

export class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <Link className="nav-link" to='/Home'>Spotify Web App</Link>
        {/* <a className="navbar-brand" href="index.html">Spotify Web App</a> */}
        <div className="navbar-nav" id="navlinks">
            <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to='/Spotify'>Spotify Data</Link>
                  {/* <a className="nav-link" href="playlist.html">Spotify Data</a> */}
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#further-link">Further Links</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={this.authorize}>Login</a>
                </li>  
            </ul>
        </div> 
        </nav>
    );
  }

  authorize() {
    var loginQuery = "https://accounts.spotify.com/authorize?client_id=f09bc8aafe37492495c170958f4282f5&response_type=token&scope=user-top-read&show_dialog=true&redirect_uri=https://info340b-a18.github.io/react-project-spotifydata/";
    window.location = loginQuery;
  }
}




export default App;
