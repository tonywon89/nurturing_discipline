import React from 'react';

class SidebarItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="sidebar-item">
        {this.props.sidebarItemName}
      </a>
    );
  }

}

export default SidebarItem;

