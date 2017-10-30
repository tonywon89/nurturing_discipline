import React from 'react';
import Modal from 'react-modal';

import TaskItem from './TaskItem.jsx';

class MilestoneItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subMilestoneContent: "",
      milestoneContent: props.milestone.content,
      edit: false,
      taskName: "",

      modalIsOpen: false,
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

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

    this.closeModal();
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
    this.closeModal();
  }

  openModal(event) {
    event.preventDefault();

    this.setState({
      modalIsOpen: true,
    })
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      subMilestoneContent: "",
      taskName: "",
    })
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
              updateTask={this.props.updateTask}
              deleteTask={this.props.deleteTask}
              />
          );
      });
    }

    let taskItems = null;

    if (milestone.expanded) {
      taskItems = milestone.tasks.map((task, idx) => {
        return (
          <TaskItem key={task.id} task={task} deleteTask={this.props.deleteTask} updateTask={this.props.updateTask}/>
          )
      });
    }

    let expandButton = (<i onClick={this.handleExpand} className={"fa fa-chevron-" + (milestone.expanded ? "down" : "right")}></i>);


    let milestoneContent = (
      <span className="milestone-content">
        <div>
          {milestone.content}
          <i className="fa fa-pencil" onClick={this.toggleEdit}></i>
          <i onClick={this.handleDeleteMilestone} className="fa fa-trash-o"></i>
        </div>
        <div>
          <i onClick={this.openModal} className="fa fa-plus"></i>
        </div>
      </span>);

    if (this.state.edit) {
      milestoneContent = (
        <div className="modify-milestone-container" >
          <form className="modify-milestone-form" onSubmit={this.handleEditSubmit }>
            <input type="text" onChange={this.handleEditChange} value={this.state.milestoneContent} size={this.state.milestoneContent.length}/>
            <button type="submit"><i className="fa fa-check"></i></button>
            <i className="fa fa-times" onClick={this.toggleEdit}></i>
          </form>

        </div>
      );
    }


    return (
      <div className="milestone-item">
        <div className="item">
          {expandButton}
          {milestoneContent}

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className={{
              base: "modal-content",
              afterOpen: "milestone-item-form",
              beforeClose: "modal-content"
            }}
            overlayClassName={{
              base: "modal-overlay",
              afterOpen: "modal-overlay",
              beforeClose: "modal-overlay",
            }}
            contentLabel="Milestone Item Modal"
          >
            <div>
              <div className="clearfix">
                <button className="modal-close" onClick={this.closeModal}><i className="fa fa-times"></i></button>
              </div>
              <h5 style={{ marginBottom: "1em" }}>Create for "{this.props.milestone.content}"</h5>

              <form className="create-submilestone-task-form" onSubmit={this.handleSubMilestoneSubmit}>
                <input type="text" onChange={this.handleSubMilestoneChange} value={this.state.subMilestoneContent} placeholder="New Landmark / Submilestone" />
                <input type="submit" value="Create Landmark" />
              </form>
              <hr />
              <form className="create-submilestone-task-form" onSubmit={this.handleCreateTaskSubmit}>
                <input type="text" onChange={this.handleTaskNameChange} value={this.state.taskName} placeholder="New Task" />
                <input type="submit" value="Create Task" />
              </form>
            </div>
          </Modal>

        </div>
        {expandedContent}
        {taskItems}
      </div>
    );
  }
}

export default MilestoneItem;
