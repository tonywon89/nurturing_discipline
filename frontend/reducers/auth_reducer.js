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
  errors: []
};

const AuthReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, state, { currentUser, loading: false });
    case RECEIVE_LOGOUT:
      return merge({}, state, { currentUser : null, loading: false });
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, { errors, loading: false });
    case RECEIVE_VALID_TOKEN:
      return merge({}, state, { validToken: true, loading: false });
    case EMAILED_RESET_PASSWORD:
      return merge({}, state, { submittedEmail: action.email, loading: false });
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
      }});
    // case REQUEST_MADE:
    //   return merge({}, state, { loading: true })
    // case REQUEST_FINISHED:
    //   return merge({}, state, { loading:  })
    default:
      return state;
  }
}

export default AuthReducer;
