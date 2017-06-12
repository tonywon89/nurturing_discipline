import { RECEIVE_CSRF_TOKEN } from '../actions/csrf_actions.js';

const CsrfReducer = (state = "", action) => {
  switch(action.type) {
    case RECEIVE_CSRF_TOKEN:
      return action.csrfToken
    default:
      return state;
  }
}

export default CsrfReducer;
