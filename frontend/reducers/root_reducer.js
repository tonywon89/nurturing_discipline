import { combineReducers } from 'redux';
import ConvictionsReducer from './convictions_reducer.js';

const RootReducer = combineReducers({
  convictions: ConvictionsReducer
});

export default RootReducer;
