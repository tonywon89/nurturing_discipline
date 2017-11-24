export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_SELECTED_TASK = "RECEIVE_SELECTED_TASK";
export const START_TASK_TIMER = "START_TASK_TIMER";
export const STOP_TASK_TIMER = "STOP_TASK_TIMER";
export const PAUSE_TASK_TIMER = "PAUSE_TASK_TIMER";
export const PING_TASK_TIMER = "PING_TASK_TIMER";
export const RESUME_TASK_TIMER = "RESUME_TASK_TIMER";

import * as TaskAPIUtil from '../api_utils/task_api_util.js';
import * as MilestoneAPIUtil from '../api_utils/milestone_api_util.js';

let intervalId = null;

export const fetchTasks = () => dispatch => {
  TaskAPIUtil.fetchTasks().then(({ tasks, selectedTask }) => {
    dispatch({ type: RECEIVE_TASKS, tasks });
    dispatch({ type: RECEIVE_SELECTED_TASK, selectedTask: ( selectedTask ? selectedTask: {id: 12345, name: "Select a task" }) })
  });
}

// Not only pushes the selected task, but also marks it as active and deactivates the existing on so it saves for the next time upon leaving the page.

export const selectTask = (selectedTask, oldSelectedTask = null) => dispatch => {
  MilestoneAPIUtil.updateTask({ selected: true, id: selectedTask.id, name: selectedTask.name }).then(() => {

    if (oldSelectedTask !== null) {
      if (oldSelectedTask.id !== selectedTask.id) {
        MilestoneAPIUtil.updateTask({ selected: false, id: oldSelectedTask.id, name: oldSelectedTask.name}).then(() => {
          dispatch({ type: RECEIVE_SELECTED_TASK, selectedTask})
        })
      } else {
        dispatch({ type: RECEIVE_SELECTED_TASK, selectedTask})
      }
    } else {
      dispatch({ type: RECEIVE_SELECTED_TASK, selectedTask})
    }
  });
}

export const startTaskTimer = (selectedTask = null) => dispatch => {
  if (selectedTask !== null) {
    TaskAPIUtil.startTaskTimer(selectedTask).then(({ task, taskActivity }) => {
      dispatch({ type: START_TASK_TIMER, taskActivity: taskActivity });
    });
  }
}

export const pingTaskTimer = () => dispatch => {
  TaskAPIUtil.pingTaskTimer().then(({ taskActivity }) => {
    dispatch({type: PING_TASK_TIMER, taskActivity: taskActivity});

  })
}

export const stopTaskTimer = (taskActivity) => dispatch => {
  TaskAPIUtil.stopTaskTimer(taskActivity).then(({ taskActivity }) => {
    dispatch({type: STOP_TASK_TIMER, taskActivity: taskActivity });
  });
}

export const pauseTaskTimer = (taskActivity) => dispatch => {
  TaskAPIUtil.pauseTaskTimer(taskActivity).then(({ taskActivity }) => {
    dispatch({type: PAUSE_TASK_TIMER, taskActivity });
  })
}

export const resumeTaskTimer = (taskActivity) => dispatch => {
  TaskAPIUtil.resumeTaskTimer(taskActivity).then(({ taskActivity }) => {
    dispatch({ type: RESUME_TASK_TIMER, taskActivity });
  })
}
