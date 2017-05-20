import { connect } from 'react-redux';

import {
  createConviction,
  fetchConvictions,
  deleteConviction
} from '../../actions/conviction_actions.js';

import ConvictionList from './ConvictionList.jsx';

const mapStateToProps = state => ({
  convictions: state.convictions
});

const mapDispatchToProps = dispatch => ({
  createConviction: (event) => {
    event.preventDefault();
    const data = $('form').serialize();
    createConviction(data)(dispatch);
  },
  receiveConvictions: () => {
    event.preventDefault();
    fetchConvictions()
  },
  deleteConviction: (convictionId) => {
    // console.log(convictionId);
    deleteConviction(convictionId)(dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvictionList);
