import { combineReducers } from 'redux';
import ConvictionsReducer from './convictions_reducer.js';
import AuthReducer from './auth_reducer.js';

const RootReducer = combineReducers({
  convictions: ConvictionsReducer,
  authentication: AuthReducer
});

export default RootReducer;
