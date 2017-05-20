export const CREATE_CONVICTION = "CREATE_CONVICTION";
export const REMOVE_CONVICTION = "REMOVE_CONVICTION";
export const RECEIVE_CONVICTIONS = "RECEIEVE_CONVICTIONS";
export const RECEIVE_CONVICTION = "RECEIVE_CONVICTION";

import * as ConvictionAPIUtil from '../api_utils/conviction_api_util';

export const receiveConviction = (conviction) => ({
  type: RECEIVE_CONVICTION,
  conviction
});

export const getConvictions = (data) => ({
  type: RECEIVE_CONVICTIONS,
  convictions: data.convictions
})

export const createConviction = (data) => dispatch => {
  ConvictionAPIUtil.createConviction(data).then(conviction => {
    dispatch(receiveConviction(conviction));
  })
};

export const removeConviction = (convictionId) => ({
  type: REMOVE_CONVICTION,
  convictionId
})

export const fetchConvictions = () => dispatch => {
  ConvictionAPIUtil.fetchConvictions().then(data => dispatch(getConvictions(data)));
}

export const deleteConviction = (convictionId) => dispatch => {
  ConvictionAPIUtil.deleteConviction(convictionId).then(({ convictionId }) => dispatch(removeConviction(convictionId)));
}

