import React from 'react';
import Select from 'react-select';

class TaskDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: { value: props.selectedTask.id, label: props.selectedTask.name, task: props.selectedTask},
    }


    this.handleChange = this.handleChange.bind(this);
    this.select = this.select.bind(this);
  }

  componentWillReceiveProps(newProps) {

    this.setState({ selectedOption: { value: newProps.selectedTask.id, label: newProps.selectedTask.name, task: newProps.selectedTask}});
  }

  select(task) {
    this.props.selectTask(task, this.props.selectedTask);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption })
    this.select(selectedOption.task)
  }
  render() {

    // console.log(this.state.selectedOption);
    const taskOptions = this.props.tasks.map((task, idx) => {
      return { value: task.id, label: task.name, task: task }
    });

    return (
      <Select
        name="form-field-name"
        value={this.state.selectedOption.value}
        onChange={this.handleChange}
        className="task-dropdown-select-container"
        options={taskOptions}
      />
    );
  }
}


export default TaskDropdown;
