import { connect } from 'react-redux';

import WorkStation from './WorkStation.jsx';

import {
  fetchConvictions,
} from '../../actions/conviction_actions.js';

import {
  fetchTasks,
  selectTask,
  startTaskTimer,
  pingTaskTimer,
} from '../../actions/task_actions.js'

import {
  increaseCarouselIndex,
  decreaseCarouselIndex,
  setCarouselIndex,
  toggleCarouselCycle,
} from '../../actions/workstation_actions.js';

const mapStateToProps = state => ({
  convictions: state.convictions,
  authentication: state.authentication,
  workstation: state.workstation,
  tasks: state.tasks,
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
  },

  toggleCarouselCycle: () => {
    toggleCarouselCycle()(dispatch);
  },

  fetchTasks: () => {
    fetchTasks()(dispatch);
  },

  selectTask: (selectedTask, oldSelectedTask) => {
    selectTask(selectedTask, oldSelectedTask)(dispatch)
  },

  startTaskTimer: (selectedTask) => {
    startTaskTimer(selectedTask)(dispatch);
  },

  pingTaskTimer: () => {
    pingTaskTimer()(dispatch);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkStation)
