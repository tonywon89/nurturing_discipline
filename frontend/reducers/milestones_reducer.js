import merge from 'lodash/merge';
import {
  RECEIVE_MILESTONES,
  OPEN_MILESTONE_FORM,
  OPEN_TASK_FORM,
  CLOSE_MILESTONE_MODAL,
} from '../actions/milestone_actions.js';

import {
  RECEIVE_LOGOUT
} from '../actions/auth_actions.js';

const _default = {
  milestones: [],
  milestoneModal: {
    modalIsOpen: false,
    parentMilestone: null,
    milestoneForm: false,
    taskForm: false,
  }
}

const MilestonesReducer = (state = _default, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_MILESTONES:
      return {
        milestoneModal: state.milestoneModal,
        milestones: action.milestones
      };

    case OPEN_MILESTONE_FORM:
      return merge({}, state, { milestoneModal: {
        modalIsOpen: true,
        milestoneForm: true,
        taskForm: false,
        parentMilestone: action.parentMilestone
      }});

    case OPEN_TASK_FORM:
      return merge({}, state, { milestoneModal: {
        modalIsOpen: true,
        milestoneForm: false,
        taskForm: true,
        parentMilestone: action.parentMilestone
      }});

    case CLOSE_MILESTONE_MODAL:
      return merge({}, state, { milestoneModal: {
        modalIsOpen: false,
        milestoneForm: false,
        taskForm: false,
        parentMilestone: null
      }});

    case RECEIVE_LOGOUT:
      return _default;
    default:
      return state;
  }
}

export default MilestonesReducer;
