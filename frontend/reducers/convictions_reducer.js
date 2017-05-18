import merge from 'lodash/merge';
import { ADD_CONVICTION, RECEIVE_CONVICTIONS } from '../actions/conviction_actions.js';

const ConvictionsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  Object.freeze(state);
  switch(action.type) {
  case ADD_CONVICTION:
    return (
      [
        ...state,
        { title: action.conviction }
      ]
    );
    case(RECEIVE_CONVICTIONS):
      return action.convictions;
    default:
      return state;
  }
}


export default ConvictionsReducer;
