import merge from 'lodash/merge';
import {
  // RECEIVE_MILESTONE,
  RECEIVE_MILESTONES,
  OPEN_TASK_FORM,
  OPEN_PARENT_MILESTONE_FORM,
  OPEN_SUB_MILESTONE_FORM,
  CLOSE_MILESTONE_MODAL

} from '../actions/milestone_actions.js';

const _default = {
  milestones: [],
  milestoneModal: {
    modalIsOpen: false,
    addTaskForm: false,
    addSubMilestoneForm: false,
    addParentMilestoneForm: false,
  }
}

const MilestonesReducer = (state = _default, action) => {
  Object.freeze(state);

  switch(action.type) {

    // case RECEIVE_MILESTONE:
    //   return (
    //     [
    //       ...state,
    //       action.milestone
    //     ]
    //   );
    case RECEIVE_MILESTONES:
      return merge({}, state, { milestones: action.milestones });
    case OPEN_TASK_FORM:
      return merge({}, state, { milestoneModal: {
        modalIsOpen: true,
        addTaskForm: true,
        addSubMilestoneForm: false,
        addParentMilestoneForm: false,
      }});
    case OPEN_PARENT_MILESTONE_FORM:
      return merge({}, state, { milestoneModal: {
        modalIsOpen: true,
        addTaskForm: false,
        addSubMilestoneForm: false,
        addParentMilestoneForm: true,
      }});
    case OPEN_SUB_MILESTONE_FORM:
      return merge({}, state, { milestoneModal: {
        modalIsOpen: true,
        addTaskForm: false,
        addSubMilestoneForm: true,
        addParentMilestoneForm: false,
      }});

    case CLOSE_MILESTONE_MODAL:
      return merge({}, state, { milestoneModal: {
        modalIsOpen: false,
        addTaskForm: false,
        addSubMilestoneForm: false,
        addParentMilestoneForm: false,
      }});
    default:
      return state;
  }
}

export default MilestonesReducer;
