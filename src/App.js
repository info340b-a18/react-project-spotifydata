import React, { Component } from 'react';
import logo from './img/spotify.png';
import Home from './Home';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import SpotifySongs from './SpotifySongs'
import SpotifyArtists from './SpotifyArtists'
import Nav from './Nav'
import UserProfile from './UserProfile'

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
                    <h1> Spotify Stats</h1>
                </div>
          </div>
          <Switch>
            <Route path="/Spotify/Songs" render={() => <SpotifySongs accessToken={this.state.accessToken}/>}/>
            <Route path="/Spotify/Artists" render={() => <SpotifyArtists accessToken={this.state.accessToken}/>}/>
            <Route path="/Home" component={Home}/>
            <Route path="/UserProfile" render={() => <UserProfile accessToken={this.state.accessToken}/>}/>
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

export default App;
