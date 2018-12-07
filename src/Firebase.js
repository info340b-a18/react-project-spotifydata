import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import firebase from 'firebase/app';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'

import UserProfile from './UserProfile'


// add loading variable
class Firebase extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true
    };
  }

  //A callback function for registering new users
  handleSignUp(email, password) {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
      }).catch((err) => {
        this.setState({errorMessage: err.message});
      })
  }

  //A callback function for logging in existing users
  handleSignIn(email, password) {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
      })
      .catch((err) => {
        this.setState({errorMessage: err.message});
      })
  }

  //A callback function for logging out the current user
  handleSignOut(event) {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().signOut()
      .catch(error => this.setState({errorMessage: error.message}));
  }


  // add component did mount
  componentDidMount() {
    this.authFunction = firebase.auth().onAuthStateChanged((fireUser) => {
      if (fireUser) {
        this.setState({user: fireUser});
        this.props.uidCallback(fireUser.uid);
      } else {
        this.setState({user: null});
        this.props.uidCallback(null);
      }
      this.setState({loading: false});
    });
  }

  componentWillUnmount() {
    this.authFunction(); 
  }

  render() {
    let content = null; //content to render

    // add the loading
    if (this.state.loading) {
      return (
        <div className="text-center">
            <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      );
    }

    if(!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container">
          <h1>Sign Up / Sign In</h1>
          <SignUpForm 
            signUpCallback={(e,p) => this.handleSignUp(e,p)} 
            signInCallback={(e,p) => this.handleSignIn(e,p)}
          />
        </div>
      );
    } else {
      content = (
        <div className="container">
          <div className="row">
            <button className="btn btn-primary bg-success border-success" onClick={this.props.authorize}>Connect to Spotify</button>
          </div>
          <div className="row">
            <button className="btn btn-primary" onClick={e => this.handleSignOut(e)}>Sign Out</button>
          </div>
        </div>
      )
    }

    return (
      <div>
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>}
        {content}
      </div>
    );
  }
}



export default Firebase;