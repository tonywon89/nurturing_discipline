export const CREATE_MILESTONE = "CREATE_MILESTONE";

import * as MilestoneAPIUtil from '../api_utils/milestone_api_util.js';

export const createMilestone = (data) => dispatch => {
  MilestoneAPIUtil.createMilestone(data).then((milestone) => {
    // dispatch({ type: RECEIVE_MILESTONE})
    console.log(milestone);
  })
}
