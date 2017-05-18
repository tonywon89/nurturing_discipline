import { connect } from 'react-redux';
import { addConviction, fetchConvictions } from '../../actions/conviction_actions.js';
import ConvictionList from './ConvictionList.jsx';

const mapStateToProps = state => ({
  convictions: state.convictions
});

const mapDispatchToProps = dispatch => ({
  addConviction: (event) => {
    event.preventDefault();
    dispatch(addConviction(event.target.querySelector('input').value))
  },
  receiveConvictions: () => {
    event.preventDefault();
    fetchConvictions()
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvictionList);
