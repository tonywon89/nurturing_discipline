export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT = "LOGOUT";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";

import * as AuthAPIUtil from '../api_utils/auth_api_util';

export const receiveUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const logout = () => ({
  type: LOGOUT
});

export const login = (creds) => dispatch => {
  AuthAPIUtil.login(creds).then((data) => {
    console.log(data)
    dispatch(receiveUser(data))
  }
  );
};
