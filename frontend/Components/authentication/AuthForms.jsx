import React from 'react';
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import { CSSTransitionGroup } from 'react-transition-group'
import Modal from 'react-modal';

class AuthForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.authentication.currentUser,
      loginForm: false,
      registerForm: false,
      dropdownVisible: false,

      // Modal Code
      modalIsOpen: false
    }

    this.openRegisterForm = this.openRegisterForm.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.openLoginForm = this.openLoginForm.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);

    // Modal Code
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentUser: nextProps.authentication.currentUser });
  }

  openLoginForm(event) {
    event.preventDefault();
    this.setState({
      loginForm: true,
      modalIsOpen: true,
      registerForm: false,
    })
  }

  openRegisterForm(event) {
    event.preventDefault();
    this.setState({
      registerForm: true,
      modalIsOpen: true,
      loginForm: false,
    });
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

 // Modal Code
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      registerForm: false,
      loginForm: false
    });
  }

  // End Modal Code

  render() {
    const loginLink = <a href="#" onClick={this.openLoginForm}>Login</a>;
    const registerLink = <a href="#" onClick={this.openRegisterForm}>Register</a>;
    let menuItems = this.state.dropdownVisible ? (
      <div className="dropdown-list" onSelect={()=> null}>
        <div>
          <i className="fa fa-user" aria-hidden="true"></i> Profile
        </div>
        <div>
         <i className="fa fa-cog" aria-hidden="true"></i> Settings
        </div>
        <div onClick={this.handleLogout}>
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
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className={{
              base: "modal-content",
              afterOpen: "modal-content",
              beforeClose: "modal-content"
            }}
            overlayClassName={{
              base: "modal-overlay",
              afterOpen: "modal-overlay",
              beforeClose: "modal-overlay"
            }}
            contentLabel="Auth Modal"
          >
          <div className="clearfix">
            <button className="modal-close" onClick={this.closeModal}><i className="fa fa-times"></i></button>
          </div>
          <h2 className="modal-header">Nurturing Discipline</h2>
          {this.state.loginForm ? <LoginForm login={this.props.login} closeModal={this.closeModal} openRegisterForm={this.openRegisterForm}/> : ""}
          {this.state.registerForm ? <RegisterForm register={this.props.register} closeModal={this.closeModal} openLoginForm={this.openLoginForm} /> : ""}
          </Modal>
        </div>
      );
    }
  }
}

export default AuthForms;
