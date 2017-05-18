export const ADD_CONVICTION = "ADD_CONVICTION";
export const DELETE_CONVICTION = "DELETE_CONVICTION";
export const RECEIVE_CONVICTIONS = "RECEIEVE_CONVICTIONS";

import * as ConvictionAPIUtil from '../api_utils/conviction_api_util';

export const addConviction = (conviction) => ({
  type: ADD_CONVICTION,
  conviction: conviction
});

export const getConvictions = (convictions) => ({
  type: RECEIVE_CONVICTIONS,
  convictions: convictions.convictions
})

export const fetchConvictions = () => dispatch => {
  ConvictionAPIUtil.fetchConvictions().then(convictions => dispatch(getConvictions(convictions)));
}

