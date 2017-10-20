import merge from 'lodash/merge';

import {
  RECEIVE_CURRENT_USER,
  RECEIVE_LOGOUT,
  RECEIVE_ERRORS,
  RECEIVE_VALID_TOKEN,
} from '../actions/auth_actions.js';

const _nullUser = {
  currentUser: null,
  validToken: false,
  errors: []
};

const AuthReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, state, { currentUser });
    case RECEIVE_LOGOUT:
      return merge({}, state, { currentUser : null });
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return merge({}, state, { errors });
    case RECEIVE_VALID_TOKEN:
      return merge({}, state, { validToken: true })
    default:
      return state;
  }
}

export default AuthReducer;
