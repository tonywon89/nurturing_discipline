import React from 'react';
import { TransitionGroup } from 'react-transition-group'

import { TweenMax } from 'gsap';

class ConvictionTitle extends React.Component {
  componentWillAppear(callback) {

    const el = this.container;
    TweenMax.fromTo(el, 1.5, {opacity: 0.01 }, { opacity: 1, onComplete: callback });
    TweenMax.fromTo(el, 1, {x: -400 }, {x: 0 });
  }

  render() {

    const { currentConviction } = this.props;
    return (

      <div key={currentConviction.id} className="carousel-conviction-title" ref={c => this.container = c}>
        {currentConviction.title}
      </div>
    );
  }
}

class ConvictionDetail extends React.Component {
  componentWillAppear(callback) {
    const el = this.container;
    TweenMax.fromTo(el, 1.5, {opacity: 0.01 }, { opacity: 1, onComplete: callback });
    TweenMax.fromTo(el, 1, {x: 400 }, {x: 0 });
  }

  render () {
    const { currentConviction } = this.props;
    return (
        <div key={currentConviction.id} className="carousel-conviction-detail" ref={c => this.container = c}>
            {currentConviction.detailed_description}
        </div>
    );
  }
}

class CarouselItem extends React.Component {
  render() {
    const { currentConviction } = this.props;
    return (
        <div className="carousel-content">

          <TransitionGroup key={currentConviction.id} >
            <ConvictionTitle currentConviction={currentConviction} />
          </TransitionGroup>

          <TransitionGroup key={currentConviction.title} >
            <ConvictionDetail currentConviction={currentConviction} />
          </TransitionGroup>
        </div>
    );
  }
}


export default CarouselItem;
