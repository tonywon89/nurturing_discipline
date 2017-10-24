import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeConviction: {
        title: "No Convictions yet. Make one soon!",
        detailed_description: "This is where you make the change"
      },

      numConvictions: 0
    }
  }

  render() {
    console.log(this.props);
    const carouselCircles = this.props.convictions.map((conviction, idx) => {
      return (
        <div className="carousel-circle" key={idx}></div>
      );
    })

    return (
      <div className="workstation-carousel">
        <div className="carousel-caret-left"><i className="fa fa-chevron-left"></i></div>
        <div className="carousel-content">
          <div className="carousel-conviction-title">
            {this.state.activeConviction.title}
          </div>
          <div className="carousel-conviction-detail">
            {this.state.activeConviction.detailed_description}
          </div>
        </div>
        <div className="carousel-caret-right"><i className="fa fa-chevron-right"></i></div>
        <div className="carousel-circles">
          {carouselCircles}
        </div>
      </div>
    );
  }
}

export default Carousel;
