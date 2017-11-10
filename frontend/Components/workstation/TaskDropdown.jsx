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

  componentWillReceiveProps(newProps) {
    this.setState({ selected: newProps.selected })
  }

  select(task) {
    this.setState({ selected: task })
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

    console.log(this.state.dropdownVisible);
    return (
      <div className={"dropdown-container" + (this.state.dropdownVisible ? " show" : "")}>
        <div className={"dropdown-display" + (this.state.dropdownVisible ? " clicked": "")} onClick={this.show.bind(this)}>


          <span>{this.state.selected.name}</span>
          <i className="fa fa-angle-down"></i>
        </div>

        <div className="dropdown-list">
          {tasks}
        </div>
      </div>
    )
  }
}


export default TaskDropdown;
