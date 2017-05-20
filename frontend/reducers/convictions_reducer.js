import merge from 'lodash/merge';
import {
  RECEIVE_CONVICTION,
  RECEIVE_CONVICTIONS,
  REMOVE_CONVICTION } from '../actions/conviction_actions.js';

const ConvictionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  Object.freeze(state);
  switch(action.type) {
  case RECEIVE_CONVICTION:
    return (
      [
        ...state,
        action.conviction
      ]
    );
    case(RECEIVE_CONVICTIONS):
      return action.convictions;
    case(REMOVE_CONVICTION):
      return state.filter(conviction => conviction.id !== action.convictionId)
     default:
      return state;
  }
}


export default ConvictionsReducer;
