import React from 'react';
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'

class AuthForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.authentication.currentUser,
      loginForm: false,
      registerForm: false,
    }

    this.toggleRegisterForm = this.toggleRegisterForm.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleLoginForm = this.toggleLoginForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentUser: nextProps.authentication.currentUser });
  }

  toggleLoginForm(event) {
    event.preventDefault();
    this.setState({ loginForm: !this.state.loginForm })
  }

  toggleRegisterForm(event) {
    event.preventDefault();
    this.setState({registerForm: !this.state.registerForm })
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const loginLink = <a href="#" onClick={this.toggleLoginForm}>Login</a>;
    const registerLink = <a href="#" onClick={this.toggleRegisterForm}>Register</a>;
    if (this.state.currentUser) {
      return (
        <div>
          <p>{this.state.currentUser.email}</p>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          {loginLink} <br/>
          {this.state.loginForm ? <LoginForm login={this.props.login} /> : ""}
          {registerLink} <br/>
          {this.state.registerForm ? <RegisterForm register={this.props.register} /> : ""}
        </div>
      );
    }
  }
}

export default AuthForms;
