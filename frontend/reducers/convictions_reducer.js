import merge from 'lodash/merge';
import {
  RECEIVE_CONVICTION,
  RECEIVE_CONVICTIONS,
  REMOVE_CONVICTION,
  MODIFY_CONVICTION
} from '../actions/conviction_actions.js';

import {
  RECEIVE_LOGOUT
} from '../actions/auth_actions.js';


const ConvictionsReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_CONVICTION:
      return (
        [
          ...state,
          action.conviction
        ]
      );
    case RECEIVE_CONVICTIONS:
      return action.convictions;

    case REMOVE_CONVICTION:
      return state.filter(conviction => conviction.id !== action.convictionId)

    case MODIFY_CONVICTION:
      return state.map(conviction => {
        if (conviction.id !== action.conviction.id) {
            // This isn't the item we care about - keep it as-is
            return conviction;
        }

        // Otherwise, this is the one we want - return an updated value
        return merge({}, conviction, action.conviction)
    });

    case RECEIVE_LOGOUT:
      return [];
    default:
      return state;
  }
}


export default ConvictionsReducer;
