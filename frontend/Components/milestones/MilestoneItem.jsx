import React from 'react';
import Modal from 'react-modal';

import TaskItem from './TaskItem.jsx';

import AddTaskForm from './AddTaskForm.jsx';
import AddSubMilestoneForm from './AddSubMilestoneForm.jsx';

class MilestoneItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      milestoneContent: props.milestone.content,
      edit: false,
      taskName: "",

      modalIsOpen: false,
      addTaskForm: false,
      addSubForm: false,

      menuOpen: false,
    }

    this.handleExpand = this.handleExpand.bind(this);

    this.handleDeleteMilestone = this.handleDeleteMilestone.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);

    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.openTaskForm = this.openTaskForm.bind(this);
    this.openSubMilestoneForm = this.openSubMilestoneForm.bind(this);
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



  handleDeleteMilestone(event) {
    if (confirm("Are you sure you want to delete this milestone? It cannot be undone!")) {
      this.props.deleteMilestone(this.props.milestone)
    }
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

  openTaskForm(event) {
    event.preventDefault();

    this.setState({
      modalIsOpen: true,
      addTaskForm: true,
      addSubForm: false,
    })
  }

  openSubMilestoneForm(event) {
    event.preventDefault();

    this.setState({
      modalIsOpen: true,
      addTaskForm: false,
      addSubForm: true,
    })
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      addTaskForm: false,
      addSubForm: false,
    })

  }

  showMenu() {
    this.setState({ menuOpen: true })
    document.addEventListener("click", this.hideMenu);
  }

  hideMenu() {
    this.setState({menuOpen: false});
    document.removeEventListener("click", this.hideMenu);
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
    let milestoneGoal = null;

    if (milestone.goalType === 'timed') {
      const hours = Math.floor(milestone.goalRemaining /  3600);
      const minutes = Math.floor(milestone.goalRemaining % 3600 / 60)
      const seconds = Math.floor(milestone.goalRemaining % 3600 % 60)
      milestoneGoal = (
        <span className="milestone-goal">{hours} hours {minutes} minutes {seconds} seconds remaining</span>
      );
    } else if (milestone.goalType === 'count') {
      milestoneGoal = (
        <span className="milestone-goal"> {milestone.goalRemaining} times remaining </span>
      );
    }

    let milestoneContent = (
      <span className="milestone-content">
        <div>
          {milestone.content}
          <i className="fa fa-pencil" onClick={this.toggleEdit}></i>
          <i onClick={this.handleDeleteMilestone} className="fa fa-trash-o"></i>
          {milestoneGoal}
        </div>
        <div>
          <i onClick={this.showMenu} className="fa fa-ellipsis-v milestone-menu-toggle"></i>
          <ul className={"milestone-menu" + (!this.state.menuOpen ? " hide" : "") } >
            <li onClick={this.openSubMilestoneForm}>Add landmark</li>
            <li onClick={this.openTaskForm}>Add Task</li>
          </ul>
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
              <h5 style={{ marginBottom: "1em" }}>Update "{this.props.milestone.content}"</h5>

              {this.state.addSubForm ? <AddSubMilestoneForm milestone={this.props.milestone} closeModal={this.closeModal} createSubMilestone={this.props.createSubMilestone} updateMilestone={this.props.updateMilestone}/> : null}
              {this.state.addTaskForm ?  <AddTaskForm milestone={this.props.milestone} createTask={this.props.createTask} closeModal={this.closeModal} /> : null }
            </div>
          </Modal>

        </div>
        {taskItems ? <div>
          <h6 className="task-header">Tasks</h6>
          {taskItems}
        </div> : null}

        {expandedContent ? <div>
          <h6 className="task-header">Landmarks</h6>
          {expandedContent}
        </div> : null}
      </div>
    );
  }
}

export default MilestoneItem;


// @TODO: Get the different states for the modal to get it working
