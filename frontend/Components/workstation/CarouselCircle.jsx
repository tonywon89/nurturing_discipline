import React from 'react';

class CarouselCircle extends React.Component {
  handleClick(event) {
    this.props.handleCircleClick(event);
    this.props.setCarouselIndex(this.props.index)
  }

  render() {
    const { currentIndex, index } = this.props;

    return (
      <div className={"carousel-circle" + (currentIndex === index ? " active" : "")} onClick={this.handleClick.bind(this)}></div>
    )
  }
}

export default CarouselCircle;
