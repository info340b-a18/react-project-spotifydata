import React, { Component } from 'react';

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
    }; 
  }

  //update state for specific field
  handleChange(event) {
    let field = event.target.name; //which input
    let value = event.target.value; //what value

    let changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  //handle signUp button
  handleSignUp(event) {
    event.preventDefault(); //don't submit
    this.props.signUpCallback(this.state.email, this.state.password);
  }

  //handle signIn button
  handleSignIn(event) {
    event.preventDefault(); //don't submit
    this.props.signInCallback(this.state.email, this.state.password);
  }

  handleSignOut(event) {
    event.preventDefault(); 
    this.props.signOutCallback();
  }

  
  

  render() {
    return (
      <form>
        {/* email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control" 
            id="email" 
            type="email" 
            name="email"
            onChange={(e) => this.handleChange(e)}
            />
        </div>
        
        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" 
            id ="password"
            type="password"
            name="password"
            onChange={(e) => this.handleChange(e)}
            />
        </div>

       

        {/* buttons */}
        <div className="form-group">
          <button className="btn btn-primary mr-2" 
            onClick={(e) => this.handleSignUp(e)}
          >
            Sign-up
          </button>
          <button className="btn btn-primary"
            onClick={(e) => this.handleSignIn(e)}
          >
            Sign-in
          </button>
          <button className="btn btn-primary"
            onClick={(e) => this.handleSignOut(e)}
          > Sign-Out 
          </button>
        </div>
      </form>
    )
  }
}

export default SignUpForm