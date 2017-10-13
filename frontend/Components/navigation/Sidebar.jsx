import React from 'react';
import SidebarItem from './SidebarItem.jsx';

const sidebarMenuItems = [
  'Home',
  'Work Station',
  'Stats',
  'Convictions',
  'Brainstorm'
];


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const sidebarLinks = sidebarMenuItems.map((item, idx) => (
      <SidebarItem key={idx} sidebarItemName={item} />
    ));

    return (
      <aside className="sidebar-container">
        {sidebarLinks}
      </aside>
    );
  }
}

export default Sidebar;
