import React from 'react';

class AddMilestoneForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      selectedOption: 'timed',
      hours: "",
      minutes: "",
      count: "",

    }

    this.contentChange = this.contentChange.bind(this);

    this.handleNumberChange=this.handleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  contentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleNumberChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // handleRadioClick(event) {
  //   this.setState({
  //     selectedOption: event.target.value
  //   });
  // }

  handleSubmit(event) {
    event.preventDefault();

    const { milestone } = this.props;

    if (this.state.content === "") {
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
      content: this.state.content,
      parentMilestone: milestone ? milestone.id : null,

      selectedOption: this.state.selectedOption,
      hours: this.state.hours === "" ? 0 : this.state.hours,
      minutes: this.state.minutes === "" ? 0 : this.state.minutes,
    }

    if (data.parentMilestone) {
      this.props.createSubMilestone(data);
    } else {
      this.props.createMilestone(data);
    }

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

      <form className="create-submilestone-task-form" onSubmit={this.handleSubmit}>
        <input type="text" onChange={this.contentChange} value={this.state.content} placeholder="New Landmark / Submilestone" />
        {timedForm}

        <input type="submit" value="Create Landmark" />
      </form>
    );
  }
}

export default AddMilestoneForm;
