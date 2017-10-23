import { connect } from 'react-redux';
import React from 'react';

// import { makeRequest, finishRequest } from '../actions/loading_actions.js';

class LoadingIcon extends React.Component {
  render() {
    return (
     <div className={"loading-icon " + (this.props.loading ? " active" : " hidden") }>
      <i className="fa fa-refresh fa-spin "></i>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(LoadingIcon);
