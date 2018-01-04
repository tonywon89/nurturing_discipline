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
let workstation = {
  currentCarouselIndex: 0,
  carouselCycleOn: true,
  selectedTask: { id: 123, name: "Testing selected Task" },
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
          workstation={workstation}
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
      let taskActivityWorkstation = merge({}, workstation, { timerRunning: true,  taskActivity: {id: 123, timeAount: 123 }})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });

      workstationWrapper.find('.timer-controls .fa-play-circle').simulate('click');
      expect(startTaskTimer.calledTwice).to.equal(false);
      expect(resumeTaskTimer.calledOnce).to.equal(false);

    });

    it('handlesStartClick resumes the task timer when the timer is paused', () => {
      let taskActivityWorkstation = merge({}, workstation, { taskActivity: {id: 123 } })
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
      workstationWrapper.setProps({ workstation: workstation });
      workstationWrapper.find('.timer-controls .fa-stop-circle-o').simulate('click');
      expect(handleStopClick.calledOnce).to.equal(true);
      expect(stopTaskTimer.called).to.equal(false);
    });

    it('handleStopClick stops the task the timer if the timer is running', () => {
      let taskActivityWorkstation = merge({}, workstation, { taskActivity: {id: 123 }, timerRunning: true })
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      workstationWrapper.find('.timer-controls .fa-stop-circle-o').simulate('click');

      expect(stopTaskTimer.calledOnce).to.equal(true);
    });

    it('handleStopClick stops the task the timer if the timer is paused', () => {
      let taskActivityWorkstation = merge({}, workstation, { taskActivity: {id: 123 }, timerRunning: false})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      workstationWrapper.find('.timer-controls .fa-stop-circle-o').simulate('click');

      expect(stopTaskTimer.calledTwice).to.equal(true);
    });
  })

  describe('Workstation componentWillReceiveProps', () =>{
    it('properly sets the intervalId when the timer is running and intervalId is null' ,() => {
      let taskActivityWorkstation = merge({}, workstation, { taskActivity: {id: 123 }, timerRunning: true})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      expect(workstationWrapper.state().intervalId).to.not.be.equal(null)
    });

    it('sets the intervalId to null when there is a taskActivity but the timer is paused', () => {
      let taskActivityWorkstation = merge({}, workstation, { taskActivity: {id: 123, timeAmount: 123 }, timerRunning: false})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      expect(workstationWrapper.state().intervalId).to.equal(null)
      expect(workstationWrapper.state().currentTime).to.equal(123);
    });

    it('sets the intervalId to null when there is a taskActivity but the timer is paused', () => {
      let taskActivityWorkstation = merge({}, workstation, { taskActivity: null, timerRunning: false})
      workstationWrapper.setProps({ workstation: taskActivityWorkstation });
      expect(workstationWrapper.state().intervalId).to.equal(null)
      expect(workstationWrapper.state().currentTime).to.equal(0);
    });
  });
});

describe('Carousel Component', () => {
  spy(Carousel.prototype, 'componentDidMount');

  let convictions = [
    {id: 123, title: "Test Conviction 1", detailed_description: "Test Detailed 1"},
    {id: 124, title: "Test Conviction 2", detailed_description: "Test Detailed 2"}
  ]

  let carouselWrapper = shallow(
      <Carousel
        convictions={convictions}
        workstation={workstation}
        increaseCarouselIndex={increaseCarouselIndex}
        decreaseCarouselIndex={decreaseCarouselIndex}
        setCarouselIndex={setCarouselIndex}
        toggleCarouselCycle={toggleCarouselCycle}
      />
  );

  it('when convictions are present, it sets the intervalId', () => {
    expect(Carousel.prototype.componentDidMount.calledOnce).to.equal(true);
    expect(carouselWrapper.state().intervalId).to.not.equal(null);
    carouselWrapper.unmount();

  });


  it('when the toggle carousel cycle is off, ', () => {
    let toggleCycleWorkstation = merge({}, workstation, { carouselCycleOn: false });

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
      let toggleCycleWorkstation = merge({}, workstation, { carouselCycleOn: true });
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
});
