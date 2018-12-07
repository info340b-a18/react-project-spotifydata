import React, { Component } from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import SpotifySongs from './SpotifySongs'
import SpotifyArtists from './SpotifyArtists'
import Nav from './Nav'
import UserProfile from './UserProfile'
import Firebase from './Firebase'
import 'firebase/auth'; 
import 'firebase/database';


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
          <Nav authorize={this.authorize} />
          <Switch>
            <Route path="/Spotify/Songs" render={() => <SpotifySongs accessToken={this.state.accessToken}/>}/>
            <Route path="/Spotify/Artists" render={() => <SpotifyArtists accessToken={this.state.accessToken}/>}/>
            <Route path="/Home" component={Home}/>
            <Route path="/UserProfile" render={() => <UserProfile accessToken={this.state.accessToken}/>}/>
            <Route path="/Firebase" render={() => <Firebase authorize={() => this.authorize()} />} />
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

  authorize() {
    let baseUri = "http://localhost:3000";
    var loginQuery = "https://accounts.spotify.com/authorize?client_id=f09bc8aafe37492495c170958f4282f5&response_type=token&scope=user-top-read&show_dialog=true&redirect_uri=" +
      baseUri + "/UserProfile";
    window.location = loginQuery;
  }
}

export default App;
