import React from 'react';
import SidebarItem from './SidebarItem.jsx';

const sidebarMenuItems = [
  { name: 'Home', link: 'home' },
  { name: 'Work Station', link: 'workstation' },
  { name: 'Convictions', link: 'convictions' },
  { name: 'Brainstorm', link: 'brainstorm' }
];


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const sidebarLinks = sidebarMenuItems.map((item, idx) => (
      <SidebarItem key={idx} sidebarItemName={item.name} linkUrl={item.link} />
    ));

    return (
      <aside className="sidebar-container">
        {sidebarLinks}
      </aside>
    );
  }
}

export default Sidebar;
