import React from 'react';
import { TransitionGroup } from 'react-transition-group'
import { withRouter } from 'react-router';

import { TweenMax } from 'gsap';

class ConvictionTitle extends React.Component {
  componentWillAppear(callback) {

    const el = this.container;
    TweenMax.fromTo(el, 1.5, {opacity: 0.01 }, { opacity: 1, onComplete: callback });
    TweenMax.fromTo(el, 1, {x: -400 }, {x: 0 });
  }

  render() {
    const { currentConviction } = this.props;
    if (currentConviction.id) {
      return (
        <div key={currentConviction.id} className="carousel-conviction-title" ref={c => this.container = c}>
          {currentConviction.title}
        </div>
      );

    } else {
      return (
        <div className="carousel-conviction-title" ref={c => this.container = c}>
           No Convictions yet.
        </div>
      )
    }
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
    if (currentConviction.id) {

      return (
          <div key={currentConviction.id} className="carousel-conviction-detail" ref={c => this.container = c}>
              {currentConviction.detailed_description}
          </div>
      );
    } else {
      return (
        <div className="carousel-conviction-detail" ref={c => this.container = c}>
          Click <a onClick={this.props.handleConvictionLinkClick.bind(this)}>here</a> to make some
        </div>
      );
    }
  }
}

class CarouselItem extends React.Component {
  handleConvictionLinkClick(event) {
    event.preventDefault();

    this.props.history.push('convictions')
  }

  render() {
    const { currentConviction } = this.props;
    return (
        <div className="carousel-content">

          <TransitionGroup key={currentConviction.id} >
            <ConvictionTitle currentConviction={currentConviction} />
          </TransitionGroup>

          <TransitionGroup key={currentConviction.title} >
            <ConvictionDetail currentConviction={currentConviction} handleConvictionLinkClick={this.handleConvictionLinkClick.bind(this)} />
          </TransitionGroup>
        </div>
    );
  }
}


export default withRouter(CarouselItem);
