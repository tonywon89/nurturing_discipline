import React from 'react';

import Carousel from './Carousel.jsx';

class WorkStation extends React.Component {


  componentDidMount() {
    const userId = this.props.authentication.currentUser.id;
    this.props.fetchConvictions(userId);
  }

  render() {


    return (
      <div className="workstation-container">
        <Carousel convictions={this.props.convictions}/>
      </div>
    );
  }
}

export default WorkStation;
