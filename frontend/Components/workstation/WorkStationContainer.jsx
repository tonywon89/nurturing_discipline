import { connect } from 'react-redux';

import WorkStation from './WorkStation.jsx';

import {
  fetchConvictions,
} from '../../actions/conviction_actions.js';

import {
  increaseCarouselIndex,
  decreaseCarouselIndex,
  setCarouselIndex,
} from '../../actions/workstation_actions.js';

const mapStateToProps = state => ({
  convictions: state.convictions,
  authentication: state.authentication,
  workstation: state.workstation,
});

const mapDispatchToProps = dispatch => ({
  fetchConvictions: (userId) => {
    fetchConvictions(userId)(dispatch);
  },

  increaseCarouselIndex: () => {
    increaseCarouselIndex()(dispatch)
  },

  decreaseCarouselIndex: () => {
    decreaseCarouselIndex()(dispatch)
  },

  setCarouselIndex: (newIndex) => {
    setCarouselIndex(newIndex)(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkStation)
