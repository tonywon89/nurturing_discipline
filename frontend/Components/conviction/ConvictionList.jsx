import React from 'react';

import ConvictionItem from './ConvictionItem.jsx'

const ConvictionList = ({ convictions, createConviction, deleteConviction }) => {
  return (

    <div>
      <ul>
        {convictions.map((conviction, idx) => (
          <ConvictionItem key={idx} deleteConviction={deleteConviction} conviction={conviction} />
        )
        )}
      </ul>

      <form onSubmit={createConviction}>
        <input type="text" name="conviction_title" placeholder="Conviction Title" /><br />
        <textarea name="conviction_description"/> <br/>
        <input type="submit" value="Add Conviction" />
      </form>
    </div>
  )
}

export default ConvictionList;
