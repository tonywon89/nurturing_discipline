import React from 'react';

import ConvictionItem from './ConvictionItem.jsx'

const ConvictionList = ({ convictions, createConviction, deleteConviction, editConviction, fetchConvictions, authentication }) => {

  if (!authentication.currentUser) {
    return <div></div>;
  }

  return (
    <div>
      <ul>
        {convictions.map((conviction, idx) => (
          <ConvictionItem  key={idx} deleteConviction={deleteConviction} conviction={conviction} editConviction={editConviction} />
        )
        )}
      </ul>
      <button onClick={fetchConvictions}>Fetch Convictions</button>
      <form onSubmit={createConviction}>
        <input type="text" name="conviction_title" placeholder="Conviction Title" /><br />
        <textarea name="conviction_description"/> <br/>
        <input type="submit" value="Add Conviction" />
      </form>
    </div>
  );
};



export default ConvictionList;
