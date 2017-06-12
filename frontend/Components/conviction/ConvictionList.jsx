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
      <div>
        <ul>
          {convictions.map((conviction, idx) => (
            <ConvictionItem key={idx} deleteConviction={deleteConviction} conviction={conviction} editConviction={editConviction} csrfToken={csrfToken}/>
            )
          )}
        </ul>
        <button onClick={this.fetch.bind(this)}>Fetch Convictions</button>
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
