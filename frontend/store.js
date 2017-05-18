import { createStore, applyMiddleware } from 'redux';
import RootReducer from './rootReducer.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as ConvictionAPIUtil from './api_utils/conviction_api_util';

let configureStore = (preloadedState = {
  convictions: []
}) => (
    createStore(
        RootReducer,
        preloadedState,
        applyMiddleware(thunk, logger)
      )
);

export default configureStore;
