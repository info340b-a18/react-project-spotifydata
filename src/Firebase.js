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

    /* TODO: sign up user here */

    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        //  this.user = user
        return user.updateProfile({
            
        }).catch((err) => 
        this.setState({ errorMessage: err.message})
        )
      }).catch((err) => {
        this.setState({errorMessage: err.message});
      })
  }

  //A callback function for logging in existing users
  handleSignIn(email, password) {
    this.setState({errorMessage:null}); //clear any old errors

   firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      alert("Successful Sign In")
      return <Route exact path="/" render={() => (
          <Redirect to="./UserProfile"/>
      )}/>
   }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
    } else {
        alert(errorMessage);         
    }
    
    });
    

  }

  //A callback function for logging out the current user
  handleSignOut(email,password) {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().signOut().then(function(user) {
        alert("Successful Sign Out") 
    }).catch(error => this.setState({errorMessage: error.message})
    );
    
  }


  // add component did mount
  componentDidMount() {
    this.authFunction = firebase.auth().onAuthStateChanged((fireUser) => {
      if (fireUser) {
        this.setState({user: fireUser});
        //window.location =
      }
      else {
        this.setState({user: null});
      }
      this.setState({loading: false});
    });
  }

  componentWillUnmount() {
    this.authFunction(); 
  }

  render() {

    let content=null; //content to render

    // add the loading
    if (this.state.loading) {
      return (
        <div className="text-center">
            <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      );
    }

   // if(!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container">
          <h1>Sign Up</h1>
          <SignUpForm 
            signUpCallback={(e,p) => this.handleSignUp(e,p)} 
            signInCallback={(e,p) => this.handleSignIn(e,p)}
            signOutCallback={(e,p) => this.handleSignOut()} 

            />
        </div>
      );
  //  } 
    return (
      <div>
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content}
      </div>
    );
  }
}



export default Firebase;