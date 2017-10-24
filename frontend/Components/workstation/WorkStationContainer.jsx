import { connect } from 'react-redux';

import WorkStation from './WorkStation.jsx';

import {
  fetchConvictions,
} from '../../actions/conviction_actions.js';

const mapStateToProps = state => ({
  convictions: state.convictions,
  authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
  fetchConvictions: (userId) => {
    fetchConvictions(userId)(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkStation)
