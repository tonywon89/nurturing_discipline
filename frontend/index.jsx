import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, Link, IndexRoute} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store.js';

import { addConviction, fetchConvictions } from './actions/conviction_actions.js';
import { login } from './actions/auth_actions.js';
import { fetchCsrfToken } from './actions/csrf_actions.js';

import AuthContainer from './Components/authentication/AuthContainer.jsx';
import NavbarContainer from './Components/navigation/NavbarContainer.jsx';
import EnsureLoggedInContainer from './Components/authentication/EnsureLoggedInContainer.jsx';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <div>
        <Route component={App} />
        <header>
          <NavbarContainer />
        </header>

          <Route component={EnsureLoggedInContainer}> </Route>

      </div>
    </HashRouter>
  </Provider>
);

class App extends React.Component {
  componentWillMount() {
    store.dispatch(login({ initialLoad: 'true' }));
    store.dispatch(fetchCsrfToken());
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Root />, document.getElementById('root'));
});
