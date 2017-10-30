import React from 'react';

class TaskItem extends React.Component {
  render() {
    return (
      <div className="task-item">
        {this.props.task.name}
      </div>
    );
  }
}

export default TaskItem;
