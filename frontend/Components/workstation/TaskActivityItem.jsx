import React from 'react';
import { padZeroes } from '../../helper_functions.js';

class TaskActivityItem extends React.Component {
  render() {
    const { taskActivity } = this.props;

    let hour = Math.floor(taskActivity.timeAmount/ 3600);
    let minute = Math.floor((taskActivity.timeAmount% 3600) / 60);
    let second = (taskActivity.timeAmount% 3600) % 60;

    return (
      <div className="task-activity-item">

        <span>
            <span className="task-activity-name">{taskActivity._task.name}</span>
            <span className="task-milestone-content">(Milestone: {taskActivity._milestone.content})
          </span>
        </span>
        <span>{padZeroes(hour, 1)}:{padZeroes(minute, 2)}:{padZeroes(second, 2)}</span>
      </div>
    );
  }
}

export default TaskActivityItem;
