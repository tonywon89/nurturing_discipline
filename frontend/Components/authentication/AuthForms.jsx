import React from 'react';

class AuthForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.authentication.currentUser,
      loginForm: false,
      registerForm: false,
      email: "tonywon89@gmail.com",
      password: "testingpassword",
      passwordConfirmation: "",
      firstName: "",
      lastName: ""
    }

    this.openLoginForm = this.openLoginForm.bind(this);
    this.openRegisterForm = this.openRegisterForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentUser: nextProps.authentication.currentUser });
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
    this.props.login({ email: this.state.email, password: this.state.password });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
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
        <input type="text" name="email" placeholder="Email" onChange={this.handleEmailChange} value={this.state.email} />
        <label>Password</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
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


      if (this.state.currentUser) {
        return (
          <div>
            <p>{this.state.currentUser.email}</p>
            <button>Logout</button>
          </div>
        );
      } else {
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
}

export default AuthForms;
