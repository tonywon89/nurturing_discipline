
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import React from 'react';

import {
  resetPassword,
  checkValidToken
} from '../../actions/auth_actions.js';

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validToken: props.authentication.validToken,
      newPassword: "",
      newPasswordConfirmation: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
  }

  componentDidMount() {
    this.props.checkValidToken(this.props.match.params.token);
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if (!newProps.authentication.validToken) {
      alert("Sorry, that token is invalid or expired. Please reset the password again");
      this.props.history.replace("/");
    }
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
    this.props.history.push("/");
  }


  handlePasswordChange(event) {
    this.setState({ newPassword: event.target.value });
  }

  handlePasswordConfirmChange(event) {
    this.setState({ newPasswordConfirmation: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="password" name="newPassword" placeholder="New Password" required onChange={this.handlePasswordChange}/>
          <input type="password" required name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmChange} placeholder=" New Password Confirmation" />
          <input type="submit" value="Reset Password" />
        </form>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPasswordForm));
