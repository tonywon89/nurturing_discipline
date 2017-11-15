import React from 'react';

class TaskDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownVisible: false,
      selected: props.selected
    }

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  select(task) {
    this.props.selectTask(task, this.props.selectedTask);
  }

  show() {
    if (this.state.dropdownVisible === false) {
      this.setState({ dropdownVisible: true });
      document.addEventListener("click", this.hide);
    }
  }

  hide() {
    this.setState({ dropdownVisible: false });
    document.removeEventListener("click", this.hide);
  }

  render() {
    const self = this;
    const tasks = this.props.tasks.map((task, idx) => {
      return (<div onClick={this.select.bind(self, task)} key={task.id}>{task.name}</div>)
    });

    return (
      <div className={"dropdown-container" + (this.state.dropdownVisible ? " show" : "")}>
        <div>
          <div className={"dropdown-display" + (this.state.dropdownVisible ? " clicked": "")} onClick={this.show.bind(this)}>


            <span>{this.props.selectedTask.name}</span>
            <i className="fa fa-angle-down"></i>
          </div>

          <div className="dropdown-list">
            {tasks}
          </div>
        </div>

      </div>
    )
  }
}


export default TaskDropdown;
