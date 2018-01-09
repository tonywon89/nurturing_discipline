import Workstation from '../../frontend/Components/workstation/WorkStation.jsx';
import Carousel from '../../frontend/Components/workstation/Carousel.jsx';
import CarouselItem from '../../frontend/Components/workstation/CarouselItem.jsx';
import CarouselCircle from '../../frontend/Components/workstation/CarouselCircle.jsx';
import TaskDropdown from '../../frontend/Components/workstation/TaskDropdown.jsx';

import React from 'react';
import { HashRouter } from 'react-router-dom';
import merge from 'lodash/merge'

let convictions = [];
let currentUser = { id: 1};
let authentication = { currentUser };
let tasks = [];
let defaultWorkstation = {
  currentCarouselIndex: 0,
  carouselCycleOn: true,
  selectedTask: { id: null, name: "" },
  timerRunning: false,
  taskActivity: null,
  taskActivities: [],
}

const fetchConvictions = sinon.stub();
const fetchTasks = sinon.stub();
const fetchTaskActivities = sinon.stub();
const pingTaskTimer = sinon.stub();

const startTaskTimer = sinon.stub();
const resumeTaskTimer = sinon.stub();
const pauseTaskTimer = sinon.stub();
const stopTaskTimer = sinon.stub();

const increaseCarouselIndex = sinon.stub();
const decreaseCarouselIndex = sinon.stub();
const setCarouselIndex  = sinon.stub();
const toggleCarouselCycle = sinon.stub();

const handleStartClick = spy(Workstation.WrappedComponent.prototype, 'handleStartClick');
const handlePauseClick = spy(Workstation.WrappedComponent.prototype, 'handlePauseClick');
const handleStopClick = spy(Workstation.WrappedComponent.prototype, 'handleStopClick');

describe('Workstation Component', () => {

    let workstationWrapper = shallow(
        <Workstation.WrappedComponent
          convictions={convictions}
          authentication={authentication}
          tasks={tasks}
          workstation={defaultWorkstation}
          fetchConvictions={fetchConvictions}
          fetchTasks={fetchTasks}
          fetchTaskActivities={fetchTaskActivities}
          pingTaskTimer={pingTaskTimer}
          startTaskTimer={startTaskTimer}
          resumeTaskTimer={resumeTaskTimer}
          pauseTaskTimer={pauseTaskTimer}
          stopTaskTimer={stopTaskTimer}
        />
    )

  it('displays message when there are no tasks', () => {
    expect(workstationWrapper.text()).to.contain("You don't have any tasks.");
    expect(workstationWrapper.find('.workstation-no-tasks')).to.have.length(1);
  })

  it('when there are tasks loaded, displays the chronometer and timer controls', () => {

    let tasks = [{id: 124, name: "Testing task"}, { id: 123, name: "Testing selected Task" }]
    workstationWrapper.setProps({ tasks });

    expect(workstationWrapper.text()).to.contain("0:00:00");
    expect(workstationWrapper.find(".chronometer")).to.have.length(1);
    expect(workstationWrapper.find(".active-timer")).to.have.length(1);
    expect(workstationWrapper.find(".timer-controls")).to.have.length(1);
    expect(workstationWrapper.find(TaskDropdown)).to.have.length(1);
    expect(workstationWrapper.find(Carousel)).to.have.length(1);

    //Should display two disabled buttons
    expect(workstationWrapper.find(".disabled")).to.have.length(2);
  });

  describe('handleStartClick', () => {
    it('handlesStartClick starts the task timer when clicked on the play button and it is not paused', () => {
      workstationWrapper.find('.timer-controls .fa-play-circle').simulate('click');
      expect(handleStartClick.calledOnce).to.equal(true);
      expect(startTaskTimer.calledOnce).to.equal(true);
    });

    it('handleStartClick is disabled if the timer is running', () => {
      let taskActivityWorkstation = merge({}, defaultWorkstation, { timerRunning: true,  taskActivity: {id: 123, timeAount: 123 }})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });

      workstationWrapper.find('.timer-controls .fa-play-circle').simulate('click');
      expect(startTaskTimer.calledTwice).to.equal(false);
      expect(resumeTaskTimer.calledOnce).to.equal(false);

    });

    it('handlesStartClick resumes the task timer when the timer is paused', () => {
      let taskActivityWorkstation = merge({}, defaultWorkstation, { taskActivity: {id: 123 } })
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });

      workstationWrapper.find('.timer-controls .fa-play-circle').simulate('click');
      expect(resumeTaskTimer.calledOnce).to.equal(true);
    });
  })

  describe('handlePauseClick', () =>{
    it('handlePauseClick is disabled if there is no interval', () => {
      workstationWrapper.find('.timer-controls .fa-pause-circle-o').simulate('click');
      expect(handlePauseClick.calledOnce).to.equal(true)
      expect(pauseTaskTimer.calledOnce).to.equal(false)
    });

    it('handlePauseClick executes pause task timer when there is an interval', () => {
      workstationWrapper.setState({ intervalId: 1});
      workstationWrapper.find('.timer-controls .fa-pause-circle-o').simulate('click');
      expect(pauseTaskTimer.calledOnce).to.equal(true);
      workstationWrapper.setState({ intervalId: null});
    });
  });

  describe('handleStopClick', () => {
    it('handleStopClick is disabled if the timer is not running and if there is no active task activity', () => {
      workstationWrapper.setProps({ workstation: defaultWorkstation });
      workstationWrapper.find('.timer-controls .fa-stop-circle-o').simulate('click');
      expect(handleStopClick.calledOnce).to.equal(true);
      expect(stopTaskTimer.called).to.equal(false);
    });

    it('handleStopClick stops the task the timer if the timer is running', () => {
      let taskActivityWorkstation = merge({}, defaultWorkstation, { taskActivity: {id: 123 }, timerRunning: true })
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      workstationWrapper.find('.timer-controls .fa-stop-circle-o').simulate('click');

      expect(stopTaskTimer.calledOnce).to.equal(true);
    });

    it('handleStopClick stops the task the timer if the timer is paused', () => {
      let taskActivityWorkstation = merge({}, defaultWorkstation, { taskActivity: {id: 123 }, timerRunning: false})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      workstationWrapper.find('.timer-controls .fa-stop-circle-o').simulate('click');

      expect(stopTaskTimer.calledTwice).to.equal(true);
    });
  })

  describe('Workstation componentWillReceiveProps', () =>{
    it('properly sets the intervalId when the timer is running and intervalId is null' ,() => {
      let taskActivityWorkstation = merge({}, defaultWorkstation, { taskActivity: {id: 123 }, timerRunning: true})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      expect(workstationWrapper.state().intervalId).to.not.be.equal(null)
    });

    it('sets the intervalId to null when there is a taskActivity but the timer is paused', () => {
      let taskActivityWorkstation = merge({}, defaultWorkstation, { taskActivity: {id: 123, timeAmount: 123 }, timerRunning: false})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      expect(workstationWrapper.state().intervalId).to.equal(null)
      expect(workstationWrapper.state().currentTime).to.equal(123);
    });

    it('sets the intervalId to null when there is a taskActivity but the timer is paused', () => {
      let taskActivityWorkstation = merge({}, defaultWorkstation, { taskActivity: null, timerRunning: false})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      expect(workstationWrapper.state().intervalId).to.equal(null)
      expect(workstationWrapper.state().currentTime).to.equal(0);
    });
  });
});

describe('Carousel Component', () => {
  spy(Carousel.prototype, 'componentDidMount');

  let convictions = []

  let carouselWrapper = shallow(
      <Carousel
        convictions={convictions}
        workstation={defaultWorkstation}
        increaseCarouselIndex={increaseCarouselIndex}
        decreaseCarouselIndex={decreaseCarouselIndex}
        setCarouselIndex={setCarouselIndex}
        toggleCarouselCycle={toggleCarouselCycle}
      />
  );

  it('does not show the convictions controls when there are no convictions', () => {
    expect(carouselWrapper.find('.carousel-caret-left')).to.have.length(0);
    expect(carouselWrapper.find('.carousel-caret-right')).to.have.length(0);
    expect(carouselWrapper.find('.carousel-circles')).to.have.length(0);
    expect(carouselWrapper.find('.carousel-play-pause-button')).to.have.length(0);
  });

  it('it sets the intervalId when it mounts', () => {
    expect(Carousel.prototype.componentDidMount.calledOnce).to.equal(true);
    expect(carouselWrapper.state().intervalId).to.not.equal(null);
    carouselWrapper.unmount();
  });

  convictions = [
    {id: 123, title: "Test Conviction 1", detailed_description: "Test Detailed 1"},
    {id: 124, title: "Test Conviction 2", detailed_description: "Test Detailed 2"}
  ]

  it('when the toggle carousel cycle is off, ', () => {
    let toggleCycleWorkstation = merge({}, defaultWorkstation, { carouselCycleOn: false });

    carouselWrapper = shallow(
      <Carousel
        convictions={convictions}
        workstation={toggleCycleWorkstation}
        increaseCarouselIndex={increaseCarouselIndex}
        decreaseCarouselIndex={decreaseCarouselIndex}
        setCarouselIndex={setCarouselIndex}
        toggleCarouselCycle={toggleCarouselCycle}
      />
    );

    expect(carouselWrapper.state().intervalId).to.equal(null);
  });

  it('has the toggle controls when a conviction is present', () => {
    expect(carouselWrapper.find('.carousel-caret-left')).to.have.length(1);
    expect(carouselWrapper.find('.carousel-caret-right')).to.have.length(1);
    expect(carouselWrapper.find('.carousel-circles')).to.have.length(1);
    expect(carouselWrapper.find('.carousel-play-pause-button')).to.have.length(1);
  });

  const handleLeftClick = spy(Carousel.prototype, 'handleLeftClick');
  const handleRightClick = spy(Carousel.prototype, 'handleRightClick');
  const handleToggleClick = spy(Carousel.prototype, 'handleToggleClick');

  describe('handleLeftClick', () => {
    it('calls once when it is clicked', () => {
      carouselWrapper.find('.carousel-caret-left').simulate('click');
      expect(handleLeftClick.calledOnce).to.equal(true);
      expect(decreaseCarouselIndex.calledOnce).to.equal(true);
    });
  });

  describe('handleRightClick', () => {
    it('calls once when it is clicked', () => {
      carouselWrapper.find('.carousel-caret-right').simulate('click');
      expect(handleRightClick.calledOnce).to.equal(true);
      expect(increaseCarouselIndex.calledOnce).to.equal(true);
    });
  });

  describe('handleToggleClick', () => {
    it('calls once when it is clicked', () => {
      carouselWrapper.setState({ intervalId: 1});

      carouselWrapper.find('.carousel-play-pause-button').simulate('click');
      expect(handleToggleClick.calledOnce).to.equal(true);
      expect(toggleCarouselCycle.calledOnce).to.equal(true);
      expect(carouselWrapper.state().intervalId).to.equal(null);

      // Expect the intervalId to be set already
      carouselWrapper.find('.carousel-play-pause-button').simulate('click');
      expect(handleToggleClick.calledTwice).to.equal(true);
      expect(toggleCarouselCycle.calledTwice).to.equal(true);
      expect(carouselWrapper.state().intervalId).to.not.equal(null);
    });
  });

  describe('toggle cycle button', () => {
    it('has the play button when the toggleCycle is false', () => {
      expect(carouselWrapper.find('.fa.fa-play-circle-o')).to.have.length(1);
    });

    it('has the pause button when the toggleCycle is true', () => {
      let toggleCycleWorkstation = merge({}, defaultWorkstation, { carouselCycleOn: true });
      carouselWrapper.setProps({ workstation: toggleCycleWorkstation});
      expect(carouselWrapper.find('.fa.fa-pause-circle-o')).to.have.length(1);
    })
  });

  describe('Carousel Circles', () => {
    it('Shows two circles for two convictions that are present', () => {
      expect(carouselWrapper.find(CarouselCircle)).to.have.length(2);
      expect(carouselWrapper.find(CarouselItem)).to.have.length(1);

      // The current conviction should be the one at index 0
      expect(carouselWrapper.find(CarouselItem).props().currentConviction.title).to.equal(convictions[0].title);
    });
  });

  describe('CarouselItem', () => {
    let currentConviction = { id: 123, title: 'Test Current Conviction', detailed_description: 'Test Current Detailed Description' };

    let carouselItemWrapper = mount(
      <CarouselItem.WrappedComponent
        currentConviction={currentConviction}
      />
    );

    it('displays the current conviction title and detailed description', () => {
      expect(carouselItemWrapper.find('.carousel-content')).to.have.length(1);
      expect(carouselItemWrapper.text()).to.contain(currentConviction.title);
      expect(carouselItemWrapper.text()).to.contain(currentConviction.detailed_description);
    })


    it ('displays the empty message when there is no currentConviction', () => {
      currentConviction = { id: null };
      carouselItemWrapper.setProps({ currentConviction });

      expect(carouselItemWrapper.text()).to.contain('No Convictions yet');
      expect(carouselItemWrapper.text()).to.contain('Click here to make some');
    })
  });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as workstationActions from '../../frontend/actions/workstation_actions.js';
import * as taskActions from '../../frontend/actions/task_actions.js';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore(defaultWorkstation)

describe('Workstation Actions', () => {
  beforeEach(() => {
    sinon.spy($, 'ajax')
  });

  afterEach(() => {
     $.ajax.restore();
  });

  describe('Carousel Actions', () => {
    it ('increaseCarouselIndex returns the correct action type', () => {
      store.dispatch(workstationActions.increaseCarouselIndex());
      expect(store.getActions()[0]).to.deep.equal({ type: workstationActions.INCREASE_CAROUSEL_INDEX });
    });

    it ('decreaseCarouselIndex returns the correct action type', () => {
      store.dispatch(workstationActions.decreaseCarouselIndex());
      expect(store.getActions()[1]).to.deep.equal({ type: workstationActions.DECREASE_CAROUSEL_INDEX });
    });

    it ('setCarouselIndex returns the correct action type', () => {
      store.dispatch(workstationActions.setCarouselIndex(1));
      expect(store.getActions()[2]).to.deep.equal({ type: workstationActions.SET_CAROUSEL_INDEX, newIndex: 1 });
    });

    it ('toggleCarouselIndex returns the correct action type', () => {
      store.dispatch(workstationActions.toggleCarouselCycle());
      expect(store.getActions()[3]).to.deep.equal({ type: workstationActions.TOGGLE_CAROUSEL_CYCLE });
    });
  });

  describe('Task Actions', () => {
    it('fetchTasks calls the proper GET api/tasks', () => {
      store.dispatch(taskActions.fetchTasks());

      expect($.ajax.calledOnce).to.be.true;
      assert.equal("api/tasks", $.ajax.getCall(0).args[0].url);
      assert.equal("GET", $.ajax.getCall(0).args[0].method);
      assert.equal("json", $.ajax.getCall(0).args[0].dataType);
    });

    it('selectTask calls TaskAPIUtil.stopTaskTimer and MilestoneAPIUtilupdateTask', () => {
      store.dispatch(taskActions.selectTask({id: 123}, {id: 124}));

      expect($.ajax.calledTwice).to.be.true;
      assert.equal("api/tasks/stop_task_timer", $.ajax.getCall(0).args[0].url);
      assert.equal("PATCH", $.ajax.getCall(0).args[0].method);
      assert.equal("json", $.ajax.getCall(0).args[0].dataType);

      assert.equal("api/milestones/tasks", $.ajax.getCall(1).args[0].url);
      assert.equal("PATCH", $.ajax.getCall(1).args[0].method);
      assert.equal("json", $.ajax.getCall(1).args[0].dataType);
    });

    describe('startTaskTimer', () => {
      it('startTaskTimer does not start if there is no task passed as an argument', () => {
        store.dispatch(taskActions.startTaskTimer());
        expect($.ajax.calledOnce).to.be.false
      });

      it('startTaskTimer calls POST api/taks/start_task_timer', () => {
        store.dispatch(taskActions.startTaskTimer({ id: 123}))

        expect($.ajax.calledOnce).to.be.true;
        assert.equal("api/tasks/start_timer", $.ajax.getCall(0).args[0].url);
        assert.equal("POST", $.ajax.getCall(0).args[0].method);
        assert.equal("json", $.ajax.getCall(0).args[0].dataType);
      });
    });

    it('stopTaskTimer calls the PATCH api/tasks/stop_task_timer', () => {
      store.dispatch(taskActions.stopTaskTimer());

      expect($.ajax.calledOnce).to.be.true;
      assert.equal("api/tasks/stop_task_timer", $.ajax.getCall(0).args[0].url);
      assert.equal("PATCH", $.ajax.getCall(0).args[0].method);
      assert.equal("json", $.ajax.getCall(0).args[0].dataType);
    });

    it('resumeTaskTimer calls the PATCH api/tasks/resume_task_timer', () => {
      store.dispatch(taskActions.resumeTaskTimer());

      expect($.ajax.calledOnce).to.be.true;
      assert.equal("api/tasks/resume_task_timer", $.ajax.getCall(0).args[0].url);
      assert.equal("PATCH", $.ajax.getCall(0).args[0].method);
      assert.equal("json", $.ajax.getCall(0).args[0].dataType);
    });

    it('pauseTaskTimer calls the PATCH api/tasks/pause_task_timer', () => {
      store.dispatch(taskActions.pauseTaskTimer());

      expect($.ajax.calledOnce).to.be.true;
      assert.equal("api/tasks/pause_task_timer", $.ajax.getCall(0).args[0].url);
      assert.equal("PATCH", $.ajax.getCall(0).args[0].method);
      assert.equal("json", $.ajax.getCall(0).args[0].dataType);
    });

    it('fetchTaskActivities calls the PATCH api/tasks/task_activities', () => {
      store.dispatch(taskActions.fetchTaskActivities());

      expect($.ajax.calledOnce).to.be.true;
      assert.equal("api/tasks/task_activities", $.ajax.getCall(0).args[0].url);
      assert.equal("GET", $.ajax.getCall(0).args[0].method);
      assert.equal("json", $.ajax.getCall(0).args[0].dataType);
    });
  });

});

import WorkStationReducer from '../../frontend/reducers/workstation_reducer.js';

describe('WorkstationReducer', () => {
  it('should return the initial state', () => {
    expect(WorkStationReducer(undefined, {})).to.deep.equal(defaultWorkstation);
  });


  it('should increase the current carousel index with INCREASE_CAROUSEL_INDEX', () => {
    expect(WorkStationReducer(defaultWorkstation, { type: workstationActions.INCREASE_CAROUSEL_INDEX })).to.deep.equal({
        currentCarouselIndex: 1,
        carouselCycleOn: true,
        selectedTask: { id: null, name: "" },
        timerRunning: false,
        taskActivity: null,
        taskActivities: [],
    });
  });

  it('should decrease the current carousel index with DECREASE_CAROUSEL_INDEX', () => {
    expect(WorkStationReducer(defaultWorkstation, { type: workstationActions.DECREASE_CAROUSEL_INDEX })).to.deep.equal({
        currentCarouselIndex: -1,
        carouselCycleOn: true,
        selectedTask: { id: null, name: "" },
        timerRunning: false,
        taskActivity: null,
        taskActivities: [],
    });
  });

  it('should set the current carousel index with SET_CAROUSEL_INDEX', () => {
    expect(WorkStationReducer(defaultWorkstation, { type: workstationActions.SET_CAROUSEL_INDEX,  newIndex: 5 })).to.deep.equal({
        currentCarouselIndex: 5,
        carouselCycleOn: true,
        selectedTask: { id: null, name: "" },
        timerRunning: false,
        taskActivity: null,
        taskActivities: [],
    });
  });

  let cycleOffState = WorkStationReducer(defaultWorkstation, { type: workstationActions.TOGGLE_CAROUSEL_CYCLE });

  it('should toggle the carousel cycle with TOGGLE_CAROUSEL_CYCLE to false when it is originally set to true', () => {
    expect(cycleOffState).to.deep.equal({
        currentCarouselIndex: 0,
        carouselCycleOn: false,
        selectedTask: { id: null, name: "" },
        timerRunning: false,
        taskActivity: null,
        taskActivities: [],
    });
  });

  it('should toggle the carousel cycle with TOGGLE_CAROUSEL_CYCLE to true when it is originall set to false', () => {
    expect(WorkStationReducer(cycleOffState, { type: workstationActions.TOGGLE_CAROUSEL_CYCLE })).to.deep.equal(defaultWorkstation);
  });

  let selectedTaskState = WorkStationReducer(defaultWorkstation, { type: taskActions.RECEIVE_SELECTED_TASK, selectedTask: { id: 123, name: "Test Selected Task" } })


  it('should set the selectedTask to be the selected Task', () => {
    expect(selectedTaskState).to.deep.equal({
        currentCarouselIndex: 0,
        carouselCycleOn: true,
        selectedTask: { id: 123, name: "Test Selected Task" },
        timerRunning: false,
        taskActivity: null,
        taskActivities: [],
    });
  });

  let timerStartedState = WorkStationReducer(defaultWorkstation, { type: taskActions.START_TASK_TIMER, taskActivity: { id: 123, taskName: 'Test Task Activity' } })

  it('START_TASK_TIMER should set timerRunning to true and set the taskActivity', () => {
    expect(timerStartedState).to.deep.equal({
      currentCarouselIndex: 0,
      carouselCycleOn: true,
      selectedTask: { id: null, name: "" },
      timerRunning: true,
      taskActivity: { id: 123, taskName: 'Test Task Activity' },
      taskActivities: [],
    });
  });

  describe('PING_TASK_TIMER', () => {
    it('when there is a taskActivity, sets the taskActivity and if the taskActivity is running, then set the timerRunning to true', () => {
      expect(WorkStationReducer(defaultWorkstation, { type: taskActions.PING_TASK_TIMER, taskActivity: {id: 123, taskName: 'Test Task Activity', running: true } })).to.deep.equal({
        currentCarouselIndex: 0,
        carouselCycleOn: true,
        selectedTask: { id: null, name: "" },
        timerRunning: true,
        taskActivity: { id: 123, taskName: 'Test Task Activity', running: true },
        taskActivities: [],
      });
    });

    it('When there is a taskActivity, sets the taskActivity and if the taskActivity is not running, then set the timerRunning to false', () => {
      expect(WorkStationReducer(defaultWorkstation, { type: taskActions.PING_TASK_TIMER, taskActivity: {id: 123, taskName: 'Test Task Activity', running: false } })).to.deep.equal({
        currentCarouselIndex: 0,
        carouselCycleOn: true,
        selectedTask: { id: null, name: "" },
        timerRunning: false,
        taskActivity: { id: 123, taskName: 'Test Task Activity', running: false },
        taskActivities: [],
      });
    });

    it('When there is no current taskActivity, set the taskActivity to null', () => {
      expect(WorkStationReducer(timerStartedState, { type: taskActions.PING_TASK_TIMER, taskActivity: null })).to.deep.equal(defaultWorkstation);
    });
  });

  it('PAUSE_TASK_TIMER sets the timerRunning to be false, and sets the taskActivity', () => {
    expect(WorkStationReducer(timerStartedState, { type: taskActions.PAUSE_TASK_TIMER, taskActivity: {id: 123, taskName: 'Test Task Activity' } })).to.deep.equal({
        currentCarouselIndex: 0,
        carouselCycleOn: true,
        selectedTask: { id: null, name: "" },
        timerRunning: false,
        taskActivity: { id: 123, taskName: 'Test Task Activity' },
        taskActivities: [],
    });
  });

  it('RESUME_TASK_TIMER sets the timerRunning to be true and sets the taskActivity', () => {
    expect(WorkStationReducer(timerStartedState, { type: taskActions.RESUME_TASK_TIMER, taskActivity: {id: 123, taskName: 'Test Task Activity' } })).to.deep.equal({
        currentCarouselIndex: 0,
        carouselCycleOn: true,
        selectedTask: { id: null, name: "" },
        timerRunning: true,
        taskActivity: { id: 123, taskName: 'Test Task Activity' },
        taskActivities: [],
    });
  });

  let receivedTaskActivitiesState = WorkStationReducer(defaultWorkstation, { type: taskActions.RECEIVE_TASK_ACTIVITIES, taskActivities: [{ id: 123, taskName: 'TaskActivities' }] });

  it('RECEIVE_TASK_ACTIVITIES sets the taskActivities', () => {
    expect(receivedTaskActivitiesState).to.deep.equal({
      currentCarouselIndex: 0,
      carouselCycleOn: true,
      selectedTask: { id: null, name: "" },
      timerRunning: false,
      taskActivity: null,
      taskActivities: [{ id: 123, taskName: 'TaskActivities' }],
    });
  });

  it('STOP_TASK_TIMER sets the taskActivity to null, timerRunning to be false, and adds the taskActivity to the state taskActivities', () => {

    expect(WorkStationReducer(receivedTaskActivitiesState, { type: taskActions.STOP_TASK_TIMER, taskActivity: { id: 124, taskName: 'TaskActivities2' } })).to.deep.equal({
      currentCarouselIndex: 0,
      carouselCycleOn: true,
      selectedTask: { id: null, name: "" },
      timerRunning: false,
      taskActivity: null,
      taskActivities: [ { id: 124, taskName: 'TaskActivities2' }, { id: 123, taskName: 'TaskActivities' } ],
    })
  })
});
