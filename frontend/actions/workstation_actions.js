export const DECREASE_CAROUSEL_INDEX = "DECREASE_CAROUSEL_INDEX";
export const INCREASE_CAROUSEL_INDEX = "INCREASE_CAROUSEL_INDEX";
export const SET_CAROUSEL_INDEX = "SET_CAROUSEL_INDEX";

export const increaseCarouselIndex = () => dispatch => {
  dispatch({ type: INCREASE_CAROUSEL_INDEX });
}

export const decreaseCarouselIndex = () => dispatch => {
  dispatch({ type: DECREASE_CAROUSEL_INDEX });
}

export const setCarouselIndex = (newIndex) => dispatch => {
  dispatch({ type: SET_CAROUSEL_INDEX, newIndex })
}
