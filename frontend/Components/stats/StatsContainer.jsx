import { connect } from 'react-redux';

import Stats from './Stats.jsx';

import {
 fetchTaskActivities,
} from '../../actions/task_actions.js';

const mapStateToProps = state => ({
  taskActivities: state.taskActivities,
});

const mapDispatchToProps = dispatch => ({
  fetchTaskActivities: () => {
    fetchTaskActivities()(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);
