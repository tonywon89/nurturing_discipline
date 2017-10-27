import React from 'react';

import TaskItem from './TaskItem.jsx';

class MilestoneItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subMilestoneContent: ""
    }

    this.handleExpand = this.handleExpand.bind(this);
    this.handleSubMilestoneSubmit = this.handleSubMilestoneSubmit.bind(this);
    this.handleSubMilestoneChange = this.handleSubMilestoneChange.bind(this);
  }

  handleExpand(event) {
    const { milestone } = this.props;

    const data = {
      id: milestone.id,
      content: milestone.content,
      expanded: !milestone.expanded
    };

    this.props.updateMilestone(data);
  }

  handleSubMilestoneSubmit(event) {
    event.preventDefault();

    const { milestone } = this.props;

    const data = {
      subMilestoneContent: this.state.subMilestoneContent,
      parentMilestone: milestone.id
    }

    this.props.createSubMilestone(data);
    this.props.updateMilestone({
      id: milestone.id,
      content: milestone.content,
      expanded: true,
    });

  }

  handleSubMilestoneChange(event) {
    this.setState({ subMilestoneContent: event.target.value });
  }

  render() {
    let expandedContent = null;
    const { milestone } = this.props;

    if (milestone.expanded && this.props.parent) {


      expandedContent = milestone.sub_milestones.map((subMilestone, idx) => {
        return (
            <MilestoneItem key={milestone.id + idx} milestone={subMilestone} parent={subMilestone.sub_milestones && subMilestone.sub_milestones.length > 0 ? true : false } createSubMilestone={this.props.createSubMilestone} updateMilestone={this.props.updateMilestone}/>
          );
      });
    }

    let expandButton = null;

    if (this.props.parent) {
      expandButton = (<i onClick={this.handleExpand} className={"fa fa-chevron-" + (milestone.expanded ? "down" : "right")}></i>);
    }

    return (
      <div className="milestone-item">
        <div className="item">
        {expandButton} {milestone.content}

          <form onSubmit={this.handleSubMilestoneSubmit}>
            <input type="text" onChange={this.handleSubMilestoneChange} value={this.state.subMilestoneContent} placeholder="Sub milestone" />
            <input type="submit" value="Create SubMilestone" />
          </form>

        </div>
        {expandedContent}

      </div>
    );
  }
}

export default MilestoneItem;
