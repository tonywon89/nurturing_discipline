import React from 'react';
import Modal from 'react-modal';

class ConvictionItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.conviction.id,
      title: props.conviction.title,
      detailed_description: props.conviction.detailed_description,

      modalIsOpen: false
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  delete(event) {
    event.preventDefault();
    this.props.deleteConviction(this.props.conviction.id);
  }

  edit(event) {
    event.preventDefault();
    this.openModal();
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ detailed_description: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.editConviction(this.state);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    const conviction = this.props.conviction;

    return (
      <li className="conviction-item">

        <div>
          <a className="edit-conviction-button" onClick={this.delete.bind(this)}><i className="fa fa-times"></i></a>
          <a className="delete-conviction-button" onClick={this.edit.bind(this)}><i  className="fa fa-pencil"></i></a>
        </div>

        <div>
          <b className="conviction-title">{conviction.title}</b>
          <p className="conviction-detail">{conviction.detailed_description}</p>
        </div>


        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className={{
              base: "modal-content",
              afterOpen: "modal-content",
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
              <h5>Edit Conviction</h5><br/>
              <form onSubmit={this.handleSubmit}>
                <input type="hidden" name="_csrf" value={this.props.csrfToken}/>
                <input type="text" name="conviction_title" placeholder="Conviction Title" value={this.state.title} onChange={this.handleTitleChange}/><br />
                <textarea name="conviction_description" value={this.state.detailed_description} onChange={this.handleDescriptionChange}/> <br/>
                <input type="submit" value="Submit" />
              </form>
            </div>
          </Modal>
      </li>

      )
  }
}

export default ConvictionItem;
