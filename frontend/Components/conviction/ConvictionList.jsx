import React from 'react';

const ConvictionList = ({ convictions, createConviction }) => {
  return (

    <div>
      <ul>
        {convictions.map((conviction, idx) => (
          <li className="convictionTitle" key={idx}>
            <b>{conviction.title}</b>
            <ul>
              <li className="convictionDetail">{conviction.detailed_description}</li>
            </ul>
            <hr />
          </li>

        )
        )}
      </ul>

      <form onSubmit={createConviction}>
        <input type="text" name="conviction_title" placeholder="conviction" />
        <input type="submit" value="Add Conviction" />
      </form>
    </div>
  )
}

export default ConvictionList;
