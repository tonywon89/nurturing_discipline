export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const RECEIVE_VALID_TOKEN = "RECEIVE_VALID_TOKEN";
export const EMAILED_RESET_PASSWORD = "EMAILED_RESET_PASSWORD";

import * as AuthAPIUtil from '../api_utils/auth_api_util';
import { getConvictions, fetchConvictions } from './conviction_actions.js';

export const receiveUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: user
});

export const receiveLogout = () => ({
  type: RECEIVE_LOGOUT
});

export const receiveUserErrors = ({ message }) => ({
  type: RECEIVE_ERRORS,
  errors: message
});

export const receiveServerErrors = ({ error }) => ({
  type: RECEIVE_ERRORS,
  errors: error
});

export const receiveValidToken = () => ({
  type: RECEIVE_VALID_TOKEN
});

export const emailedResetPassword = (email) => ({
  type: EMAILED_RESET_PASSWORD,
  email: email
})

export const clearSubmittedEmail = () => dispatch => {
  dispatch(emailedResetPassword(null));
}

export const logout = () => dispatch => {
  AuthAPIUtil.logout().then((data) => {
  // @TODO: need to clear the session/cookie once this is ready
    dispatch(receiveLogout());
    dispatch(getConvictions([]));
  })
}

export const register = (creds) => dispatch => {
  AuthAPIUtil.register(creds).then((data) => {
    if (data.error) {
      console.log(data.error)
    } else {
      dispatch(receiveUser(data))
    }
  });
}

export const login = (creds) => dispatch => {
  AuthAPIUtil.login(creds).then((data) => {
    // Will have a message if there was an error
    if (data.message) {
      alert(data.message);
    } else if (data.error) {
      alert(data.error);
    } else {
      dispatch(receiveUser(data));
    }
  });
};


// @TODO: Change this to properly dispatch to the store and update the state this way
export const emailResetPassword = (email) => dispatch => {
  AuthAPIUtil.emailResetPassword(email).then((returnData) => {
    if (returnData.success) {
      dispatch(emailedResetPassword(returnData.email))
    } else if (returnData.error) {
      dispatch(receiveUserErrors({message: returnData.errorMessage}));
    }
    console.log(returnData);
  })
}


// @TODO: Change this to properly dispatch to the store and update the state this way
export const resetPassword = (data) => dispatch => {
  AuthAPIUtil.resetPassword(data).then((returnData) => {
    alert("Password has been reset");
    console.log(returnData);
  })
}

export const checkValidToken = (token) => dispatch => {
  AuthAPIUtil.checkValidToken(token).then((returnData) => {
    if (returnData.success) {
      dispatch(receiveValidToken());
    } else if (returnData.error) {
      dispatch(receiveServerErrors({ error: returnData.errorMessage }));
    }
    console.log(returnData);
  })
}


