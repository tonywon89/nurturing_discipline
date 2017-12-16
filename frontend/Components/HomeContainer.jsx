import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router';
import { Route } from 'react-router-dom';

import EnsureLoggedInContainer from './authentication/EnsureLoggedInContainer.jsx';

class HomeContainer extends React.Component {
  render() {
    const { authentication } = this.props

    let displayComponent;

    if (authentication.currentUser) {
       displayComponent = <Route component={EnsureLoggedInContainer} />
    } else {
      displayComponent = (
        <div className="home-page">
          <h3>Welcome to Nurturing Disicpline</h3>
          <div>Please login or register to get started!</div>
        </div>
      );
    }

    return (
      <div>
        {displayComponent}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    authentication: state.authentication,
  }
}


export default connect(mapStateToProps)(HomeContainer);
