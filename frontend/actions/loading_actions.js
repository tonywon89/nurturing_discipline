export const REQUEST_MADE = "REQUESET_MADE";
export const REQUEST_FINISHED = "REQUEST_FINISHED";


export const makeRequest = () => dispatch => {
  dispatch({ type: REQUEST_MADE });
}

export const finishRequest = () => dispatch => {
  dispatch({ type: REQUEST_FINISHED });
}
