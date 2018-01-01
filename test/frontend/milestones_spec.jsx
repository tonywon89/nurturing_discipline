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

  let basicMilestones = merge({}, milestonesDefault, { milestones });

  it ('renders milestones', () => {
    milestoneList.setProps({
      milestones: basicMilestones
    });

    expect(milestoneList.text()).to.contain('Test Milestone 1');
    expect(milestoneList.text()).to.contain('Test Milestone 2');
    expect(milestoneList.text()).to.contain('1 hours 1 minutes 1 seconds')
  });

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

});

/**
  Things to test for milestones
  Tasks
  Submilestones
  Sub Tasks
  Remaining time
  expanded
  Create Milestone
  Add Landmark
  Add Task
  Edit milestone
  Edit Task
  Delete Milestone
  Delete Task
**/


