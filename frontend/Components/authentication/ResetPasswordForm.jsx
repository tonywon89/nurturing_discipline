
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
      newPassword: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      newPassword: this.state.newPassword,
      token: this.props.match.params.token
    }

    console.log(data);
    this.props.resetPassword(data);
  }


  handlePasswordChange(event) {
    this.setState({ newPassword: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="password" name="new-password" placeholder="New Password" required onChange={this.handlePasswordChange}/>
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

export default connect(null, mapDispatchToProps)(ResetPasswordForm);
