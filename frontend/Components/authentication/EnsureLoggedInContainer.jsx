import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import React from 'react';

import SidebarContainer from '../navigation/SidebarContainer.jsx';
import ConvictionContainer from '../conviction/ConvictionContainer.jsx';

import { login } from '../../actions/auth_actions.js';
import { fetchCsrfToken } from '../../actions/csrf_actions.js';

class EnsureLoggedInContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(login({ initialLoad: 'true' }));
    dispatch(fetchCsrfToken());
  }

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
            <Route path="/convictions" component={ConvictionContainer} />
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
