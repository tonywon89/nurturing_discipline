import merge from 'lodash/merge';

import {
  REQUEST_MADE,
  REQUEST_FINISHED,
} from '../actions/loading_actions.js';

const LoadingReducer = (state = false, action) => {
  Object.freeze(state);

  switch(action.type) {
    case REQUEST_MADE:
      return true;
    case REQUEST_FINISHED:
      return false;
    default:
      return false;
  }
}

export default LoadingReducer;
