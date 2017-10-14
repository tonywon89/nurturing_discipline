import React from 'react';

import ConvictionItem from './ConvictionItem.jsx'

class ConvictionList extends React.Component {
  constructor(props) {
    super(props);
  }

  fetch(event) {
    event.preventDefault();
    const userId = this.props.authentication.currentUser.id;
    this.props.fetchConvictions(userId);
  }

  render() {
    const { convictions, createConviction, deleteConviction, editConviction, fetchConvictions, authentication, csrfToken } = this.props;

    if (!authentication.currentUser) {
      return <div></div>;
    }

    return (
      <div className="conviction-container">
        <h3>Convictions</h3>
        <h5>The reasons why you decided to change</h5>
        <ul>
          {convictions.map((conviction, idx) => (
            <ConvictionItem key={idx} deleteConviction={deleteConviction} conviction={conviction} editConviction={editConviction} csrfToken={csrfToken}/>
            )
          )}
        </ul>

        <form onSubmit={createConviction}>
          <input type="hidden" name="_csrf" value={this.props.csrfToken}/>
          <input type="text" name="conviction_title" placeholder="Conviction Title" /><br />
          <textarea name="conviction_description"/> <br/>
          <input type="submit" value="Add Conviction" />
        </form>
      </div>
    );
  }
}

export default ConvictionList;
