import { combineReducers } from 'redux';
import ConvictionsReducer from './convictions_reducer.js';
import AuthReducer from './auth_reducer.js';
import CsrfReducer from './csrf_reducer.js';
import LoadingReducer from './loading_reducer.js';
import WorkStationReducer from './workstation_reducer.js';
import MilestonesReducer from './milestones_reducer.js';
import TasksReducer from './task_reducer.js';

const RootReducer = combineReducers({
  convictions: ConvictionsReducer,
  authentication: AuthReducer,
  csrfToken: CsrfReducer,
  loading: LoadingReducer,
  workstation: WorkStationReducer,
  milestones: MilestonesReducer,
  tasks: TasksReducer,
});

export default RootReducer;
