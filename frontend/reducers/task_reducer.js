import merge from 'lodash/merge';

import {
  RECEIVE_TASKS,
} from '../actions/task_actions.js';

import {
  RECEIVE_LOGOUT
} from '../actions/auth_actions.js';

const TasksReducer = (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_TASKS:
      return action.tasks

    case RECEIVE_LOGOUT:
      return [];
    default:
      return state;
  }
}

export default TasksReducer;
