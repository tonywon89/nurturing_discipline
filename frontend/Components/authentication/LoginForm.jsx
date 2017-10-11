import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "twon",
      password: "curious123",
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.props.closeModal();
    this.props.login({ username: this.state.username, password: this.state.password });
  }

  render() {
    const loginForm = (
      <form onSubmit={this.handleLoginSubmit}>
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" onChange={this.handleUsernameChange} value={this.state.username} />
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
