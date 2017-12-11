import React from 'react';

import { Doughnut } from 'react-chartjs-2';

import ColorGenerator from 'color-generator';

class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
  }

  componentWillReceiveProps(newProps) {
    let labels = [];
    let dataObject = {};

    newProps.taskActivities.forEach((taskActivity) => {
      if (!labels.includes(taskActivity._task.name)) {
        labels.push(taskActivity._task.name);
      }

      if (!dataObject[taskActivity._task.name]) {
        dataObject[taskActivity._task.name] = {
          timeAmount: 0,
          // backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16),
          backgroundColor: ColorGenerator().hexString(),
          hoverBackgroundColor: ColorGenerator().hexString(),
        };
      }

      dataObject[taskActivity._task.name]['timeAmount'] += taskActivity.timeAmount;
    })

    let dataArr = [];
    let backgroundColorArr = [];
    let hoverBackgroundColorArr = [];

    Object.keys(dataObject).forEach((key) => {;
      dataArr.push(dataObject[key]['timeAmount']);
      backgroundColorArr.push(dataObject[key]['backgroundColor']);
      hoverBackgroundColorArr.push(dataObject[key]['hoverBackgroundColor']);
    });

    this.setState({
      data: {
        labels: labels,
        datasets: [{
          data: dataArr,
          backgroundColor: backgroundColorArr,
          hoverBackgroundColor: hoverBackgroundColorArr,
        }]
      }
    })
  }

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
        <div>
          <Doughnut
            width={500}
            height={500}
            options={{
              maintainAspectRatio: false
            }}
            data={this.state.data}
            ref='chart'
          />
        </div>
      </div>
    );
  }
}

export default Stats;


