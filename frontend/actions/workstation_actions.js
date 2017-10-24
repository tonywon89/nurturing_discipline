export const DECREASE_CAROUSEL_INDEX = "DECREASE_CAROUSEL_INDEX";
export const INCREASE_CAROUSEL_INDEX = "INCREASE_CAROUSEL_INDEX";

export const increaseCarouselIndex = () => dispatch => {
  dispatch({type: INCREASE_CAROUSEL_INDEX});
}

export const decreaseCarouselIndex = () => dispatch => {
  dispatch({type: DECREASE_CAROUSEL_INDEX});
}
