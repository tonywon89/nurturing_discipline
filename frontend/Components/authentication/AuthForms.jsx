import React from 'react';
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import { CSSTransitionGroup } from 'react-transition-group'

class AuthForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.authentication.currentUser,
      loginForm: false,
      registerForm: false,
      dropdownVisible: false
    }

    this.toggleRegisterForm = this.toggleRegisterForm.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleLoginForm = this.toggleLoginForm.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
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

  showDropdown() {
    if (this.state.dropdownVisible === false) {
      this.setState({ dropdownVisible: true });
      document.addEventListener("click", this.hideDropdown);
    }
  }

  hideDropdown() {
    this.setState({ dropdownVisible: false });
    document.removeEventListener("click", this.hideDropdown);
  }

  render() {
    const loginLink = <a href="#" onClick={this.toggleLoginForm}>Login</a>;
    const registerLink = <a href="#" onClick={this.toggleRegisterForm}>Register</a>;
    let menuItems = this.state.dropdownVisible ? (
      <div className="dropdown-list" onSelect={()=> null}>
        <div key={1}>
          <i className="fa fa-user" aria-hidden="true"></i> Profile
        </div>
        <div key={2}>
         <i className="fa fa-cog" aria-hidden="true"></i> Settings
        </div>
        <div onClick={this.handleLogout} key={3}>
          <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
        </div>
      </div>
    ) : "";
    if (this.state.currentUser) {
      return (
        <div>
          <div className="dropdown-container" onClick={this.showDropdown}>
            <div className="nav-username">
              {this.state.currentUser.username} <i className="fa fa-caret-down"></i>
            </div>
          </div>
          <CSSTransitionGroup
              transitionName="nav-dropdown"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={100}
              >
              {menuItems}

            </CSSTransitionGroup>
      </div>
      );
    } else {
      return (
        <div className="nav-username">
          {loginLink} <span className="divider"></span> {registerLink}
          {this.state.loginForm ? <LoginForm login={this.props.login} /> : ""}
          {this.state.registerForm ? <RegisterForm register={this.props.register} /> : ""}
        </div>
      );
    }
  }
}

export default AuthForms;
