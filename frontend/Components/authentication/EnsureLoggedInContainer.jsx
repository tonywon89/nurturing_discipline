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

    if (!authentication.currentUser && location.pathname !== "/") {
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

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
  return {
    authentication: state.authentication,
  }
}

export default connect(mapStateToProps)(withRouter(EnsureLoggedInContainer))
