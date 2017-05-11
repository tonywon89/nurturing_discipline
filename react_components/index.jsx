import React from 'react';
import ReactDOM from 'react-dom';

class SimpleComponent extends React.Component {
  render() {
    return (
      <h2>I am a Simple Component Helloooo!</h2>
    );
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('root');
  ReactDOM.render(<SimpleComponent />, root);
});
