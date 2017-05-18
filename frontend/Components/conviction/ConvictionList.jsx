import React from 'react';

const ConvictionList = (props) => {
  console.log(props);
  return (

    <div>
      <ul>
        {props.convictions.map((conviction, idx) => <li key={idx}>{conviction.title}</li>)}
      </ul>

      <form onSubmit={props.addConviction}>
        <label>Add Conviction</label>
        <input type="text" name="conviction-title" placeholder="conviction" />
        <input type="submit" value="Add Conviction" />
      </form>
    </div>
  )
}

export default ConvictionList;
