import React from 'react';
import { withRouter } from 'react-router';
import AuthContainer from '../authentication/AuthContainer.jsx'


class Navbar extends React.Component {
  handleHomeClick(event) {
    event.preventDefault();

    this.props.history.push('/');
  }

  render() {
    return (
      <header className="navbar clearfix">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src="/images/Logo.png"/>
            <span className="logo-text">
              <a href="#" onClick={this.handleHomeClick.bind(this)}><span>Nurturing</span> Discipline</a>
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

export default withRouter(Navbar);
