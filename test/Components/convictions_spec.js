import ConvictionList from './../../frontend/Components/conviction/ConvictionList.jsx';
import ConvictionItem from './../../frontend/Components/conviction/ConvictionItem.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

const currentUser = {id: 1};
const authentication = { currentUser: currentUser};
const fetchConvictions = sinon.stub();
describe('ConvictionList', () => {
  let convictions = [
    { id: 123, title: "Test Conviction Title1", detailed_description: "Test Conviction Detail1"},
    { id: 123, title: "Test Conviction Title2", detailed_description: "Test Conviction Detail2"},

  ];
  spy(ConvictionList.prototype, 'componentDidMount');

  let component = mount(<ConvictionList convictions={[]} authentication={authentication} fetchConvictions={fetchConvictions}/>);

  it("renders nothing when conviction list is empty", () => {
    expect(component.text()).to.contain('The reasons why you want to change');
  });

  it("renders convictions if conviction is present", () => {
    component.setProps({
      convictions: convictions
    })

    expect(component.contains("Test Conviction Title1")).to.equal(true);
    expect(component.contains("Test Conviction Detail1")).to.equal(true);
    expect(component.contains("Test Conviction Title2")).to.equal(true);
    expect(component.contains("Test Conviction Detail2")).to.equal(true);
  });

  it("has a class name of conviction-container", () => {
    expect(component.find('.conviction-container')).to.have.length(1);
  });

  it('calls componentDidMount', () => {
    expect(ConvictionList.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});

describe('ConvictionItem', () => {
  let conviction = { id: 123, title: "Test Conviction Title1", detailed_description: "Test Conviction Detail1"}
  let wrapper = mount(<ConvictionItem conviction={conviction}/>)

  it("renders conviction title and detail", () => {
    expect(wrapper.text()).to.contain('Test Conviction Title1');
    expect(wrapper.text()).to.contain('Test Conviction Detail1');
  });
});

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../frontend/actions/conviction_actions.js';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({ convictions: [] })

describe('ConvictionActions', () => {
  beforeEach(() => {
    sinon.spy($, 'ajax')
  })

  afterEach(() => {
     $.ajax.restore();
  });


  // ASYNC Actions
  it('fetchConvictions makes an api call to api/convictions', () => {

    // const store = mockStore({ convictions: [] })
    store.dispatch(actions.fetchConvictions(1));

    expect($.ajax.calledOnce).to.be.true;
    assert.equal("api/convictions", $.ajax.getCall(0).args[0].url);
    assert.equal("GET", $.ajax.getCall(0).args[0].method);
    assert.equal(1, $.ajax.getCall(0).args[0].data.userId);
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('createConvictions makes an api call to api/convictions', () => {

    // const store = mockStore({ convictions: [] })
    const data = {
      title: "Test Conviction Title1",
      detailed_description: "Test Conviction Detail1"
    }
    store.dispatch(actions.createConviction(data));

    expect($.ajax.calledOnce).to.be.true;
    assert.equal("api/convictions", $.ajax.getCall(0).args[0].url);
    assert.equal("POST", $.ajax.getCall(0).args[0].method);
    assert.equal(data, $.ajax.getCall(0).args[0].data);
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });


  // Dispatch ActionS
  it('getConvictions sends the appropriate multiple convictions', () => {
    let expected = {
      type: actions.RECEIVE_CONVICTIONS,
      convictions:
      [
        {
          id: 123,
          title: "Test Conviction Title1",
          detailed_description: "Test Conviction Detail1"
        },
        {
          id: 124,
          title: "Test Conviction Title2",
          detailed_description: "Test Conviction Detail2"
        }
      ]
    }

    store.dispatch(actions.getConvictions(
      [
        {
          id: 123,
          title: "Test Conviction Title1",
          detailed_description: "Test Conviction Detail1"
        },
        {
          id: 124,
          title: "Test Conviction Title2",
          detailed_description: "Test Conviction Detail2"
        }
      ]
    ));

    expect(store.getActions()[0]).to.deep.equal(expected)
  })

  it('receiveConviction sends one conviction', () => {
    let expected = {
      type: actions.RECEIVE_CONVICTION,
      conviction:
        {
          id: 123,
          title: "Test Conviction Title1",
          detailed_description: "Test Conviction Detail1"
        }
    }

    store.dispatch(actions.receiveConviction(
      {
        id: 123,
        title: "Test Conviction Title1",
        detailed_description: "Test Conviction Detail1"
      }
    ));

    expect(store.getActions()[1]).to.deep.equal(expected)
  })

  it('modifyConviction sends modifies conviction', () => {
    let expected = {
      type: actions.MODIFY_CONVICTION,
      conviction:
        {
          id: 123,
          title: "Test Conviction Title1",
          detailed_description: "Test Conviction Detail1"
        }
    }

    store.dispatch(actions.modifyConviction(
      {
        id: 123,
        title: "Test Conviction Title1",
        detailed_description: "Test Conviction Detail1"
      }
    ));

    expect(store.getActions()[2]).to.deep.equal(expected)
  })

  it('removeConviction sends modifies conviction', () => {
    let expected = {
      type: actions.REMOVE_CONVICTION,
      convictionId: 123
    }

    store.dispatch(actions.removeConviction(123));
    expect(store.getActions()[3]).to.deep.equal(expected)
  })
});

/** @TODO:
createConviction
deleteConviction
editConviction
**/


