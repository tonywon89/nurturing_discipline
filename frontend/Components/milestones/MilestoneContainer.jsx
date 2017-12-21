import { connect } from 'react-redux';

import {
  createMilestone,
  fetchMilestones,
  createSubMilestone,
  updateMilestone,
  deleteMilestone,
  createTask,
  updateTask,
  deleteTask,
  openMilestoneForm,
  closeMilestoneModal,
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

  updateTask: (data) => {
    updateTask(data)(dispatch);
  },

  deleteTask: (data) => {
    deleteTask(data)(dispatch);
  },

  openMilestoneForm: (data) => {
    openMilestoneForm(data)(dispatch);
  }

  closeMilestoneModal = () => {
    closeMilestoneModal()(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneList);
