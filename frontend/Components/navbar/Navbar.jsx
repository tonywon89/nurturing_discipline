import React from 'react';
import AuthContainer from '../authentication/AuthContainer.jsx'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="navbar clearfix">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src="/images/Logo.png" alt="Logo"/>
            <span className="logo-text">
              <span>Nurturing</span> Discipline
            </span>
          </div>
        </div>
        <nav className="navbar-right">
          <AuthContainer />
        </nav>
      </header>
    );
  }
}

export default Navbar;
