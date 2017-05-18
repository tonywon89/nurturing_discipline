import { createStore, applyMiddleware } from 'redux';
import RootReducer from './reducers/root_reducer.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const defaultState = {
  convictions: []
}

let configureStore = (preloadedState = defaultState) => (
    createStore(
        RootReducer,
        preloadedState,
        applyMiddleware(thunk, logger)
      )
);

export default configureStore;
