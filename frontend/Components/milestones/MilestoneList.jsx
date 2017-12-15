import React from 'react';
import Modal from 'react-modal';

import MilestoneItem from './MilestoneItem.jsx';

class MilestoneList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentValue: "",
      selectedOption: 'timed',
      hours: "",
      minutes: "",
      count: "",
      modalIsOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleNumberChange=this.handleNumberChange.bind(this);
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

    if (this.state.selectedOption === "timed" && this.state.hours === "" && this.state.minutes === "") {
      alert("Please enter either hours or minutes or both");
      return;
    }

    if (this.state.selectedOption === "count" && this.state.count === "") {
      alert("Please enter a count for your milestone");
      return;
    }

    const data = {
      contentValue: this.state.contentValue,
      selectedOption: this.state.selectedOption,
      hours: this.state.hours === "" ? 0 : this.state.hours,
      minutes: this.state.minutes === "" ? 0 : this.state.minutes,
      count: this.state.count,
    }

    this.props.createMilestone(data);
    this.closeModal();
  }

  handleContentChange(event) {
    this.setState({ contentValue: event.target.value })
  }

  handleNumberChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  openModal(event) {
    event.preventDefault();

    this.setState({
      modalIsOpen: true,
    })
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      contentValue: "",
    })
  }

  handleRadioClick(event) {
    this.setState({
      selectedOption: event.target.value
    });
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

    let createButton;

    if (this.props.milestones.milestones.length > 0) {
      createButton = (
        <div className="clearfix">
          <button className="create-milestone-button" onClick={this.openModal}><i className="fa fa-plus"></i>
          </button>
        </div>
      );
    } else {
      createButton = <span className="milestone-no-milestones">No Milestones. Click <a onClick={this.openModal}>here</a> to make one</span>
    }

    return (
      <div className="milestone-container">
        <h3>Milestones</h3>
        <h5>The marks of your progress</h5>

        {createButton}

        <div className="milestone-list">
          {this.props.milestones.milestones.map((milestone, idx) => {
            return (
              <MilestoneItem
                key={milestone.id}
                milestoneModal={this.props.milestones.milestoneModal}
                milestone={milestone}
                isParent={milestone.sub_milestones && milestone.sub_milestones.length > 0 ? true : false }
                createSubMilestone={this.props.createSubMilestone}
                updateMilestone={this.props.updateMilestone}
                deleteMilestone={this.props.deleteMilestone}
                createTask={this.props.createTask}
                updateTask={this.props.updateTask}
                deleteTask={this.props.deleteTask}

                />
              );
          })}
        </div>

          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className={{
              base: "modal-content",
              afterOpen: "milestone-form",
              beforeClose: "modal-content"
            }}
            overlayClassName={{
              base: "modal-overlay",
              afterOpen: "modal-overlay",
              beforeClose: "modal-overlay"
            }}
            contentLabel="Milestone Modal"
          >
          <div>
            <div className="clearfix">
              <button className="modal-close" onClick={this.closeModal}><i className="fa fa-times"></i></button>
            </div>

            <h5 style={{ marginBottom: "1em" }}>New Milestone</h5>

            <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="New Milestone" onChange={this.handleContentChange} value={this.state.contentValue}/>
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

              <input type="submit" value="Submit" />
            </form>
          </div>
        </Modal>



      </div>
    )
  }
}

export default MilestoneList;
