import React from 'react';

import ConvictionItem from './ConvictionItem.jsx'

const ConvictionList = ({ convictions, createConviction, deleteConviction, editConviction }) => (
    <div>
      <ul>
        {convictions.map((conviction, idx) => (
          <ConvictionItem  key={idx} deleteConviction={deleteConviction} conviction={conviction} editConviction={editConviction} />
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

export default ConvictionList;
