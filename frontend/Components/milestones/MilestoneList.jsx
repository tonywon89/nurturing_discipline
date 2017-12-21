import React from 'react';
import Modal from 'react-modal';

import MilestoneItem from './MilestoneItem.jsx';
import AddMilestoneForm from './AddMilestoneForm.jsx'
import AddTaskForm from './AddTaskForm.jsx';

class MilestoneList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      addTaskForm: false,
      addMilestoneForm: false,

      milestone: null,
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  componentDidMount() {
    this.props.fetchMilestones();
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   if (this.state.contentValue === "") {
  //     alert("Please enter a value");
  //     return;
  //   }

  //   if (this.state.selectedOption === "timed" && this.state.hours === "" && this.state.minutes === "") {
  //     alert("Please enter either hours or minutes or both");
  //     return;
  //   }


  //   const data = {
  //     contentValue: this.state.contentValue,
  //     selectedOption: this.state.selectedOption, // this is always going to be "timed"
  //     hours: this.state.hours === "" ? 0 : this.state.hours,
  //     minutes: this.state.minutes === "" ? 0 : this.state.minutes,
  //   }

  //   this.props.createMilestone(data);
  //   this.closeModal();
  // }

  openTaskForm(event) {
    // event.preventDefault();

    this.setState({
      modalIsOpen: true,
      addTaskForm: true,
      addMilestoneForm: false,
    })
  }

  openMilestoneForm(event) {
    // const { milestone } =

    this.setState({
      modalIsOpen: true,
      addTaskForm: false,
      addMilestoneForm: true,
    })
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({
      milestone: null,
      modalIsOpen: false,
      addTaskForm: false,
      addMilestoneForm: false,
    })
  }

  render() {

    let timedForm = (
      <div>
        <input type="number" name="hours" onChange={this.handleNumberChange} value={this.state.hours} placeholder="Hours"/>
        <input type="number" name="minutes" onChange={this.handleNumberChange} value={this.state.minutes} placeholder="Minutes"/>
      </div>
      );

    let createButton;

    if (this.props.milestones.milestones.length > 0) {
      createButton = (
        <div className="clearfix">
          <button className="create-milestone-button" onClick={this.openMilestoneForm.bind(this, this.state.milestone)}><i className="fa fa-plus"></i>
          </button>
        </div>
      );
    } else {
      createButton = <span className="milestone-no-milestones">No Milestones. Click <a onClick={this.openMilestoneForm.bind(this, this.state.milestone)}>here</a> to make one</span>
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
                milestone={milestone}
                isParent={milestone.sub_milestones && milestone.sub_milestones.length > 0 ? true : false }
                createSubMilestone={this.props.createSubMilestone}
                updateMilestone={this.props.updateMilestone}
                deleteMilestone={this.props.deleteMilestone}
                createTask={this.props.createTask}
                updateTask={this.props.updateTask}
                deleteTask={this.props.deleteTask}
                openMilestoneForm={this.openMilestoneForm}
                openTaskForm={this.openTaskForm.bind(this, milestone)}
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
          <div className="milestone-task-modal">
            <div className="clearfix">
              <button className="modal-close" onClick={this.closeModal}><i className="fa fa-times"></i></button>
            </div>

            {this.state.addMilestoneForm ? <AddMilestoneForm milestone={this.state.milestone} closeModal={this.closeModal} createSubMilestone={this.props.createSubMilestone} updateMilestone={this.props.updateMilestone} createMilestone={this.props.createMilestone} /> : null}
            {this.state.addTaskForm ?  <AddTaskForm milestone={this.props.milestone} createTask={this.props.createTask} closeModal={this.closeModal} /> : null }
          </div>
        </Modal>
      </div>
    )
  }
}

export default MilestoneList;
