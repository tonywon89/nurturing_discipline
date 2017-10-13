import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store.js';

import { addConviction, fetchConvictions } from './actions/conviction_actions.js';
import { login } from './actions/auth_actions.js';
import { fetchCsrfToken } from './actions/csrf_actions.js';
import ConvictionContainer from './Components/conviction/ConvictionContainer.jsx';
import AuthContainer from './Components/authentication/AuthContainer.jsx';
import NavbarContainer from './Components/navigation/NavbarContainer.jsx';
import SidebarContainer from './Components/navigation/SidebarContainer.jsx';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Route exact path ="/" component={App} />
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
        <header>
          <NavbarContainer />
        </header>
        <main>
          <SidebarContainer />
          <div className="content">
            <ConvictionContainer />
          </div>
        </main>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Root />, document.getElementById('root'));
});
