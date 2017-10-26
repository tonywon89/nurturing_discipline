import React from 'react';

import TaskItem from './TaskItem.jsx';

class MilestoneItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      parent: props.parent
    }

    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand(event) {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {

    let expandedContent = null;
    let generalTaskItem = null;
    if (this.state.expanded && this.state.parent) {
      expandedContent = (
        <div>
          <MilestoneItem parent={false} milestone={{content: "This is the sub milestone"}}/>
        </div>
      );
    }

    if (this.state.expanded) {
      generalTaskItem = (<TaskItem parentMilestone={this.props.milestone}/>)
    }

    return (
      <li className="milestone-item">
        <div className="item">
          <i onClick={this.handleExpand} className={"fa fa-chevron-" + (this.state.expanded ? "down" : "right")}></i>{this.props.milestone.content}
        </div>

        {expandedContent}
        {generalTaskItem}
      </li>
    );
  }
}

export default MilestoneItem;
