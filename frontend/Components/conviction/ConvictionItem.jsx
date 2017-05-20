import React from 'react';

class ConvictionItem extends React.Component {
  constructor(props) {
    super(props);

  }

  delete(event) {
    event.preventDefault();
    this.props.deleteConviction(this.props.conviction.id);
  }

  render() {
    const conviction = this.props.conviction;

    return (
      <li className="convictionTitle">
        <b>{conviction.title}</b>
        <ul>
          <li className="convictionDetail">{conviction.detailed_description}</li>
        </ul>
        <button onClick={this.delete.bind(this)}>Delete</button>
        <hr />
      </li>
      )
  }
}

export default ConvictionItem;
