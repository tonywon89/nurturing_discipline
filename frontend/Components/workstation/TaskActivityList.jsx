import React from 'react';

import TaskActivityItem from './TaskActivityItem.jsx';
import { padZeroes } from '../../helper_functions.js';

class TaskActivityList extends React.Component {
  render() {

  let taskActivityComponents = this.props.taskActivities.map(function(taskActivity, idx) {
    return (<TaskActivityItem key={taskActivity._id} taskActivity={taskActivity}/>)
  });

  let totalTime = 0;
  this.props.taskActivities.forEach((taskActivity) => {
    totalTime += taskActivity.timeAmount;
  })

  let hour = Math.floor(totalTime / 3600);
  let minute = Math.floor((totalTime % 3600) / 60);
  let second = (totalTime % 3600) % 60;

  return (
      <div className="workstation-task-activities">
        <h4>Completed Task History</h4>
        {taskActivityComponents}

        <span className="task-activity-total">
          <span>Total Time Worked:   </span>
          <span className="total-time-amount">{padZeroes(hour, 1)}:{padZeroes(minute, 2)}:{padZeroes(second, 2)}</span>
        </span>
      </div>
    );
  }
}

export default TaskActivityList;
