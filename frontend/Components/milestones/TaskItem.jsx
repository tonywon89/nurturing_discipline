import React from 'react';

class TaskItem extends React.Component {
  render() {
    return (
      <div className="task-item">
        General Task for "{this.props.parentMilestone.content}"
      </div>
    );
  }
}

export default TaskItem;
