export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_SELECTED_TASK = "RECEIVE_SELECTED_TASK";
export const START_TASK_TIMER = "START_TASK_TIMER";
export const STOP_TASK_TIMER = "STOP_TASK_TIMER";
export const PAUSE_TASK_TIMER = "PAUSE_TASK_TIMER";

import * as TaskAPIUtil from '../api_utils/task_api_util.js';
import * as MilestoneAPIUtil from '../api_utils/milestone_api_util.js';

export const fetchTasks = () => dispatch => {
  TaskAPIUtil.fetchTasks().then(({ tasks, selectedTask }) => {
    dispatch({ type: RECEIVE_TASKS, tasks });
    dispatch({ type: RECEIVE_SELECTED_TASK, selectedTask: ( selectedTask ? selectedTask: {id: 12345, name: "Default Task" }) })
  });
}

// Not only pushes the selected task, but also marks it as active and deactivates the existing on so it saves for the next time upon leaving the page.

export const selectTask = (selectedTask, oldSelectedTask = null) => dispatch => {
  MilestoneAPIUtil.updateTask({ active: true, id: selectedTask.id, name: selectedTask.name }).then(() => {

    if (oldSelectedTask !== null) {
      MilestoneAPIUtil.updateTask({ active: false, id: oldSelectedTask.id, name: oldSelectedTask.name}).then(() => {
        dispatch({ type: RECEIVE_SELECTED_TASK, selectedTask})
      })
    } else {
      dispatch({ type: RECEIVE_SELECTED_TASK, selectedTask})
    }
  });
}

export const startTaskTimer = (selectedTask) => dispatch => {
  dispatch({ type: START_TASK_TIMER })
}
