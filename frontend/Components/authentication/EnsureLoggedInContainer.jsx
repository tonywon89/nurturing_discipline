import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router';
import { Route } from 'react-router-dom';
import React from 'react';

import LoggedInHome from '../LoggedInHome.jsx';
import SidebarContainer from '../navigation/SidebarContainer.jsx';
import ConvictionContainer from '../conviction/ConvictionContainer.jsx';
import WorkStationContainer from '../workstation/WorkStationContainer.jsx';
import MilestoneContainer from '../milestones/MilestoneContainer.jsx';
import StatsContainer from '../stats/StatsContainer.jsx';

import { login } from '../../actions/auth_actions.js';
import { fetchCsrfToken } from '../../actions/csrf_actions.js';

class EnsureLoggedInContainer extends React.Component {
  componentDidUpdate() {
    const { dispatch, authentication, history, location } = this.props

    if (!authentication.currentUser &&
     location.pathname === "/convictions") {
      alert("You must be logged in to view that page");
      history.replace("/");
    }
  }

  render() {
    if (this.props.authentication.currentUser) {
      return (
        <main>
          <SidebarContainer />
          <div className="content">
            <Switch>
              <Route exact path="/" component={LoggedInHome} />
              <Route path="/convictions" component={ConvictionContainer} />
              <Route path="/workstation" component={WorkStationContainer} />
              <Route path="/milestone" component={MilestoneContainer} />
              <Route path="/stats" component={StatsContainer} />
            </Switch>
          </div>
        </main>
      );
    } else {
      return null;
    }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    authentication: state.authentication,
  }
}

export default connect(mapStateToProps)(withRouter(EnsureLoggedInContainer))
