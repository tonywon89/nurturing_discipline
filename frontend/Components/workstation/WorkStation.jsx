import React from 'react';

import Carousel from './Carousel.jsx';
import TaskDropdown from './TaskDropdown.jsx';

class WorkStation extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillReceiveProps(newProps) {

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

  render() {
    let taskOptions = <span>You currently have no tasks</span>

    if (this.props.tasks.length > 0) {
      taskOptions =  <TaskDropdown tasks={this.props.tasks} selectedTask={this.props.workstation.selectedTask} selectTask={this.props.selectTask}/>
    }

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
        </div>

      </div>

    );
  }
}

export default WorkStation;
