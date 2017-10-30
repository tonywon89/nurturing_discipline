import React from 'react';
import Modal from 'react-modal';

import MilestoneItem from './MilestoneItem.jsx';

class MilestoneList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentValue: "",

      modalIsOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

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
    this.closeModal();
  }

  handleContentChange(event) {
    this.setState({ contentValue: event.target.value })
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


  render() {
    return (
      <div className="milestone-container">
        <h3>Milestones</h3>
        <h5>The marks of your progress</h5>

        <div className="clearfix">
          <button className="create-milestone-button" onClick={this.openModal}><i className="fa fa-plus"></i>
          </button>
        </div>

        <div className="milestone-list">
          {this.props.milestones.map((milestone, idx) => {
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
                />
              );
          }

          )}
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
              <input type="submit" value="Submit" />
            </form>
          </div>
        </Modal>



      </div>
    )
  }
}

export default MilestoneList;
