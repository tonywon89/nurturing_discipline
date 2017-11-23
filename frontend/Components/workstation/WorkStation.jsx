import React from 'react';

import Carousel from './Carousel.jsx';
import TaskDropdown from './TaskDropdown.jsx';

class WorkStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      intervalId: null,
    }

    // this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentDidMount() {
    const userId = this.props.authentication.currentUser.id;
    this.props.fetchConvictions(userId);
    this.props.fetchTasks();
  }


  handleStartClick(event) {
    if (this.state.intervalId !== null) {
      return;
    }
    var self = this;
    this.props.startTaskTimer(this.props.workstation.selectedTask);
    const intervalId = setInterval(function () {
      self.setState({ currentTime: self.state.currentTime + 1});
    }, 1000);

    this.setState({ intervalId: intervalId});
  }

  handleStopClick(event) {

  }

  render() {
    let taskOptions = <span>You currently have no tasks</span>

    if (this.props.tasks.length > 0) {
      taskOptions =  <TaskDropdown tasks={this.props.tasks} selectedTask={this.props.workstation.selectedTask} selectTask={this.props.selectTask}/>
    }

    let hour = Math.floor(this.state.currentTime / 3600);
    let minute = Math.floor((this.state.currentTime % 3600) / 60);
    let second = (this.state.currentTime % 3600) % 60;

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
              <i className={"fa fa-play-circle" + (this.state.intervalId !== null ? " disabled" : "") } onClick={this.handleStartClick}></i>
              <i className={"fa fa-pause-circle-o" + (this.state.intervalId === null ? " disabled" : "") }></i>
              <i className={"fa fa-stop-circle-o " + (this.state.intervalId === null ? " disabled" : "") }></i>
          </div>
          <span className="chronometer">{this.padZeroes(hour, 1)}:{this.padZeroes(minute, 2)}:{this.padZeroes(second, 2)} </span>
        </div>

      </div>

    );
  }

  padZeroes(num, size) {
    let numString = num + "";

    while (numString.length < size) {
      numString = "0" + numString;
    }

    return numString;
  }
}

export default WorkStation;
