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
    this.toggleDropdown = this.toggleDropdown.bind(this);
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

  toggleDropdown() {
    if (this.state.dropdownVisible === false) {
      this.setState({ dropdownVisible: true });
    } else {
      this.setState({ dropdownVisible: false });
    }
  }

  render() {
    const loginLink = <a href="#" onClick={this.toggleLoginForm}>Login</a>;
    const registerLink = <a href="#" onClick={this.toggleRegisterForm}>Register</a>;
    let menuItems = this.state.dropdownVisible ? (
      <div className="dropdown-list">
        <div key={1}>
          <span>Profile</span>
        </div>
        <div key={2}>
          <span>Settings</span>
        </div>
        <div key={3}>
          <span onClick={this.handleLogout}>Logout</span>
        </div>
      </div>
    ) : "";
    if (this.state.currentUser) {
      return (
        <div className="dropdown-container" onClick={this.toggleDropdown}>
          <div>
            {this.state.currentUser.username} <i className="fa fa-caret-down"></i>
          </div>

            <CSSTransitionGroup
              transitionName="example"
              // transitionAppear={true}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              // transitionEnter={false}
              // transitionLeave={false}
              >
              {menuItems}

            </CSSTransitionGroup>

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
