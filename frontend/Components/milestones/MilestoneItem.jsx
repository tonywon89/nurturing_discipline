import React from 'react';

import TaskItem from './TaskItem.jsx';

class MilestoneItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subMilestoneContent: "",
      milestoneContent: props.milestone.content,
      edit: false,
      taskName: "",
    }

    this.handleExpand = this.handleExpand.bind(this);
    this.handleSubMilestoneSubmit = this.handleSubMilestoneSubmit.bind(this);
    this.handleSubMilestoneChange = this.handleSubMilestoneChange.bind(this);
    this.handleDeleteMilestone = this.handleDeleteMilestone.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleCreateTaskSubmit = this.handleCreateTaskSubmit.bind(this);
  }

  handleExpand(event) {
    const { milestone } = this.props;

    const data = {
      id: milestone.id,
      content: milestone.content,
      expanded: !milestone.expanded,
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

  handleEditSubmit(event) {
    event.preventDefault();

    const { milestone } = this.props;

    const data = {
      id: milestone.id,
      content: this.state.milestoneContent,
      expanded: milestone.expanded,
    };

    this.props.updateMilestone(data);
    this.setState({ edit: false});
  }

  handleSubMilestoneChange(event) {
    this.setState({ subMilestoneContent: event.target.value });
  }

  handleDeleteMilestone(event) {
    this.props.deleteMilestone(this.props.milestone)
  }

  toggleEdit(event) {
    this.setState({ edit: !this.state.edit});
  }

  handleEditChange(event) {
    this.setState({ milestoneContent: event.target.value})
  }

  handleTaskNameChange(event) {
    this.setState({ taskName: event.target.value });
  }

  handleCreateTaskSubmit(event) {
    event.preventDefault();

    const data = {
      name: this.state.taskName,
      milestoneId: this.props.milestone.id,
    }

    this.props.createTask(data);
  }

  render() {
    let expandedContent = null;
    const { milestone } = this.props;

    if (milestone.expanded && this.props.isParent) {


      expandedContent = milestone.sub_milestones.map((subMilestone, idx) => {
        return (
            <MilestoneItem
              key={milestone.id + idx}
              milestone={subMilestone}
              isParent={subMilestone.sub_milestones && subMilestone.sub_milestones.length > 0 ? true : false }
              createSubMilestone={this.props.createSubMilestone}
              updateMilestone={this.props.updateMilestone}
              deleteMilestone={this.props.deleteMilestone}
              createTask={this.props.createTask}
              deleteTask={this.props.deleteTask}
              />
          );
      });
    }

    let taskItems = null;

    if (milestone.expanded) {
      taskItems = milestone.tasks.map((task, idx) => {
        return (
          <TaskItem key={task.id} task={task} deleteTask={this.props.deleteTask}/>
          )
      });
    }

    let expandButton = (<i onClick={this.handleExpand} className={"fa fa-chevron-" + (milestone.expanded ? "down" : "right")}></i>);


    let milestoneContent = (<span onClick={this.toggleEdit}>{milestone.content}</span>);

    if (this.state.edit) {
      milestoneContent = (
        <div>
          <form style={{display: "inline"}} onSubmit={this.handleEditSubmit }>
            <input type="text" onChange={this.handleEditChange} value={this.state.milestoneContent} />
            <input type="submit" value="Save"/>
          </form>
          <i className="fa fa-times" onClick={this.toggleEdit}></i>
        </div>
      );
    }


    return (
      <div className="milestone-item">
        <div className="item">
          {expandButton}
          {milestoneContent}
          <i onClick={this.handleDeleteMilestone} className="fa fa-trash-o"></i>

          <form onSubmit={this.handleSubMilestoneSubmit}>
            <input type="text" onChange={this.handleSubMilestoneChange} value={this.state.subMilestoneContent} placeholder="Sub milestone" />
            <input type="submit" value="Create SubMilestone" />
          </form>

          <form onSubmit={this.handleCreateTaskSubmit}>
            <input type="text" onChange={this.handleTaskNameChange} value={this.state.taskName} placeholder="New Task" />
            <input type="submit" value="Create task" />
          </form>
        </div>
        {expandedContent}
        {taskItems}
      </div>
    );
  }
}

export default MilestoneItem;
