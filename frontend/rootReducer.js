import { ADD_CONVICTION, RECEIVE_CONVICTIONS } from './actions/conviction_actions.js';
import * as ConvictionAPIUtil from './api_utils/conviction_api_util';

let initialConvictions = []

const _defaultState = {
  convictions: []
}

const rootReducer = (oldState = _defaultState, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case ADD_CONVICTION:
      return {
        convictions: [
          ...oldState.convictions,
          action.conviction
        ]
      };
    case(RECEIVE_CONVICTIONS):
      console.log(action)
      return { convictions: action.convictions };
    default:
      return oldState;
  }
}

export default rootReducer;
