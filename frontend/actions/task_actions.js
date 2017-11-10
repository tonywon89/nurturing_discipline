export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_SELECTED_TASK = "RECEIVE_SELECTED_TASK";

import * as TaskAPIUtil from '../api_utils/task_api_util.js';

export const fetchTasks = () => dispatch => {
  TaskAPIUtil.fetchTasks().then(({ tasks }) => {
    dispatch({ type: RECEIVE_TASKS, tasks });
    dispatch({ type: RECEIVE_SELECTED_TASK, selectedTask: (tasks.length > 0 ? tasks[0] : {id: 12345, name: "Default Task" }) })
  });
}

export const selectTask = (selectedTask) => dispatch => {
  dispatch({ type: RECEIVE_SELECTED_TASK, selectedTask})
}
