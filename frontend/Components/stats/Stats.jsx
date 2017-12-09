import React from 'react';

class Stats extends React.Component {
  componentDidMount() {
    this.props.fetchTaskActivities();
  }

  render() {
    return (
      <div className="stats-body">
        <h3>Discipline Stats</h3>
        <div className="stats-task-activities-list">
          {this.props.taskActivities.map((taskActivity) => {
            return (<div key={taskActivity.id}>{taskActivity._task.name}</div>)
          })}
        </div>
      </div>
    );
  }
}

export default Stats;
