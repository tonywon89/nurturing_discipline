import React from 'react';
import Modal from 'react-modal';
import ConvictionItem from './ConvictionItem.jsx'

class ConvictionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      detailed_description: '',

      modalIsOpen: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const userId = this.props.authentication.currentUser.id;
    this.props.fetchConvictions(userId);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.id) {
      this.props.createConviction(this.state);
    } else {
      this.props.editConviction(this.state);
    }
    this.closeModal();
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ detailed_description: event.target.value });
  }

  openModal(data = { id: "", title: "", detailed_description: ""}) {

    this.setState({
      modalIsOpen: true,

      id: data.id,
      title: data.title,
      detailed_description: data.detailed_description

    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      id: "",
      title: "",
      detailed_description: "",
      modalIsOpen: false,
    });
  }

  render() {
    const { convictions, createConviction, deleteConviction, editConviction, fetchConvictions, authentication, csrfToken } = this.props;

    return (
      <div>
        <div className="conviction-container ">
          <h3>Convictions</h3>
          <h5>The reasons why you decided to change</h5>
          <div className="clearfix">
            <button className="create-conviction-button" onClick={this.openModal}><i className="fa fa-plus"></i>
            </button>
          </div>

          <ul>
            {convictions.map((conviction, idx) => (
              <ConvictionItem key={idx} deleteConviction={deleteConviction} conviction={conviction} editConviction={editConviction} csrfToken={csrfToken}
                openModal={this.openModal} afterOpenModal={this.afterOpenModal} closeModal={this.closeModal} handleSubmit={this.handleSubmit}/>
              )
            )}
          </ul>
        </div>

        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className={{
              base: "modal-content",
              afterOpen: "conviction-form",
              beforeClose: "modal-content"
            }}
            overlayClassName={{
              base: "modal-overlay",
              afterOpen: "modal-overlay",
              beforeClose: "modal-overlay"
            }}
            contentLabel="Auth Modal"
          >
            <div>
              <div className="clearfix">
                <button className="modal-close" onClick={this.closeModal}><i className="fa fa-times"></i></button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <input type="hidden" name="_csrf" value={this.props.csrfToken}/>
                <div className="input-field">
                  <input type="text" name="conviction-title" value={this.state.title} onChange={this.handleTitleChange} required spellCheck="false"/>
                  <span className="floating-label">What is your why?</span>
                </div>
                <textarea name="conviction-description" value={this.state.detailed_description} onChange={this.handleDescriptionChange} placeholder="Why are you convicted about this?" spellCheck="false"/>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </Modal>
      </div>
    );
  }
}

export default ConvictionList;
