import React from 'react';
import Modal from 'react-modal';
import ConvictionItem from './ConvictionItem.jsx'

class ConvictionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.props);
    this.props.createConviction(event);
    this.setState({modalIsOpen: false});
  }

  fetch(event) {
    event.preventDefault();
    const userId = this.props.authentication.currentUser.id;
    this.props.fetchConvictions(userId);
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
    const { convictions, createConviction, deleteConviction, editConviction, fetchConvictions, authentication, csrfToken } = this.props;

    if (!authentication.currentUser) {
      return <div></div>;
    }

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
              <ConvictionItem key={idx} deleteConviction={deleteConviction} conviction={conviction} editConviction={editConviction} csrfToken={csrfToken}/>
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
              <h5>Create Conviction</h5><br/>
              <form onSubmit={this.handleSubmit}>
                <input type="hidden" name="_csrf" value={this.props.csrfToken}/>
                <input type="text" name="conviction_title" placeholder="Conviction Title" /><br />
                <textarea name="conviction_description"/> <br/>
                <input type="submit" value="Add Conviction" />
              </form>
            </div>
          </Modal>
      </div>
    );
  }
}

export default ConvictionList;
