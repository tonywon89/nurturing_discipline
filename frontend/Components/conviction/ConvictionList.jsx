import React from 'react';

const ConvictionList = ({ convictions, createConviction }) => {
  return (

    <div>
      <ul>
        {convictions.map((conviction, idx) => <li key={idx}>{conviction.title}</li>)}
      </ul>

      <form onSubmit={createConviction}>
        <input type="text" name="conviction_title" placeholder="conviction" />
        <input type="submit" value="Add Conviction" />
      </form>
    </div>
  )
}

export default ConvictionList;
