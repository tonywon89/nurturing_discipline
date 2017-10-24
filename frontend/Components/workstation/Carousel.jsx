import React from 'react';
import CarouselCircle from './CarouselCircle.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { workstation, convictions } = this.props
    // The complicated equation is because javascript handles negative modulo differently
    let currentIndex = ((workstation.currentCarouselIndex % convictions.length) + convictions.length) % convictions.length;

    const carouselCircles = this.props.convictions.map((conviction, idx) => {
      return (
        <CarouselCircle key={idx} index={idx} currentIndex={currentIndex} setCarouselIndex={this.props.setCarouselIndex} />
      );
    })
    const currentConviction = (convictions.length > 0 ? convictions[currentIndex] : {
        title: "No Convictions yet. Make one soon!",
        detailed_description: "This is where you make the change"
      });

    let toggleButton;
    if (workstation.carouselCycleOn) {
      toggleButton = <i className="fa fa-pause-circle-o" aria-hidden="true"></i>
    } else {
      toggleButton = <i className="fa fa-play-circle-o" aria-hidden="true"></i>
    }

    return (
      <div className="workstation-carousel">

        <div className="carousel-content">
          <div className="carousel-conviction-title">
            {currentConviction.title}
          </div>
          <div className="carousel-conviction-detail">
            {currentConviction.detailed_description}
          </div>
        </div>

        <div className="carousel-caret-left" onClick={this.props.decreaseCarouselIndex}><i className="fa fa-chevron-left"></i></div>
        <div  className="carousel-caret-right" onClick={this.props.increaseCarouselIndex}><i className="fa fa-chevron-right"></i></div>
        <div className="carousel-circles">
          {carouselCircles}
        </div>
        <div onClick={this.props.toggleCarouselCycle} className="carousel-play-pause-button">
          {toggleButton}
        </div>
      </div>
    );
  }
}

export default Carousel;
