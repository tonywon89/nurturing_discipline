import { RECEIVE_CSRF_TOKEN } from '../actions/csrf_actions.js';

import {
  RECEIVE_LOGOUT
} from '../actions/auth_actions.js';

const CsrfReducer = (state = "", action) => {
  switch(action.type) {
    case RECEIVE_CSRF_TOKEN:
      return action.csrfToken
    case RECEIVE_LOGOUT:
      return "";
    default:
      return state;
  }
}

export default CsrfReducer;
