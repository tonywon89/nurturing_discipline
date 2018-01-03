import merge from 'lodash/merge';

import {
  RECEIVE_TASK_ACTIVITIES,
} from "../actions/task_actions.js";

import {
  RECEIVE_LOGOUT
} from '../actions/auth_actions.js';

const TaskActivitiesReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_TASK_ACTIVITIES:
      return action.taskActivities;

    case RECEIVE_LOGOUT:
      return [];
    default:
      return state;
  }
}

export default TaskActivitiesReducer;
