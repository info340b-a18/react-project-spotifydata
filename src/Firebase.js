import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';

class Firebase extends Component {
    constructor(props){
      super(props);
      this.state = {
        loading: true
      };
    }
  
    //A callback function for registering new users
    handleSignUp(email, password, handle, avatar) {
      this.setState({errorMessage:null}); //clear any old errors
  

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          return user.updateProfile({
            displayName: handle,
            photoURL: avatar
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
        }
        else {
          this.setState({user: null});
        }
        this.setState({loading: false});
      });
    }
  
    componentWillUnmount() {
      this.authFunction;
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
  
  
      if(!this.state.user) { //if logged out, show signup form
        content = (
          <div className="container">
            <h1>Sign Up</h1>
            <SignUpForm 
              signUpCallback={(e,p,h,a) => this.handleSignUp(e,p,h,a)} 
              signInCallback={(e,p) => this.handleSignIn(e,p)} 
              />
          </div>
        );
      }
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
  
  //A component to display a welcome message to a `user` prop (for readability)
  class WelcomeHeader extends Component {
    render() {
      return (
        <header className="container">
          <h1>
            Welcome {this.props.user.displayName}!
            {' '}
            <img className="avatar" src={this.props.user.photoURL} alt={this.props.user.displayName} />
          </h1>
          {this.props.children} {/* for button */}
        </header>
      );
    }
  }
  