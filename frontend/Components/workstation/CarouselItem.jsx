import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

// const CarouselItem = ({ currentConviction }) => (


// );

class CarouselItem extends React.Component {
  render() {
    const { currentConviction } = this.props;
    return (
        <div className="carousel-content">

          <CSSTransitionGroup
                  transitionName="carousel-conviction-title-transition"
                  transitionEnterTimeout={1000}
                  // transitionLeaveTimeout={1}
                  transitionLeave={false}
                  >

            <div key={currentConviction.id} className="carousel-conviction-title">
              {currentConviction.title}
            </div>

          </CSSTransitionGroup>

          <CSSTransitionGroup
                  transitionName="carousel-conviction-detail-transition"
                  transitionEnterTimeout={1000}
                  // transitionLeaveTimeout={1}
                  transitionLeave={false}
                  >

            <div key={currentConviction.id} className="carousel-conviction-detail">
              {currentConviction.detailed_description}
            </div>

          </CSSTransitionGroup>
        </div>
    );
  }
}


export default CarouselItem;
