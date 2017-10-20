import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, Link, IndexRoute, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store.js';

import { login } from './actions/auth_actions.js';
import { fetchCsrfToken } from './actions/csrf_actions.js';

import AuthContainer from './Components/authentication/AuthContainer.jsx';
import NavbarContainer from './Components/navigation/NavbarContainer.jsx';
import EnsureLoggedInContainer from './Components/authentication/EnsureLoggedInContainer.jsx';
import ResetPasswordForm from './Components/authentication/ResetPasswordForm.jsx';


const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <div>
        <App />
        <header>
          <NavbarContainer />
        </header>
        <Switch>
          <Route path="/reset/:token" component={ResetPasswordForm} />
          <Route component={EnsureLoggedInContainer} />
       </Switch>
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
    return null;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Root />, document.getElementById('root'));
});
