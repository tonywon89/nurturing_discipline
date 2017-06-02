import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "tonywon89@gmail.com",
      password: "testingpassword",
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.props.login({ email: this.state.email, password: this.state.password });
  }

  render() {
    const loginForm = (
      <form onSubmit={this.handleLoginSubmit}>
        <label>Email</label>
        <input type="text" name="email" placeholder="Email" onChange={this.handleEmailChange} value={this.state.email} />
        <label>Password</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
        <input type="submit" value="Login" />
      </form>
    );
    return (
      <div>
        {loginForm} <br/>
      </div>
    );
  }
}

export default LoginForm;
