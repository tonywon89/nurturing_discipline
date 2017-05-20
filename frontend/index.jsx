import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store.js';

import { addConviction, fetchConvictions } from './actions/conviction_actions.js';
import ConvictionContainer from './Components/conviction/ConvictionContainer.jsx';

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
    store.dispatch(fetchConvictions());
  }

  render() {
    return (
      <div>
        <ConvictionContainer />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<Root />, document.getElementById('root'));
});
