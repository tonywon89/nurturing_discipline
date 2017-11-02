import React from 'react';

import Carousel from './Carousel.jsx';
import Select from 'react-select';

class WorkStation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTask: this.props.tasks.length > 0 ? { value: this.props.tasks[0].id, label: this.props.tasks[0].name } : null,
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tasks.length > 0) {
      if (this.state.activeTask === null) {
        this.setState({
          activeTask: { value: newProps.tasks[0].id, label: newProps.tasks[0].name }
        });
      }
    }
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

    taskOptions = this.props.tasks.map((task, idx) => {
      return (
    //     <div key={task.id} >{task.name}</div>
        {value: task.id, label: task.name}
      );
    })

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
          <Select
            value={this.state.activeTask}
            name="timer-task-dropdown"
            options={taskOptions}
            onChange={this.handleSelectChange}
          />

        </div>

      </div>

    );
  }
}

export default WorkStation;
