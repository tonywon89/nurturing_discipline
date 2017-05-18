import React from 'react';

const ConvictionList = ({ convictions, addConviction }) => {
  return (

    <div>
      <ul>
        {convictions.map((conviction, idx) => <li key={idx}>{conviction.title}</li>)}
      </ul>

      <form onSubmit={addConviction}>
        <label>Add Conviction</label>
        <input type="text" name="conviction-title" placeholder="conviction" />
        <input type="submit" value="Add Conviction" />
      </form>
    </div>
  )
}

export default ConvictionList;
