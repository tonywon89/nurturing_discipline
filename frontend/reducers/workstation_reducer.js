import merge from 'lodash/merge';

import {
  INCREASE_CAROUSEL_INDEX,
  DECREASE_CAROUSEL_INDEX,
  SET_CAROUSEL_INDEX,
  TOGGLE_CAROUSEL_CYCLE,
} from "../actions/workstation_actions.js";

import {
  RECEIVE_SELECTED_TASK,
  START_TASK_TIMER,
  STOP_TASK_TIMER,
  PAUSE_TASK_TIMER,
  PING_TASK_TIMER,
} from "../actions/task_actions.js";

const _default = {
  currentCarouselIndex: 0,
  carouselCycleOn: true,
  selectedTask: { id: null, name: "" },
  timerRunning: false,
  taskActivity: null,
}

const WorkStationReducer = (state = _default, action) => {
  Object.freeze(state);

  switch(action.type) {
    case INCREASE_CAROUSEL_INDEX:
      return merge({}, state, { currentCarouselIndex: state.currentCarouselIndex + 1});
    case DECREASE_CAROUSEL_INDEX:
      return merge({}, state, { currentCarouselIndex: state.currentCarouselIndex - 1});
    case SET_CAROUSEL_INDEX:
      return merge({}, state, { currentCarouselIndex: action.newIndex });
    case TOGGLE_CAROUSEL_CYCLE:
      return merge({}, state, { carouselCycleOn: !state.carouselCycleOn });
    case RECEIVE_SELECTED_TASK:
      return merge({}, state, { selectedTask: action.selectedTask });
    case START_TASK_TIMER:
      return merge({}, state, { timerRunning: true, taskActivity: action.taskActivity });
    case PING_TASK_TIMER:
      return merge({}, state, { timerRunning: (action.taskActivity && action.taskActivity.running ? true: false), taskActivity: action.taskActivity });
    case STOP_TASK_TIMER:
      return merge({}, state, { taskActivity: null, timerRunning: false });
    case PAUSE_TASK_TIMER:
      return merge({}, state, { timerRunning: false, timerPaused: true, taskActivity: action.taskActivity })
    default:
      return state;
  }
}

export default WorkStationReducer;
