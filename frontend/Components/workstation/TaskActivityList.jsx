import React from 'react';

import TaskActivityItem from './TaskActivityItem.jsx';
import { padZeroes } from '../../helper_functions.js';

class TaskActivityList extends React.Component {
  render() {
    let datedTaskActivities = {};

    this.props.taskActivities.forEach((taskActivity) => {
      if (!datedTaskActivities[taskActivity.date_added]) {
        datedTaskActivities[taskActivity.date_added] = []
      }

      datedTaskActivities[taskActivity.date_added].push(taskActivity);
    });

    let taskActivityComponents = Object.keys(datedTaskActivities).map((date) => {
      return (
        <div>
          <div className="task-activity-date">{date}</div>
          <div>
            {datedTaskActivities[date].map((taskActivity) => {
              return (<TaskActivityItem key={taskActivity.id} taskActivity={taskActivity}/>)
            })}
          </div>
        </div>
      );
    })

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
