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
let milestones = [
  { id: 123, content: "Test Milestone 1", sub_milestones: [], tasks: [], goalType: 'timed', goalRemaining: 3661, _parent: null},
  { id: 124, content: "Test Milestone 2", sub_milestones: [], tasks: [], goalType: 'timed', goalRemaining: 3661, _parent: null}
];

describe('MilestoneList Component', () => {

  let milestoneList = mount(<MilestoneList milestones={milestonesDefault} fetchMilestones={fetchMilestones} openMilestoneForm={openMilestoneForm} openTaskForm={openTaskForm}/> );

  it('renders the empty milestone message when user has no milestones', () => {
    expect(milestoneList.text()).to.contain('No Milestones');
  });



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
  describe('Milestone async actions', () => {
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
  });

  describe('Task async actions', () => {
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

  // Milestone/Task Modal actions
  describe('Milestone/Task modal actions', () => {

    it('openTaskForm updates the modal', () => {

      let parentMilestone = {
        id: 123,
        content: "Test Milestone 1",
      }

      let expected = {
        type: actions.OPEN_TASK_FORM,
        parentMilestone
      }

      store.dispatch(actions.openTaskForm(parentMilestone));

      expect(store.getActions()[0]).to.deep.equal(expected);
    });

    it('openMilestoneForm updates the modal', () => {

      let parentMilestone = {
        id: 123,
        content: "Test Milestone 1",
      }

      let expected = {
        type: actions.OPEN_MILESTONE_FORM,
        parentMilestone
      }

      store.dispatch(actions.openMilestoneForm(parentMilestone));

      expect(store.getActions()[1]).to.deep.equal(expected);

      // Make the default parentMilestone to be null
      store.dispatch(actions.openMilestoneForm());
      expected = { type: actions.OPEN_MILESTONE_FORM, parentMilestone: null };
      expect(store.getActions()[2]).to.deep.equal(expected);
    });

    it('closeMilestoneModal closes the modal', () => {
      let expected = { type: actions.CLOSE_MILESTONE_MODAL };
      store.dispatch(actions.closeMilestoneModal());
      expect(store.getActions()[3]).to.deep.equal(expected);
    });
  })

});

import MilestonesReducer from '../../frontend/reducers/milestones_reducer.js';

describe('Milestones Reducer', () => {
  it('should return the initial state', () => {
    expect(MilestonesReducer(undefined, {})).to.deep.equal(milestonesDefault);
  });

  it('should handle RECEIVE_MILESTONES', () => {
    expect(MilestonesReducer(undefined, { type: actions.RECEIVE_MILESTONES, milestones: milestones })).to.deep.equal({
        milestones: milestones,
        milestoneModal: {
          modalIsOpen: false,
          parentMilestone: null,
          milestoneForm: false,
          taskForm: false,
        }
      })
  });

  it('should handle OPEN_MILESTONE_FORM', () => {
    let parentMilestone = {id: 123, content: "Test Milestone "}
    expect(MilestonesReducer(undefined, { type: actions.OPEN_MILESTONE_FORM, parentMilestone }))
      .to
      .deep
      .equal({
        milestones: [],
        milestoneModal: {
          modalIsOpen: true,
          parentMilestone,
          milestoneForm: true,
          taskForm: false,
        }
      });
  });

  it('should handle OPEN_TASK_FORM', () => {
    let parentMilestone = {id: 123, content: "Test Milestone "}
    expect(MilestonesReducer(undefined, { type: actions.OPEN_TASK_FORM, parentMilestone }))
      .to
      .deep
      .equal({
        milestones: [],
        milestoneModal: {
          modalIsOpen: true,
          parentMilestone,
          milestoneForm: false,
          taskForm: true,
        }
      });
  });

  it('should handle CLOSE_MILESTONE_MODAL', () => {

    expect(MilestonesReducer(undefined, { type: actions.CLOSE_MILESTONE_MODAL }))
      .to
      .deep
      .equal({
        milestones: [],
        milestoneModal: {
          modalIsOpen: false,
          parentMilestone: null,
          milestoneForm: false,
          taskForm: false,
        }
      });
  });
});
