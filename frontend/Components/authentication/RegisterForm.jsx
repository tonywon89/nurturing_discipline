import React from 'react';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      passwordConfirmation: "",
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePassConfirmChange = this.handlePassConfirmChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
  }

  handleRegisterSubmit(event) {
    event.preventDefault();

    if (this.state.email.trim() === "") {
      alert("An email must be entered for registration");
      return;
    }

    if (this.state.username.trim() === "") {
      alert("A username must be entered for registration");
      return;
    }

    if (this.state.password.trim() === "") {
      alert("A password must be entered for registration");
      return;
    }

    if (this.state.password.trim() !== this.state.passwordConfirmation) {
      alert("The passwords don't match.");
    }

    this.props.closeModal();

    this.props.register({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    })
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handlePassConfirmChange(event) {
    this.setState({ passwordConfirmation: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleRegisterSubmit}>
        <label>Email</label>
        <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} /><br/>
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} /><br/>
        <label>Password</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} /><br/>
        <label>Confirm Password</label>
        <input type="password" name="password" value={this.state.passwordConfirmation} onChange={this.handlePassConfirmChange} /><br/>
        <input type="submit" value="Submit" />
         <p style={{color: 'black', fontSize: '0.8em'}}>Already a member? <a onClick={this.props.openLoginForm}>Login</a></p>
      </form>
    );
  }
}

export default RegisterForm;
