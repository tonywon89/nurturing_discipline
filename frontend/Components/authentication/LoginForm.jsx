import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: "twon",
      // password: "curious123",
      username: "",
      password: "",
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
        <form className="auth-form" onSubmit={this.handleLoginSubmit}>
          <div>
            <div className="input-field">
              <input type="text" required name="username" onChange={this.handleUsernameChange} value={this.state.username} />
               <span className="floating-label">Username</span>
            </div>
            <div className="input-field">
              <input type="password" name="password" required value={this.state.password} onChange={this.handlePasswordChange} />
              <span className="floating-label">Password</span>
            </div>
          </div>
          <input type="submit" value="Login" />
          <p className="auth-alt">Forgot Password? <a onClick={this.props.openForgotForm}>Reset Password</a></p>
          <p className="auth-alt"> New Member? <a onClick={this.props.openRegisterForm}>Register</a></p>
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
