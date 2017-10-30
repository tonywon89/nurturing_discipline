import React from 'react';

class TaskItem extends React.Component {
  handleDeleteClick(event) {
    const data = {
      id: this.props.task.id,
    }

    this.props.deleteTask(data);
  }

  render() {
    return (
      <div className="task-item">
        {this.props.task.name}
        <i onClick={this.handleDeleteClick.bind(this)} className="fa fa-trash-o" />
      </div>
    );
  }
}

export default TaskItem;

