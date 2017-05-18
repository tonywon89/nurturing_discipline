import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store.js';

import { addConviction, fetchConvictions } from './actions/conviction_actions.js';
import ConvictionContainer from './Components/conviction/ConvictionContainer.jsx';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Route exact path ="/" component={SimpleComponent} />
    </HashRouter>
  </Provider>
);

class SimpleComponent extends React.Component {
  componentDidMount() {
    store.dispatch(fetchConvictions());
  }
  render() {
    return (
      <div>
        <h2>I am a Simple Component</h2>
        <Link to="/api/convictions">All Convictions</Link>
        <ConvictionContainer />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<App />, document.getElementById('root'));
});
