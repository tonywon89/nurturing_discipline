export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const RECEIVE_VALID_TOKEN = "RECEIVE_VALID_TOKEN";
export const EMAILED_RESET_PASSWORD = "EMAILED_RESET_PASSWORD";
export const OPEN_LOGIN_FORM = "OPEN_LOGIN_FORM";
export const OPEN_REGISTER_FORM = "OPEN_REGISTER_FORM";
export const OPEN_FORGOT_FORM = "OPEN_FORGOT_FORM";
export const CLOSE_AUTH_MODAL = "CLOSE_AUTH_MODAL";

import * as AuthAPIUtil from '../api_utils/auth_api_util';
import { getConvictions, fetchConvictions } from './conviction_actions.js';
import { makeRequest, finishRequest } from './loading_actions.js';

export const receiveUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: user
});

export const receiveLogout = () => ({
  type: RECEIVE_LOGOUT
});

export const receiveUserErrors = ({ message }) => ({
  type: RECEIVE_ERRORS,
  errors: [message]
});

export const receiveServerErrors = ({ error }) => ({
  type: RECEIVE_ERRORS,
  errors: [error]
});

export const receiveValidToken = () => ({
  type: RECEIVE_VALID_TOKEN
});

export const emailedForgotAuthInfo = (email) => ({
  type: EMAILED_RESET_PASSWORD,
  email: email
})

export const clearSubmittedEmail = () => dispatch => {
  dispatch(emailedForgotAuthInfo(null));
}

export const openLoginForm = () => dispatch => {
  dispatch({ type: OPEN_LOGIN_FORM });
}

export const openRegisterForm = () => dispatch => {
  dispatch({ type: OPEN_REGISTER_FORM });
}

export const openForgotForm = () => dispatch => {
  dispatch({ type: OPEN_FORGOT_FORM });
}

export const closeAuthModal = () => dispatch => {
  dispatch({ type: CLOSE_AUTH_MODAL });
}

export const logout = () => dispatch => {
  AuthAPIUtil.logout().then((data) => {
  // @TODO: need to clear the session/cookie once this is ready
    dispatch(receiveLogout());
    dispatch(getConvictions([]));
  })
}

export const register = (creds) => dispatch => {
  AuthAPIUtil.register(creds).then((returnData) => {

    if (returnData.error) {
      if (returnData.error.errors
       && returnData.error.errors.email
       && returnData.error.errors.email.message) {
        dispatch(receiveUserErrors({ message: returnData.error.errors.email.message}));

      } else {
        dispatch(receiveUserErrors(returnData));
      }
    } else {
      dispatch(receiveUser(returnData))
      closeAuthModal()(dispatch)
    }
  });
}

export const login = (creds) => dispatch => {
  makeRequest()(dispatch);

  AuthAPIUtil.login(creds).then((returnData) => {
    if (returnData.message) {
      dispatch(receiveUserErrors(returnData));

    } else if (returnData.error) {

      dispatch(receiveUserErrors(returnData));
    } else if (returnData.notLoggedIn) {

    } else {
      dispatch(receiveUser(returnData));
      closeAuthModal()(dispatch)

    }

    finishRequest()(dispatch);
  });
};

export const emailForgotAuthInfo = (email) => dispatch => {
  makeRequest()(dispatch);

  AuthAPIUtil.emailForgotAuthInfo(email).then((returnData) => {
    if (returnData.success) {
      dispatch(emailedForgotAuthInfo(returnData.email))

    } else if (returnData.error) {
      dispatch(receiveUserErrors({message: returnData.errorMessage}));
    }

    finishRequest()(dispatch);
  })
}


// @TODO: Change this to properly dispatch to the store and update the state this way
export const resetPassword = (data) => dispatch => {
  AuthAPIUtil.resetPassword(data).then((returnData) => {
    alert("Password has been reset");
  })
}

export const checkValidToken = (token) => dispatch => {
  AuthAPIUtil.checkValidToken(token).then((returnData) => {
    if (returnData.success) {
      dispatch(receiveValidToken());
    } else if (returnData.error) {
      dispatch(receiveServerErrors({ error: returnData.errorMessage }));
    }
  })
}
