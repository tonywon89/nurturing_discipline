import React from 'react';
import { Link } from 'react-router-dom';

class User extends React.Component {
  render() {
    return (
      <div>
        <h2>I am a User Component Hellooo 234</h2>
        <Link to="/">Back to Home Page</Link>
      </div>
    );
  }
}

export default User;
