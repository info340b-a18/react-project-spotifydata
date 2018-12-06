import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import firebase from 'firebase/app';


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

    /* TODO: sign in user here */
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => this.setState({errorMessage: error.message})
    );
  }

  //A callback function for logging out the current user
  handleSignOut(){
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign out user here */
    firebase.auth().signOut()
    .catch(error => this.setState({errorMessage: error.message})
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