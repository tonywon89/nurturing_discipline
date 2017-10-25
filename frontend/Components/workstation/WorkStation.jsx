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
        <Carousel
          increaseCarouselIndex={this.props.increaseCarouselIndex}
          decreaseCarouselIndex={this.props.decreaseCarouselIndex}
          setCarouselIndex={this.props.setCarouselIndex}
          convictions={this.props.convictions}
          workstation={this.props.workstation}
          toggleCarouselCycle={this.props.toggleCarouselCycle}/>
      </div>
    );
  }
}

export default WorkStation;
