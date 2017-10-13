import { connect } from 'react-redux';

import Sidebar from './Sidebar.jsx';

const mapStateToProps = state => ({
  authentication: state.authentication
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
