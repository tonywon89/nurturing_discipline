import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter} from 'react-router-dom';

const Root = () => (
  <HashRouter>
    <div>
      <Route exact path ="/" component={SimpleComponent} />
      <Route path="/users" component={UserComponent}/>
    </div>
  </HashRouter>
);

class SimpleComponent extends React.Component {
  render() {
    return (
      <h2>I am a Simple Component Helloooo! Goodbye Hello there 213</h2>
    );
  }
}

class UserComponent extends React.Component {
  render() {
    return (
      <h2>I am a User Component Hellooo</h2>
    );
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
});
