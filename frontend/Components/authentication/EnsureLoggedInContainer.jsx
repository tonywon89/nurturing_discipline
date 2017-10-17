import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import React from 'react';


import SidebarContainer from '../navigation/SidebarContainer.jsx';
import ConvictionContainer from '../conviction/ConvictionContainer.jsx';

class EnsureLoggedInContainer extends React.Component {
  componentDidMount() {
    const { dispatch, authentication, history } = this.props

    if (!authentication.currentUser) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      // dispatch(setRedirectUrl(currentURL))
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
        )
    } else {
      return null
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
