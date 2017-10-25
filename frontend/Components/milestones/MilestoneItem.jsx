import React from 'react';

class MilestoneItem extends React.Component {
  render() {
    return (
      <li>
        {this.props.milestone.content}
      </li>
    );
  }
}

export default MilestoneItem;
