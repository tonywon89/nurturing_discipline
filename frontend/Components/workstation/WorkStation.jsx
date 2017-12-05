import React from 'react';

import Carousel from './Carousel.jsx';
import TaskDropdown from './TaskDropdown.jsx';
import TaskActivityList from './TaskActivityList.jsx';
import * as HelperFunctions from '../../helper_functions.js';

class WorkStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      intervalId: null,
    }

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handlePauseClick = this.handlePauseClick.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentDidMount() {
    const userId = this.props.authentication.currentUser.id;
    this.props.fetchConvictions(userId);
    this.props.fetchTasks();
    this.props.fetchTaskActivities();
    this.props.pingTaskTimer();
  }

  componentWillReceiveProps(newProps) {
    const { taskActivity, timerRunning } = newProps.workstation;

    var self = this;

    // Need this if statement to ensure that won't set new intervals everytime receive props

    let intervalId;

    // Starting for the first time
    if (this.state.intervalId === null && timerRunning === true ) {
      intervalId = setInterval(function () {
        self.setState({ currentTime: self.state.currentTime + 1});
      }, 1000);

      let newState = {intervalId: intervalId, currentTime: taskActivity.timeAmount}


      // Need this so that the current time won't reset after receiving the new time
      if (this.state.currentTime > 0) {
        newState.currentTime = this.state.currentTime;
      }

      this.setState(newState);

    } else if (timerRunning === false && taskActivity) {

      if (this.state.intervalId !== null) {
        clearInterval(this.state.intervalId);
      }

      this.setState({ intervalId: null, currentTime: taskActivity.timeAmount})
    } else if (timerRunning === false && !taskActivity) {
      if (this.state.intervalId !== null) {
        clearInterval(this.state.intervalId);
      }
      this.setState({ intervalId: null, currentTime: 0 });
    }
  }

  handleStartClick(event) {
    const { timerRunning, taskActivity, selectedTask } = this.props.workstation

    if (timerRunning) {
      return;
    }

    if (taskActivity) {
      this.props.resumeTaskTimer(taskActivity);
    } else {
      this.props.startTaskTimer(selectedTask);
    }
  }

  handleStopClick(event) {
    const { timerRunning, taskActivity } = this.props.workstation

    if (!timerRunning && !taskActivity) {
      return;
    }

    this.props.stopTaskTimer(this.props.workstation.taskActivity);
  }

  handlePauseClick(event) {
    if (this.state.intervalId === null) {
      return;
    }

    this.props.pauseTaskTimer(this.props.workstation.taskActivity);
  }

  render() {
    let taskOptions = <span>You currently have no tasks</span>

    if (this.props.tasks.length > 0) {
      taskOptions =  <TaskDropdown tasks={this.props.tasks} selectedTask={this.props.workstation.selectedTask} selectTask={this.props.selectTask}/>
    }

    let hour = Math.floor(this.state.currentTime / 3600);
    let minute = Math.floor((this.state.currentTime % 3600) / 60);
    let second = (this.state.currentTime % 3600) % 60;

    const { taskActivity, timerRunning, taskActivities } = this.props.workstation;



    return (
      <div className="workstation-container">
        <Carousel
          increaseCarouselIndex={this.props.increaseCarouselIndex}
          decreaseCarouselIndex={this.props.decreaseCarouselIndex}
          setCarouselIndex={this.props.setCarouselIndex}
          convictions={this.props.convictions}
          workstation={this.props.workstation}
          toggleCarouselCycle={this.props.toggleCarouselCycle}
        />

        <div className="active-timer">
          {taskOptions}
           <div className="timer-controls">
              <i className={"fa fa-play-circle" + (timerRunning === true ? " disabled" : "") } onClick={this.handleStartClick}></i>
              <i className={"fa fa-pause-circle-o" + (timerRunning === false ? " disabled" : "") } onClick={this.handlePauseClick}></i>
              <i className={"fa fa-stop-circle-o " + (!taskActivity ? " disabled" : "") } onClick={this.handleStopClick}></i>
          </div>
          <span className="chronometer">{HelperFunctions.padZeroes(hour, 1)}:{HelperFunctions.padZeroes(minute, 2)}:{HelperFunctions.padZeroes(second, 2)} </span>
        </div>

        <TaskActivityList taskActivities={taskActivities}/>
      </div>

    );
  }

  // padZeroes(num, size) {
  //   let numString = num + "";

  //   while (numString.length < size) {
  //     numString = "0" + numString;
  //   }

  //   return numString;
  // }
}

export default WorkStation;
