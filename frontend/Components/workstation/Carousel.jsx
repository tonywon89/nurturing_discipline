import React from 'react';
import CarouselCircle from './CarouselCircle.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intervalId: null
    }
  }

  componentDidMount() {
    if (!this.state.intervalId && this.props.workstation.carouselCycleOn) {
      const intervalId = setInterval(() => {
        this.props.increaseCarouselIndex();
      }, 3000);
      this.setState({ intervalId: intervalId})
    } else if (!this.props.workstation.carouselCycleOn && this.state.intervalId) {
      clearInterval(this.state.intervalId)
      this.setState({ intervalId: null})
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  handleToggleClick(event) {
    this.props.toggleCarouselCycle();

    if (this.state.intervalId !== null) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null })

    } else {
      const intervalId = setInterval(() => {
        this.props.increaseCarouselIndex();
      }, 3000);
      this.setState({ intervalId: intervalId})
    }
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

    let controls = null;

    if (convictions.length > 0) {
      controls = (
        <div>
          <div className="carousel-caret-left" onClick={this.props.decreaseCarouselIndex}><i className="fa fa-chevron-left"></i></div>
          <div  className="carousel-caret-right" onClick={this.props.increaseCarouselIndex}><i className="fa fa-chevron-right"></i></div>
          <div className="carousel-circles">
            {carouselCircles}
          </div>
          <div onClick={this.handleToggleClick.bind(this)} className="carousel-play-pause-button">
            {toggleButton}
          </div>
        </div>
      );
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

        {controls}

      </div>
    );
  }
}

export default Carousel;
