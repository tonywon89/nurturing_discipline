import React from 'react';
import { withRouter } from 'react-router';

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    console.log(this.props);
    this.props.history.push(this.props.linkUrl);
  }

  render() {
    return (
      <a onClick={this.handleClick} className="sidebar-item">
        {this.props.sidebarItemName}
      </a>
    );
  }

}

export default withRouter(SidebarItem);

