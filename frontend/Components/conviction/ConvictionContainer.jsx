import { connect } from 'react-redux';

import {
  createConviction,
  fetchConvictions,
  deleteConviction,
  editConviction,
} from '../../actions/conviction_actions.js';

import ConvictionList from './ConvictionList.jsx';

const mapStateToProps = state => ({
  convictions: state.convictions,
  authentication: state.authentication,
  csrfToken: state.csrfToken
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
    deleteConviction(convictionId)(dispatch)
  },

  editConviction: (data) => {
    editConviction(data)(dispatch);
  },

  fetchConvictions: (userId) => {
    fetchConvictions(userId)(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvictionList);
