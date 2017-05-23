import React from 'react';

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loginForm: false,
      registerForm: false
    }

    this.openLoginForm = this.openLoginForm.bind(this);
    this.openRegisterForm = this.openRegisterForm.bind(this);
  }

  openLoginForm(event) {
    event.preventDefault();
    this.setState({ loginForm: true, registerForm: false })
  }

  openRegisterForm(event) {
    event.preventDefault();
    this.setState({ loginForm: false, registerForm: true })
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    alert("Login Submitted");
  }

  handleRegisterSubmit(event) {
    event.preventDefault();
    alert("Registration submitted");
  }

  render() {
    const loginLink = (<a href="#" onClick={this.openLoginForm}>Login</a>);
    const loginForm = (
      <form onSubmit={this.handleLoginSubmit}>
        <label>Email</label>
        <input type="text" name="email" placeholder="Email" />
        <label>Password</label>
        <input type="password" name="password" />
        <input type="submit" value="Login" />
      </form>
    );
    const registerLink = (<a href="#" onClick={this.openRegisterForm}>Register</a>);
    const registerForm = (
      <form onSubmit={this.handleRegisterSubmit}>
        <label>First Name</label>
        <input type="text" name="first_name" placeholder="First Name" /><br/>
        <label>Last Name</label>
        <input type="text" name="last_name" placeholder="Last Name" /><br/>
        <label>Email</label>
        <input type="text" name="email" placeholder="Email" /><br/>
        <label>Password</label>
        <input type="password" name="password" /><br/>
        <label>Confirm Password</label>
        <input type="password" name="password" /><br/>
        <input type="submit" value="Submit" />
      </form>
    );

    return (
      <div>
        {loginLink} <br/>
        {registerLink} <br/>
        {this.state.loginForm ? loginForm : ""}
        {this.state.registerForm ? registerForm: ""}
      </div>
    );
  }
}

export default Authentication;
