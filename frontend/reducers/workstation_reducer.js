import merge from 'lodash/merge';

import {
  INCREASE_CAROUSEL_INDEX,
  DECREASE_CAROUSEL_INDEX,
  SET_CAROUSEL_INDEX,
  TOGGLE_CAROUSEL_CYCLE,
} from "../actions/workstation_actions.js"

const _default = {
  currentCarouselIndex: 0,
  carouselCycleOn: true,
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
    default:
      return state;
  }
}

export default WorkStationReducer;
