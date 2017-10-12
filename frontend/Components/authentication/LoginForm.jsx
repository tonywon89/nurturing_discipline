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
      <div>
        <form className="login-form" onSubmit={this.handleLoginSubmit}>
          <div>
            <input type="text" required name="username" placeholder="Username" onChange={this.handleUsernameChange} value={this.state.username} />
            <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </div>
          <input type="submit" value="Login" />
          <p style={{color: 'black', fontSize: '0.8em'}}>New Member? <a onClick={this.props.openRegisterForm}>Register</a></p>
        </form>

      </div>
    );
    return (
      <div>
        {loginForm} <br/>
      </div>
    );
  }
}

export default LoginForm;
