import React from 'react';

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskName: "",
    }

    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleCreateTaskSubmit = this.handleCreateTaskSubmit.bind(this);
  }

  handleTaskNameChange(event) {
    this.setState({ taskName: event.target.value });
  }

  handleCreateTaskSubmit(event) {
    event.preventDefault();

    if (this.state.taskName === "") {
      alert("Please enter your task content");
      return;
    }

    const data = {
      name: this.state.taskName,
      milestoneId: this.props.milestoneModal.parentMilestone.id,
    }

    this.props.createTask(data);
    this.props.closeModal();
  }

  render() {
    return (
      <form className="create-submilestone-task-form" onSubmit={this.handleCreateTaskSubmit}>
        <input type="text" onChange={this.handleTaskNameChange} value={this.state.taskName} placeholder="New Task" />
        <input type="submit" value="Create Task" />
      </form>
    )
  }
}

export default AddTaskForm;
