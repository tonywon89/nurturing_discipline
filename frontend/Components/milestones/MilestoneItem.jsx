import React from 'react';

import TaskItem from './TaskItem.jsx';

class MilestoneItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      parent: props.parent,
      subMilestoneContent: ""
    }

    this.handleExpand = this.handleExpand.bind(this);
    this.handleSubMilestoneSubmit = this.handleSubMilestoneSubmit.bind(this);
    this.handleSubMilestoneChange = this.handleSubMilestoneChange.bind(this);
  }

  handleExpand(event) {
    this.setState({ expanded: !this.state.expanded });
  }

  handleSubMilestoneSubmit(event) {
    event.preventDefault();

    console.log("THIS IS THE FORM SUBMITTING");
    console.log(this.props.milestone);

    const data = {
      subMilestoneContent: this.state.subMilestoneContent,
      parentMilestone: this.props.milestone.id
    }

    // console.log(data);
    this.props.createSubMilestone(data);

  }

  handleSubMilestoneChange(event) {
    this.setState({ subMilestoneContent: event.target.value });
  }

  render() {
    // console.log("THIS IS IT");
    // console.log(this.props.milestone);
    let expandedContent = null;
    let generalTaskItem = null;
    if (this.state.expanded && this.state.parent) {
      expandedContent = this.props.milestone.sub_milestones.map((milestone, idx) => {
        return (
            <MilestoneItem key={milestone.id + idx} parent={false} milestone={milestone} parent={milestone.sub_milestones && milestone.sub_milestones.length > 0 ? true : false }createSubMilestone={this.props.createSubMilestone}/>
          );
      });
    }

    if (this.state.expanded) {
      generalTaskItem = (<TaskItem parentMilestone={this.props.milestone}/>)
    }

    return (
      <div className="milestone-item">
        <div className="item">
          <i onClick={this.handleExpand} className={"fa fa-chevron-" + (this.state.expanded ? "down" : "right")}></i>{this.props.milestone.content}
          <form onSubmit={this.handleSubMilestoneSubmit}>
            <input type="text" onChange={this.handleSubMilestoneChange} value={this.state.subMilestoneContent} placeholder="Sub milestone" />
            <input type="submit" value="Create SubMilestone" />
          </form>

        </div>
        {expandedContent}
        {generalTaskItem}
      </div>
    );
  }
}

export default MilestoneItem;
