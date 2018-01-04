import Workstation from '../../frontend/Components/workstation/WorkStation.jsx';
import Carousel from '../../frontend/Components/workstation/Carousel.jsx';
import CarouselItem from '../../frontend/Components/workstation/CarouselItem.jsx';
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

const increaseCarouselIndex = sinon.stub();
const descreaseCarouselIndex = sinon.stub();
const setCarouselIndex  = sinon.stub();
const toggleCarouselCycle = sinon.stub();

const handleStartClick = spy(Workstation.WrappedComponent.prototype, 'handleStartClick');
const handlePauseClick = spy(Workstation.WrappedComponent.prototype, 'handlePauseClick');

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
    });
  })


  describe('Carousel Component', () => {
    // it('when convictions are empty, it shows the "No Convictions" sign', () => {
    //   let carouselWrapper = mount(
    //     <HashRouter>
    //       <Carousel
    //         convictions={convictions}
    //         workstation={workstation}
    //         increaseCarouselIndex={increaseCarouselIndex}
    //         descreaseCarouselIndex={descreaseCarouselIndex}
    //         setCarouselIndex={setCarouselIndex}
    //         toggleCarouselCycle={toggleCarouselCycle}
    //       />
    //     </HashRouter>
    //   );
    //   expect(carouselWrapper.text()).to.contain('No Convictions yet');
    //   expect(carouselWrapper.text()).to.contain('Click here to make some');
    //   carouselWrapper.unmount();
    // });

    it('when convictions are present, it shows the conviction sign', () => {
      let convictions = [{id: 123, title: "Test Conviction 1", detailed_description: "Test Detailed 1"}]

      let carouselWrapper = shallow(
          <Carousel
            convictions={convictions}
            workstation={workstation}
            increaseCarouselIndex={increaseCarouselIndex}
            descreaseCarouselIndex={descreaseCarouselIndex}
            setCarouselIndex={setCarouselIndex}
            toggleCarouselCycle={toggleCarouselCycle}
          />

      );
      expect(carouselWrapper.state().intervalId).to.not.equal(null);
    });
  });
});
