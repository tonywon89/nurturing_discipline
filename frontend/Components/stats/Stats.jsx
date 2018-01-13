import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Please from 'pleasejs';
import { withRouter } from 'react-router';

import TaskActivityList from '../workstation/TaskActivityList.jsx';

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
      let labelName = taskActivity.taskName;
      if (!labels.includes(labelName)) {
        labels.push(labelName);
      }

      if (!dataObject[labelName]) {
        dataObject[labelName] = {
          timeAmount: 0,
          backgroundColor: Please.make_color({golden: true}),
        };
      }

      dataObject[labelName]['timeAmount'] += taskActivity.timeAmount;
    })

    let dataArr = [];
    let backgroundColorArr = [];
    let hoverBackgroundColorArr = [];

    Object.keys(dataObject).forEach((key) => {;
      dataArr.push(dataObject[key]['timeAmount']);
      backgroundColorArr.push(dataObject[key]['backgroundColor']);
    });

    this.setState({
      data: {
        labels: labels,
        datasets: [{
          data: dataArr,
          backgroundColor: backgroundColorArr,
          hoverBackgroundColor: '#00A000',
          hoverBorderWidth: 3,
          hoverBorderColor: 'gray',
        }]
      }
    })
  }

  componentDidMount() {
    var today = new Date();
    this.props.fetchTaskActivities({
      from: new Date(today.setMonth(today.getMonth() - 1)),
      to: new Date(),
    });
  }

  handleWorkStationLinkClick(event) {
    event.preventDefault();

    this.props.history.push('workstation');
  }

  render() {
    let stats;

    if (this.props.taskActivities.length > 0) {
      stats = (
        <div>
          <div className="stats-charts">
            <Doughnut
              width={300}
              height={300}
              options={{
                maintainAspectRatio: false,
                legend: { position: 'right'},
                title: {
                  display: true,
                  text: "Completed Tasks"
                },
                layout: {
                  padding: {
                    left: 100,
                    right: 100,
                    top: 0,
                    bottom: 0
                  }
                },
                tooltips: {
                  custom: function(tooltip) {
                    if (!tooltip) return;
                    // disable displaying the color box;
                    tooltip.displayColors = false;
                  },

                  callbacks: {
                    label: function(tooltipItem, data) {
                      let seconds = data.datasets[0].data[tooltipItem.index];
                      let hours = Math.floor(seconds / 3600);
                      let minutes = Math.floor((seconds % 3600) / 60 );
                      seconds = seconds % 3600 % 60;
                      return `${data.labels[tooltipItem.index]}:  ${hours} hrs ${minutes} min ${seconds} sec`;
                    }
                  }
                }
              }}
              data={this.state.data}
            />
          </div>
          <div className="stats-task-activities-list">
            <TaskActivityList taskActivities={this.props.taskActivities} fetchTaskActivities={this.props.fetchTaskActivities} />
          </div>
        </div>
      );
    } else {
      stats = <span className="stat-no-stats">No stats. Go <a onClick={this.handleWorkStationLinkClick.bind(this)}>here</a> to get some done </span>
    }

    return (
      <div className="stats-body">
        <h3>Discipline Stats</h3>
        {stats}
      </div>
    );
  }
}

export default withRouter(Stats);
