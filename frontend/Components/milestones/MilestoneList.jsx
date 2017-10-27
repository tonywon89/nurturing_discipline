import React from 'react';

import MilestoneItem from './MilestoneItem.jsx';

class MilestoneList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentValue: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchMilestones();
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.contentValue === "") {
      alert("Please enter a value");
      return;
    }

    this.props.createMilestone(this.state);
  }

  handleContentChange(event) {
    this.setState({ contentValue: event.target.value })
  }
  render() {
    // console..log(test);
    return (
      <div className="milestone-container">
        <h3>Milestones</h3>
        <h5>The landposts of your progress</h5>

        <div className="milestone-list">
          {this.props.milestones.map((milestone, idx) => {
            console.log(milestone);
            return (<MilestoneItem key={milestone.id} milestone={milestone} parent={true} createSubMilestone={this.props.createSubMilestone} />);
          }

          )}
        </div>

        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="New Milestone" onChange={this.handleContentChange} value={this.state.contentValue}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default MilestoneList;
