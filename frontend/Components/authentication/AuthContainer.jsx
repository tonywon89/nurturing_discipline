import { connect } from 'react-redux';

import {
  login,
  logout,
  register,
  emailForgotAuthInfo,
  clearSubmittedEmail,
} from '../../actions/auth_actions.js';

import AuthForms from './AuthForms.jsx';

const mapStateToProps = state => ({
  authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
  login: (creds) => {
    login(creds)(dispatch);
  },

  logout: () => {
    logout()(dispatch);
  },

  register: (creds) => {
    register(creds)(dispatch);
  },

  emailForgotAuthInfo: (email) => {
    emailForgotAuthInfo(email)(dispatch);
  },

  clearSubmittedEmail: () => {
    clearSubmittedEmail()(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForms);
