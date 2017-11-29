import React from 'react';

class AddSubMilestoneForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subMilestoneContent: "",
      selectedOption: 'timed',
      hours: "",
      minutes: "",
      count: "",

    }

    this.handleSubMilestoneChange = this.handleSubMilestoneChange.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleNumberChange=this.handleNumberChange.bind(this);
    this.handleSubMilestoneSubmit = this.handleSubMilestoneSubmit.bind(this);
  }

  handleSubMilestoneChange(event) {
    this.setState({ subMilestoneContent: event.target.value });
  }

  handleNumberChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleRadioClick(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  handleSubMilestoneSubmit(event) {
    event.preventDefault();

    const { milestone } = this.props;

    if (this.state.subMilestoneContent === "") {
      alert("Please enter your landmark content");
      return;
    }

    if (this.state.selectedOption === "timed" && this.state.hours === "" && this.state.minutes === "") {
      alert("Please enter either hours or minutes or both");
      return;
    }

    if (this.state.selectedOption === "count" && this.state.count === "") {
      alert("Please enter a count for your milestone");
      return;
    }

    const data = {
      subMilestoneContent: this.state.subMilestoneContent,
      parentMilestone: milestone.id,

      selectedOption: this.state.selectedOption,
      hours: this.state.hours === "" ? 0 : this.state.hours,
      minutes: this.state.minutes === "" ? 0 : this.state.minutes,
      count: this.state.count,
    }

    this.props.createSubMilestone(data);
    this.props.updateMilestone({
      id: milestone.id,
      content: milestone.content,
      expanded: true,
    });

    this.props.closeModal();
  }

  render() {
    let timedForm = (
      <div>
        <input type="number" name="hours" onChange={this.handleNumberChange} value={this.state.hours} placeholder="Hours"/>
        <input type="number" name="minutes" onChange={this.handleNumberChange} value={this.state.minutes} placeholder="Minutes"/>
      </div>
      );
    let countForm = (
      <div>
        <input type="number" name="count" onChange={this.handleNumberChange}  value={this.state.count} placeholder="Count" /> times
      </div>
    );

    return (

      <form className="create-submilestone-task-form" onSubmit={this.handleSubMilestoneSubmit}>
        <input type="text" onChange={this.handleSubMilestoneChange} value={this.state.subMilestoneContent} placeholder="New Landmark / Submilestone" />
        <p>Goal Type:</p>
       <span className="goal-type-input">
        <label>
          <input type="radio" onChange={this.handleRadioClick} value="timed" checked={this.state.selectedOption === "timed"}/>
          Timed
        </label>
        <label>
          <input type="radio" onChange={this.handleRadioClick} value="count" checked={this.state.selectedOption === "count"}/>
          Count
        </label>
      </span>
      {this.state.selectedOption === "timed" ? timedForm : null}
      {this.state.selectedOption === "count" ? countForm : null}

        <input type="submit" value="Create Landmark" />
      </form>
    );
  }
}

export default AddSubMilestoneForm;
