import React from 'react';
import SidebarItem from './SidebarItem.jsx';

const sidebarMenuItems = [
  { name: 'Work Station', link: 'workstation' },
  { name: 'Convictions', link: 'convictions' },
  { name: 'Milestones / Tasks', link: 'milestone' },
  { name: 'Stats', link: 'stats'}
];


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    if (!this.props.authentication.currentUser) {
      return <div></div>;
    }

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
