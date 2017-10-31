import merge from 'lodash/merge';
import {
  RECEIVE_MILESTONE,
  RECEIVE_MILESTONES,
} from '../actions/milestone_actions.js';

const MilestonesReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {

    case RECEIVE_MILESTONE:
      return (
        [
          ...state,
          action.milestone
        ]
      );
    case RECEIVE_MILESTONES:
      return action.milestones;
    default:
      return state;
  }
}

export default MilestonesReducer;
