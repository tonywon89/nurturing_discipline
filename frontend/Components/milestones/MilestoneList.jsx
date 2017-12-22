import React from 'react';
import Modal from 'react-modal';

import MilestoneItem from './MilestoneItem.jsx';
import AddMilestoneForm from './AddMilestoneForm.jsx'
import AddTaskForm from './AddTaskForm.jsx';

class MilestoneList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addTaskForm: false,
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchMilestones();
  }

  afterOpenModal() {

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
          <button className="create-milestone-button" onClick={this.props.openMilestoneForm}><i className="fa fa-plus"></i>
          </button>
        </div>
      );
    } else {
      createButton = <span className="milestone-no-milestones">No Milestones. Click <a onClick={this.props.openMilestoneForm.bind(this)}>here</a> to make one</span>
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
                openMilestoneForm={this.props.openMilestoneForm}
                openTaskForm={this.props.openTaskForm}
                />
              );
          })}
        </div>

          <Modal
            isOpen={this.props.milestones.milestoneModal.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.props.closeMilestoneModal}
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
              <button className="modal-close" onClick={this.props.closeMilestoneModal}><i className="fa fa-times"></i></button>
            </div>

            {this.props.milestones.milestoneModal.milestoneForm ? <AddMilestoneForm  closeMilestoneModal={this.props.closeMilestoneModal} createSubMilestone={this.props.createSubMilestone} updateMilestone={this.props.updateMilestone} createMilestone={this.props.createMilestone} milestoneModal={this.props.milestones.milestoneModal}/> : null}
            {this.props.milestones.milestoneModal.taskForm ?  <AddTaskForm createTask={this.props.createTask} closeModal={this.props.closeMilestoneModal} milestoneModal={this.props.milestones.milestoneModal} /> : null }
          </div>
        </Modal>
      </div>
    )
  }
}

export default MilestoneList;
