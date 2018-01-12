import React from 'react';

import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TaskActivityItem from './TaskActivityItem.jsx';
import { padZeroes } from '../../helper_functions.js';



class TaskActivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    }
  }

  onStartDateChange(date) {
    this.setState({ startDate: date })
  }

  render() {
    let datedTaskActivities = {};

    this.props.taskActivities.forEach((taskActivity) => {
      if (!datedTaskActivities[taskActivity.date_added]) {
        datedTaskActivities[taskActivity.date_added] = []
      }

      datedTaskActivities[taskActivity.date_added].push(taskActivity);
    });

    let taskActivityComponents = Object.keys(datedTaskActivities).map((date, idx) => {
      return (
        <div className="date-task-activity-block" key={date + idx}>
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


    let datePicker = (
      <div>
        <span className="date-selector">
          <label>Start Date</label>
          <DayPickerInput />
        </span>
        <span className="date-selector">
          <label>End Date</label>
          <DayPickerInput />
        </span>
      </div>
      )

    return (
      <div className="workstation-task-activities">
        {datePicker}
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
