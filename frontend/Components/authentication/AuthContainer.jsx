import { connect } from 'react-redux';

import {
  login,
  logout,
  register,
  emailForgotAuthInfo,
  clearSubmittedEmail,
  openLoginForm,
  openRegisterForm,
  openForgotForm,
  closeAuthModal,
  makeAJAXRequest,
} from '../../actions/auth_actions.js';

import { makeRequest, finishRequest } from '../../actions/loading_actions.js';

import AuthForms from './AuthForms.jsx';

const mapStateToProps = state => ({
  authentication: state.authentication,
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
  },

  openLoginForm: (event) => {
    event.preventDefault();
    openLoginForm()(dispatch);
  },

  openRegisterForm: (event) => {
    event.preventDefault();
    openRegisterForm()(dispatch);
  },

  openForgotForm: (event) => {
    event.preventDefault();
    openForgotForm()(dispatch);
  },

  closeAuthModal: (event) => {
    event.preventDefault();
    closeAuthModal()(dispatch);
  },

  makeRequest: () => {
    makeRequest()(dispatch);
  },

  finishRequest: () => {
    finishRequest()(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForms);
