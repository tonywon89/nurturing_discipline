import { connect } from 'react-redux';

import {
  createMilestone,
  fetchMilestones,
  createSubMilestone,
  updateMilestone,
  deleteMilestone,
  createTask,
  deleteTask,
} from '../../actions/milestone_actions.js';

import MilestoneList from './MilestoneList.jsx';

const mapStateToProps = state => ({
  milestones: state.milestones
});

const mapDispatchToProps = dispatch => ({
  createMilestone: (data) => {
    createMilestone(data)(dispatch);
  },

  fetchMilestones: () => {
    fetchMilestones()(dispatch);
  },

  createSubMilestone: (data) => {
    createSubMilestone(data)(dispatch);
  },

  updateMilestone: (data) => {
    updateMilestone(data)(dispatch);
  },

  deleteMilestone: (data) => {
    deleteMilestone(data)(dispatch)
  },

  createTask: (data) => {
    createTask(data)(dispatch);
  },

  deleteTask: (data) => {
    deleteTask(data)(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneList);
