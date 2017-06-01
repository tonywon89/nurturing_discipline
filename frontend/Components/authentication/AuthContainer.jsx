import { connect } from 'react-redux';

import {
  login,
  receiveUser
} from '../../actions/auth_actions.js';

import AuthForms from './AuthForms.jsx';

const mapStateToProps = state => ({
  authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({
  login: (creds) => {
    login(creds)(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForms);
