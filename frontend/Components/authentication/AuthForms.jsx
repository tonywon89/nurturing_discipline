import React from 'react';
import LoginForm from './LoginForm.jsx'
import RegisterForm from './RegisterForm.jsx'
import ForgotForm from './ForgotForm.jsx';

import { CSSTransitionGroup } from 'react-transition-group'
import Modal from 'react-modal';
import { withRouter } from 'react-router';

class AuthForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.authentication.currentUser,
      dropdownVisible: false,
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);

    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.props.makeRequest();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentUser: nextProps.authentication.currentUser });
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
    this.props.history.push('/');

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


  closeModal(event) {
    if (this.props.authentication.submittedEmail) {
      this.props.clearSubmittedEmail();
    }
    this.props.closeAuthModal(event);
  }

  render() {
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
      const loginLink = <a href="#" onClick={this.props.openLoginForm}>Login</a>;
      const registerLink = <a href="#" onClick={this.props.openRegisterForm}>Register</a>;
      const { modalIsOpen, registerForm, loginForm, forgotForm } = this.props.authentication.authModal

      return (
        <div>
          <div className="nav-username">
            {loginLink} <span className="divider"></span> {registerLink}

            <Modal
              isOpen={modalIsOpen}
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

              {loginForm ? <LoginForm login={this.props.login} closeModal={this.closeModal} openRegisterForm={this.props.openRegisterForm} openForgotForm={this.props.openForgotForm} /> : ""}

              {registerForm ? <RegisterForm register={this.props.register} closeModal={this.closeModal} openLoginForm={this.props.openLoginForm} /> : ""}

              {forgotForm ? <ForgotForm emailForgotAuthInfo={this.props.emailForgotAuthInfo} submittedEmail={this.props.authentication.submittedEmail} clearSubmittedEmail={this.props.clearSubmittedEmail} closeModal={this.closeModal} /> : ""}

            </Modal>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(AuthForms);
