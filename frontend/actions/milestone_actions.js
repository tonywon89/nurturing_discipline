export const CREATE_MILESTONE = "CREATE_MILESTONE";
export const RECEIVE_MILESTONE = "RECEIVE_MILESTONE";
export const RECEIVE_MILESTONES = "RECEIVE_MILESTONES";

import * as MilestoneAPIUtil from '../api_utils/milestone_api_util.js';

export const fetchMilestones = () => dispatch => {
  MilestoneAPIUtil.fetchMilestones().then(({ milestones }) => {
    dispatch({ type: RECEIVE_MILESTONES, milestones})
  });
}

export const createMilestone = (data) => dispatch => {
  MilestoneAPIUtil.createMilestone(data).then((milestone) => {
    dispatch({ type: RECEIVE_MILESTONE, milestone })
  });
}
