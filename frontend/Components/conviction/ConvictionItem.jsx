import React from 'react';
import Modal from 'react-modal';

class ConvictionItem extends React.Component {
  constructor(props) {
    super(props);
  }

  delete(event) {
    event.preventDefault();
    this.props.deleteConviction(this.props.conviction.id);
  }

  edit(event) {
    const conviction = this.props.conviction;
    event.preventDefault();
    let data = {
      id: conviction.id,
      title: conviction.title,
      detailed_description: conviction.detailed_description,
    }

    this.props.openModal(data);
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
      </li>

      )
  }
}

export default ConvictionItem;
