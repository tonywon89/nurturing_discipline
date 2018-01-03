import merge from 'lodash/merge';

import {
  RECEIVE_CURRENT_USER,
  RECEIVE_LOGOUT,
  RECEIVE_ERRORS,
  RECEIVE_VALID_TOKEN,
  EMAILED_RESET_PASSWORD,
  OPEN_LOGIN_FORM,
  OPEN_REGISTER_FORM,
  OPEN_FORGOT_FORM,
  CLOSE_AUTH_MODAL,
  REQUEST_MADE,
  REQUEST_FINISHED,
} from '../actions/auth_actions.js';

const _nullUser = {
  currentUser: null,
  validToken: false,

  // For resetting password or obtaining email
  submittedEmail: null,

  authModal: {
    modalIsOpen: false,
    registerForm: false,
    loginForm: false,
    forgotForm: false,
  },
  loading: false,
  errors: null
};

const AuthReducer = (state = _nullUser, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, state, { currentUser, errors: null });

    case RECEIVE_LOGOUT:
      return _nullUser;

    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, { errors });

    case RECEIVE_VALID_TOKEN:
      return merge({}, state, { validToken: true, errors: null });

    case EMAILED_RESET_PASSWORD:
      return merge({}, state, { submittedEmail: action.email, errors: null });

    case OPEN_LOGIN_FORM:
      return merge({}, state, { authModal: {
        modalIsOpen: true,
        registerForm: false,
        loginForm: true,
        forgotForm: false,
      }});

    case OPEN_REGISTER_FORM:
      return merge({}, state, { authModal: {
        modalIsOpen: true,
        registerForm: true,
        loginForm: false,
        forgotForm: false,
      }});

    case OPEN_FORGOT_FORM:
      return merge({}, state, { authModal: {
        modalIsOpen: true,
        registerForm: false,
        loginForm: false,
        forgotForm: true,
      }});

    case CLOSE_AUTH_MODAL:
      return merge({}, state, { authModal: {
        modalIsOpen: false,
        registerForm: false,
        loginForm: false,
        forgotForm: false,
      }, errors: null });

    default:
      return state;
  }
}

export default AuthReducer;
