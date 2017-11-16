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

    this.handleSelectChange = this.handleSelectChange.bind(this);
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

  handleSelectChange(value) {
    this.setState({
      activeTask: value,
    })
  }

  handleStartClick(event) {
    this.props.startTaskTimer(this.props.workstation.selectedTask);
  }

  render() {
    let taskOptions = <span>You currently have no tasks</span>

    if (this.props.tasks.length > 0) {
      taskOptions =  <TaskDropdown tasks={this.props.tasks} selectedTask={this.props.workstation.selectedTask} selectTask={this.props.selectTask}/>
    }

    let hour = Math.floor(this.props.workstation.currentTime / 3600);
    let minute = Math.floor((this.props.workstation.currentTime % 3600) / 60);
    let second = (this.props.workstation.currentTime % 3600) % 60;

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
              <i className="fa fa-play-circle" onClick={this.handleStartClick}></i>
          </div>
        </div>

        <div className="chronometer">
          {this.padZeroes(hour, 1)} : {this.padZeroes(minute, 2)} : {this.padZeroes(second, 2)}
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
