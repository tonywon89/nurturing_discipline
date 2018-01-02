export const CREATE_MILESTONE = "CREATE_MILESTONE";
export const RECEIVE_MILESTONE = "RECEIVE_MILESTONE";
export const RECEIVE_MILESTONES = "RECEIVE_MILESTONES";

export const OPEN_TASK_FORM = "OPEN_TASK_FORM";
export const OPEN_MILESTONE_FORM = "OPEN_MILESTONE_FORM";
export const CLOSE_MILESTONE_MODAL = "CLOSE_MILESTONE_MODAL";

import * as MilestoneAPIUtil from '../api_utils/milestone_api_util.js';

export const fetchMilestones = () => dispatch => {
  MilestoneAPIUtil.fetchMilestones().then(({ milestones }) => {
    dispatch({ type: RECEIVE_MILESTONES, milestones})
  });
};

export const createMilestone = (data) => dispatch => {
  MilestoneAPIUtil.createMilestone(data).then(({ milestones }) => {
    dispatch({ type: RECEIVE_MILESTONES, milestones })
  });
};

export const createSubMilestone = (data) => dispatch => {
  MilestoneAPIUtil.createSubMilestone(data).then(({ milestones }) => {
    dispatch({ type: RECEIVE_MILESTONES, milestones: milestones })
  })
};

export const updateMilestone = (data) => dispatch => {
  MilestoneAPIUtil.updateMilestone(data).then(({ milestones }) => {
    dispatch({ type: RECEIVE_MILESTONES, milestones: milestones })
  })
}

export const deleteMilestone = (data) => dispatch => {
  MilestoneAPIUtil.deleteMilestone(data).then(({ milestones }) => {
    dispatch({ type: RECEIVE_MILESTONES, milestones: milestones })
  });
}

export const createTask = (data) => dispatch => {
  MilestoneAPIUtil.createTask(data).then(({ milestones }) => {
    dispatch({ type: RECEIVE_MILESTONES, milestones: milestones })
  });
}

export const deleteTask = (data) => dispatch => {
  MilestoneAPIUtil.deleteTask(data).then(({ milestones }) => {
    dispatch({ type: RECEIVE_MILESTONES, milestones: milestones })
  });
}

export const updateTask = (data) => dispatch => {
  MilestoneAPIUtil.updateTask(data).then(({ milestones}) => {
    dispatch({ type: RECEIVE_MILESTONES, milestones: milestones })
  });
}

export const openTaskForm = (parentMilestone) => dispatch => {
  dispatch({ type: OPEN_TASK_FORM, parentMilestone: parentMilestone });
}

export const openMilestoneForm = (parentMilestone = null) => dispatch => {
  dispatch({ type: OPEN_MILESTONE_FORM, parentMilestone: parentMilestone });
}

export const closeMilestoneModal = () => dispatch => {
  dispatch({ type: CLOSE_MILESTONE_MODAL });
}
