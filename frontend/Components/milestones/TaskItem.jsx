import React from 'react';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      name: props.task.name
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDeleteClick(event) {
    const data = {
      id: this.props.task.id,
    }

    this.props.deleteTask(data);
  }

  toggleEdit(event) {
    this.setState({ edit: !this.state.edit });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      id: this.props.task.id,
      name: this.state.name,
    }

    this.props.updateTask(data);
    this.setState({ edit: false});
  }

  render() {
    let taskContent = (
        <div>
          {this.state.name}
          <i className="fa fa-pencil" onClick={this.toggleEdit}></i>
          <i onClick={this.handleDeleteClick.bind(this)} className="fa fa-trash-o" />
        </div>
    );

    if (this.state.edit) {
      taskContent = (
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleNameChange} value={this.state.name} />
          <input type="submit" value="Save" />
          <i className="fa fa-times" onClick={this.toggleEdit} ></i>
        </form>
      );
    }

    return (
      <div className="task-item">
        {taskContent}
      </div>

    );
  }
}

export default TaskItem;

