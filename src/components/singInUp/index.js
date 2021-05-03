import React, { Component } from "react";
import SignIn from "./SignIn";
import SingUp from "./SignUp";
class Index extends Component {
  state = { signUp: false };
  handleSignup = () =>
    this.setState(prevState => ({ signUp: !prevState.signUp }));

  render() {
    return (
      <div>
        {this.state.signUp ? (
          <SingUp handleSignup={this.handleSignup} />
        ) : (
          <SignIn handleSignup={this.handleSignup} />
        )}
      </div>
    );
  }
}

export default Index;
