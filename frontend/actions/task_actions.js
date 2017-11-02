export const RECEIVE_TASKS = "RECEIVE_TASKS";

import * as TaskAPIUtil from '../api_utils/task_api_util.js';

export const fetchTasks = () => dispatch => {
  TaskAPIUtil.fetchTasks().then(({ tasks }) => {
    dispatch({ type: RECEIVE_TASKS, tasks });
  });
}
