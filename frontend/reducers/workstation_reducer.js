import merge from 'lodash/merge';

import {
  INCREASE_CAROUSEL_INDEX,
  DECREASE_CAROUSEL_INDEX
} from "../actions/workstation_actions.js"

const _default = {
  currentCarouselIndex: 0,
}

const WorkStationReducer = (state = _default, action) => {
  Object.freeze(state);

  switch(action.type) {
    case INCREASE_CAROUSEL_INDEX:
      return merge({}, state, { currentCarouselIndex: state.currentCarouselIndex + 1})
    case DECREASE_CAROUSEL_INDEX:
      return merge({}, state, { currentCarouselIndex: state.currentCarouselIndex - 1})
    default:
      return state;
  }
}

export default WorkStationReducer;
