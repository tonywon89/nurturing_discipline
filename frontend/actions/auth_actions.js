export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";

import * as AuthAPIUtil from '../api_utils/auth_api_util';

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

export const logout = () => dispatch => {
  // AuthAPIUtil.logout().then((data) => {
  // @TODO: need to clear the session/cookie once this is ready
  dispatch(receiveLogout());
  // })
}

export const register = (creds) => dispatch => {
  AuthAPIUtil.register(creds).then((data) => {
    if (data.error) {
      alert(data.error)
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
      dispatch(receiveUser(data))
    }
  });
};
