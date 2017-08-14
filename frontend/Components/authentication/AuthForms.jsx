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
          {this.state.currentUser.username}  <i className="fa fa-caret-down"></i>    <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
    } else {
      return (
        <div>
          {loginLink} <span className="divider"></span> {registerLink}
          {this.state.loginForm ? <LoginForm login={this.props.login} /> : ""}
          {this.state.registerForm ? <RegisterForm register={this.props.register} /> : ""}
        </div>
      );
    }
  }
}

export default AuthForms;
