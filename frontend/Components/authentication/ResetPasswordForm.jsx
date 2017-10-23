
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import React from 'react';

import {
  resetPassword,
  checkValidToken,
  openLoginForm,
  logout,
} from '../../actions/auth_actions.js';

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      newPasswordConfirmation: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
  }

  componentDidMount() {
    const { checkValidToken, match } = this.props;

    checkValidToken(match.params.token);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.newPassword.trim() === "") {
      alert("A password must be entered for registration");
      return;
    }

    if (this.state.newPassword.trim() !== this.state.newPasswordConfirmation.trim()) {
      alert("The passwords don't match.");
      return;
    }

    const data = {
      newPassword: this.state.newPassword,
      token: this.props.match.params.token
    }

    this.props.resetPassword(data);
    this.props.logout();
    this.props.openLoginForm(event);
    this.props.history.push("/");
  }


  handlePasswordChange(event) {
    this.setState({ newPassword: event.target.value });
  }

  handlePasswordConfirmChange(event) {
    this.setState({ newPasswordConfirmation: event.target.value });
  }

  render() {
    let content;
    if (this.props.authentication.validToken) {
      content = (

          <form className="auth-form" onSubmit={this.handleSubmit}>
            <h5 style={{ color: 'black' }}>Reset Password</h5><br/>
            <div>
              <div className="input-field">
                <input type="password" name="newPassword" required onChange={this.handlePasswordChange}/>
                <span className="floating-label">New Password</span>
              </div>
              <div className="input-field">
                <input type="password" required name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmChange}  />
                <span className="floating-label">New Password Confirmation</span>
              </div>
            </div>
            <input type="submit" value="Reset Password" />
          </form>

      );
    } else {
      content = <p>Sorry, that token is invalid or expired. Please reset the password again</p>
    }
    return (
      <div className="reset-password-form">

        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
})

const mapDispatchToProps = dispatch => ({
  resetPassword: (data) => {
    resetPassword(data)(dispatch);
  },

  checkValidToken: (token) => {
    checkValidToken(token)(dispatch);
  },

  logout: () => {
    logout()(dispatch);
  },

  openLoginForm: (event) => {
    event.preventDefault();
    openLoginForm()(dispatch);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPasswordForm));
