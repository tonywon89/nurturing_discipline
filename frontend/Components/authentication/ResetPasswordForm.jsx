
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import React from 'react';

import {
  resetPassword
} from '../../actions/auth_actions.js';

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // validToken: false,
      newPassword: "",
      newPasswordConfirmation: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
  }

  // @TODO: check to see if the token is valid
  componentDidMount() {

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

const mapDispatchToProps = dispatch => ({
  resetPassword: (data) => {
    resetPassword(data)(dispatch);
  }
});

export default connect(null, mapDispatchToProps)(withRouter(ResetPasswordForm));
