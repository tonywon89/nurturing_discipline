export const CREATE_CONVICTION = "CREATE_CONVICTION";
export const REMOVE_CONVICTION = "REMOVE_CONVICTION";
export const RECEIVE_CONVICTIONS = "RECEIEVE_CONVICTIONS";
export const RECEIVE_CONVICTION = "RECEIVE_CONVICTION";
export const MODIFY_CONVICTION = "MODIFY_CONVICTION";

import * as ConvictionAPIUtil from '../api_utils/conviction_api_util';

export const receiveConviction = (conviction) => ({
  type: RECEIVE_CONVICTION,
  conviction
});

export const getConvictions = (convictions) => ({
  type: RECEIVE_CONVICTIONS,
  convictions
})

export const removeConviction = (convictionId) => ({
  type: REMOVE_CONVICTION,
  convictionId
});

export const modifyConviction = (conviction) => ({
  type: MODIFY_CONVICTION,
  conviction
});

export const fetchConvictions = () => dispatch => {
  ConvictionAPIUtil.fetchConvictions().then(({ convictions }) =>
    dispatch(getConvictions(convictions))
  );
}

export const createConviction = (data) => dispatch => {
  ConvictionAPIUtil.createConviction(data).then(conviction => {
    dispatch(receiveConviction(conviction));
  })
};

export const deleteConviction = (convictionId) => dispatch => {
  ConvictionAPIUtil.deleteConviction(convictionId).then(({ convictionId }) => dispatch(removeConviction(convictionId))
  );
}

export const editConviction = (data) => dispatch => {
  ConvictionAPIUtil.editConviction(data).then((conviction) =>
    dispatch(modifyConviction(conviction))
  );
}

