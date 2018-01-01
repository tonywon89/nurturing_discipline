import MilestoneList from '../../frontend/Components/milestones/MilestoneList.jsx';
import MilestoneItem from '../../frontend/Components/milestones/MilestoneItem.jsx';
import React from 'react';
import merge from 'lodash/merge';

const currentUser = { id: 1};
const authentications = { currentUser };
const fetchMilestones = sinon.stub();
const openMilestoneForm = sinon.stub();
const openTaskForm = sinon.stub();
const milestonesDefault = {
  milestones: [],
  milestoneModal: {
    modalIsOpen: false,
    parentMilestone: null,
    milestoneForm: false,
    taskForm: false,
  }
}
describe('Milestone List Component', () => {

  let milestoneList = mount(<MilestoneList milestones={milestonesDefault} fetchMilestones={fetchMilestones} openMilestoneForm={openMilestoneForm} openTaskForm={openTaskForm}/> );

  it('renders the empty milestone message when user has no milestones', () => {
    expect(milestoneList.text()).to.contain('No Milestones');
  });

  let milestones = [
    { id: 123, content: "Test Milestone 1", sub_milestones: [], tasks: [], goalType: 'timed', goalRemaining: 3661, _parent: null},
    { id: 124, content: "Test Milestone 2", sub_milestones: [], tasks: [], goalType: 'timed', goalRemaining: 3661, _parent: null}
  ];

  it('does not render the create button when milestones are empty', () => {
    expect(milestoneList.find('.create-milestone-button')).to.have.length(0);
  })

  let basicMilestones = merge({}, milestonesDefault, { milestones });

  it ('renders milestones', () => {
    milestoneList.setProps({
      milestones: basicMilestones
    });

    expect(milestoneList.text()).to.contain('Test Milestone 1');
    expect(milestoneList.text()).to.contain('Test Milestone 2');
    expect(milestoneList.text()).to.contain('1 hours 1 minutes 1 seconds')
  });

  it('renders the create button when milestones are present', () => {
    expect(milestoneList.find('.create-milestone-button')).to.have.length(1);
  })

  milestones = [
    {
      id: 123,
      content: "Test Milestone 1",
      sub_milestones: [
        {
          id: 124,
          content: "Test Submilestone 1",
          tasks: [],
          expanded: false,
          goalType: 'timed',
          sub_milestones: [],
          goalRemaining: 3662,
        }
      ],
      expanded: true,
      tasks: [
        {
         id: 123,
         name: 'General Task for Test Milestone 1',
        }

      ],
      goalType: 'timed',
      goalRemaining: 3661,
      _parent: null
    }
  ]

  // basicMilestones.milestones = milestones;
  let subMilestonesTest = merge({}, milestonesDefault, { milestones })

  it('renders submilestones and tasks when expanded is true', () => {
    milestoneList.setProps({
      milestones: subMilestonesTest
    })

    expect(milestoneList.text()).to.contain('Test Submilestone 1');
    expect(milestoneList.text()).to.contain('1 hours 1 minutes 2 seconds');
    expect(milestoneList.text()).to.contain('General Task for Test Milestone 1');

    // Should not show the submilestone if it is not expanded
    milestones[0].expanded = false;

    subMilestonesTest = merge({}, milestonesDefault, { milestones });

    milestoneList.setProps({
      milestones: subMilestonesTest
    })

    expect(milestoneList.text()).to.not.contain('Test Submilestone 1');
    expect(milestoneList.text()).to.not.contain('General Task for Test Milestone 1');

  });

  // Test for deeply nested submilestones and tasks
  milestones[0].expanded = true;

  let subMilestone = milestones[0].sub_milestones[0];
  subMilestone.tasks.push({
    id: 124,
    name: 'General Task for Test Submilestone 1',
  });

  subMilestone.sub_milestones.push(
       {
          id: 125,
          content: "Test Submilestone 2",
          tasks: [
            {
              id: 127,
              name: 'General Task for Test Submilestone 2',
            }
          ],
          expanded: true,
          goalType: 'timed',
          sub_milestones: [
               {
              id: 126,
              content: "Test Submilestone 3",
              tasks: [
                {
                  id: 128,
                  name: 'General Task for Test Submilestone 3',
                }
              ],
              expanded: true,
              goalType: 'timed',
              sub_milestones: [],
              goalRemaining: 3662,
            }
          ],
          goalRemaining: 3662,
        }

  )

  subMilestone.expanded = true;

  let deepSubMilestonesTest = merge({}, milestonesDefault, { milestones });

  it('renders the tasks and sub milestones that belong to deeply nested submilestones', () => {
    milestoneList.setProps({
      milestones: deepSubMilestonesTest
    })

    expect(milestoneList.text()).to.contain('Test Submilestone 1');
    expect(milestoneList.text()).to.contain('Test Submilestone 2');
    expect(milestoneList.text()).to.contain('Test Submilestone 3');
    expect(milestoneList.text()).to.contain('General Task for Test Submilestone 1');
    expect(milestoneList.text()).to.contain('General Task for Test Submilestone 2');
    expect(milestoneList.text()).to.contain('General Task for Test Submilestone 3');
  });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../frontend/actions/milestone_actions.js';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore(milestonesDefault);

describe('Milestone Actions', () => {
  beforeEach(() => {
    sinon.spy($, 'ajax');
  });

  afterEach(() => {
    $.ajax.restore();
  });

  // ASYNC Actions
  it('fetchMilestones makes an api call to api/milestones', () => {
    store.dispatch(actions.fetchMilestones());

    expect($.ajax.calledOnce).to.be.true
    assert.equal("api/milestones", $.ajax.getCall(0).args[0].url);
    assert.equal("GET", $.ajax.getCall(0).args[0].method);
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('createMilestone makes a POST call to api/milestones', () => {
    let data = {
      content: "Test Milestone 1",
      selectedOption: "timed",
      hours: 1,
      minutes: 1,
    };

    store.dispatch(actions.createMilestone(data));

    expect($.ajax.calledOnce).to.be.true
    assert.equal("api/milestones", $.ajax.getCall(0).args[0].url);
    assert.equal("POST", $.ajax.getCall(0).args[0].method);
    assert.equal(data, $.ajax.getCall(0).args[0].data)
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('createSubMilestone makes a POST api call to api/milestones/submilestones', () => {
    let data = {
      content: "Test SubMilestone 1",
      selectedOption: "timed",
      hours: 1,
      minutes: 1,
      parentMilestone: 123,
    };

    store.dispatch(actions.createSubMilestone(data))

    expect($.ajax.calledOnce).to.be.true
    assert.equal("api/milestones/submilestones", $.ajax.getCall(0).args[0].url);
    assert.equal("POST", $.ajax.getCall(0).args[0].method);
    assert.equal(data, $.ajax.getCall(0).args[0].data)
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('updateMilestone makes a patch call to api/milestones', () => {
    let data = {
      id: 123,
      content: "Patched MIlestone",
      expanded: true,
    };

     store.dispatch(actions.updateMilestone(data))

    expect($.ajax.calledOnce).to.be.true
    assert.equal("api/milestones", $.ajax.getCall(0).args[0].url);
    assert.equal("PATCH", $.ajax.getCall(0).args[0].method);
    assert.equal(data, $.ajax.getCall(0).args[0].data)
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('deleteMilestone makes a patch call to api/milestones', () => {
    let data = {
      id: 123,
    };

    store.dispatch(actions.deleteMilestone(data))

    expect($.ajax.calledOnce).to.be.true
    assert.equal("api/milestones", $.ajax.getCall(0).args[0].url);
    assert.equal("DELETE", $.ajax.getCall(0).args[0].method);
    assert.equal(data, $.ajax.getCall(0).args[0].data)
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('createTask makes a POST call to api/milestones/task', () => {
    let data = {
      name: "Test task",
      milestoneId: 123,
    };

    store.dispatch(actions.createTask(data))

    expect($.ajax.calledOnce).to.be.true
    assert.equal("api/milestones/tasks", $.ajax.getCall(0).args[0].url);
    assert.equal("POST", $.ajax.getCall(0).args[0].method);
    assert.equal(data, $.ajax.getCall(0).args[0].data)
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('deleteTask makes a DELETE call to api/milestones/tasks', () => {
    let data = {
      id: 123
    };

    store.dispatch(actions.deleteTask(data))

    expect($.ajax.calledOnce).to.be.true
    assert.equal("api/milestones/tasks", $.ajax.getCall(0).args[0].url);
    assert.equal("DELETE", $.ajax.getCall(0).args[0].method);
    assert.equal(data, $.ajax.getCall(0).args[0].data)
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('updateTask makes a PATCH call to api/milestones/tasks', () => {
    let data = {
      id: 123,
      name: "Updated Task",
    };

    store.dispatch(actions.updateTask(data))

    expect($.ajax.calledOnce).to.be.true
    assert.equal("api/milestones/tasks", $.ajax.getCall(0).args[0].url);
    assert.equal("PATCH", $.ajax.getCall(0).args[0].method);
    assert.equal(data, $.ajax.getCall(0).args[0].data)
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });
});


/**
  Things to test for milestones
  Create Milestone
  Add Landmark
  Add Task
  Edit milestone
  Edit Task
  Delete Milestone
  Delete Task
  Test Reducer
**/


