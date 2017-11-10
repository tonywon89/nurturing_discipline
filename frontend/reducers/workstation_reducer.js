import merge from 'lodash/merge';

import {
  INCREASE_CAROUSEL_INDEX,
  DECREASE_CAROUSEL_INDEX,
  SET_CAROUSEL_INDEX,
  TOGGLE_CAROUSEL_CYCLE,
} from "../actions/workstation_actions.js";

import {
  RECEIVE_SELECTED_TASK,
} from "../actions/task_actions.js";

const _default = {
  currentCarouselIndex: 0,
  carouselCycleOn: true,
  selectedTask: {id: 12345, name: "Default Task" },
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
    default:
      return state;
  }
}

export default WorkStationReducer;
