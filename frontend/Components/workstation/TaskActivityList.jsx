import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';

import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import TaskActivityItem from './TaskActivityItem.jsx';
import { padZeroes } from '../../helper_functions.js';

import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

import 'moment/locale/it';

class TaskActivityList extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    var today = new Date();

    this.state = {
      from: new Date(today.setMonth(today.getMonth() - 1)),
      to: new Date(),
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  focusTo() {
    // Focus to `to` field. A timeout is required here because the overlays
    // already set timeouts to work well with input fields
    this.timeout = setTimeout(() => this.to.getInput().focus(), 0);
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    this.setState({ from }, () => {
      if (!this.state.to) {
        this.focusTo();
      }
    })
  }

  handleToChange(to) {
    this.setState({ to });
  }

  handleSubmit(event) {
    event.preventDefault();

    alert("Hello");
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

    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    let datePicker = (
      <div className="date-selector-container">
        <span className="date-selector">
          <label>Start Date</label>
          <DayPickerInput
            value={from}
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            onDayChange={this.handleFromChange}
            placeholder="Select a start date"
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { after: new Date() },
              toMonth: to,
              // modifiers,
              numberOfMonths: 1,
            }}
          />
        </span>
        <span className="date-selector">
          <label>End Date</label>
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { after: new Date() },
              // modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
            }}
            onDayChange={this.handleToChange}
            placeholder="Select a end date"
          />
        </span>
        <span>
          <button className="task-activities-fetch-button" onClick={this.handleSubmit.bind(this)}>Get Task Activities</button>
        </span>
      </div>
      )

    return (
      <div className="workstation-task-activities">
        <h4>Completed Task History</h4>
        {datePicker}
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
