import { connect } from 'react-redux';

import {
  createMilestone,
  fetchMilestones,
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneList);
