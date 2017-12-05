import React from 'react';

import TaskActivityItem from './TaskActivityItem.jsx';

class TaskActivityList extends React.Component {
  render() {

  let taskActivityComponents = this.props.taskActivities.map(function(taskActivity, idx) {
    return (<TaskActivityItem key={taskActivity._id} taskActivity={taskActivity}/>)
  });
  return (
      <div className="workstation-task-activities">
        <h4>Task Log</h4>
        {taskActivityComponents}
      </div>
    );
  }
}

export default TaskActivityList;
