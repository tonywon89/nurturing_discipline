import { connect } from 'react-redux';

import {
  createMilestone
} from '../../actions/milestone_actions.js';

import MilestoneList from './MilestoneList.jsx';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  createMilestone: (data) => {
    createMilestone(data)(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MilestoneList);
