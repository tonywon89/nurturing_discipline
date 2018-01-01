import ConvictionList from './../../frontend/Components/conviction/ConvictionList.jsx';
import ConvictionItem from './../../frontend/Components/conviction/ConvictionItem.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

const currentUser = {id: 1};
const authentication = { currentUser: currentUser};
const fetchConvictions = sinon.stub();
describe('Conviction List Component', () => {
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

describe('Conviction Item Component', () => {
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
const doubleConvictions =   [
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
describe('Conviction Actions', () => {
  beforeEach(() => {
    sinon.spy($, 'ajax')
  })

  afterEach(() => {
     $.ajax.restore();
  });


  // ASYNC Actions
  it('fetchConvictions makes an api call to api/convictions', () => {

    const userId = 1;
    store.dispatch(actions.fetchConvictions(userId));

    expect($.ajax.calledOnce).to.be.true;
    assert.equal("api/convictions", $.ajax.getCall(0).args[0].url);
    assert.equal("GET", $.ajax.getCall(0).args[0].method);
    assert.equal(userId, $.ajax.getCall(0).args[0].data.userId);
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('createConvictions makes a POST api call to api/convictions', () => {

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

  it('deleteConviction makes a DELETE api call to api/convictions', () => {

    const convictionId = 1
    store.dispatch(actions.deleteConviction(convictionId));

    expect($.ajax.calledOnce).to.be.true;
    assert.equal("api/convictions", $.ajax.getCall(0).args[0].url);
    assert.equal("DELETE", $.ajax.getCall(0).args[0].method);
    assert.equal(convictionId, $.ajax.getCall(0).args[0].data.convictionId);
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  it('editConviction makes a DELETE api call to api/convictions', () => {

    const data = {
      id: 123,
      title: "Test Conviction Title1",
      detailed_description: "Test Conviction Detail1"
    }
    store.dispatch(actions.editConviction(data));

    expect($.ajax.calledOnce).to.be.true;
    assert.equal("api/convictions", $.ajax.getCall(0).args[0].url);
    assert.equal("PATCH", $.ajax.getCall(0).args[0].method);
    assert.equal(data, $.ajax.getCall(0).args[0].data);
    assert.equal("json", $.ajax.getCall(0).args[0].dataType);
  });

  // Dispatch ActionS
  it('getConvictions sends the appropriate multiple convictions', () => {
    let expected = {
      type: actions.RECEIVE_CONVICTIONS,
      convictions: doubleConvictions,
    }

    store.dispatch(actions.getConvictions(doubleConvictions));

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

import ConvictionsReducer from '../../frontend/reducers/convictions_reducer.js';

describe('Convictions Reducer', () => {
  it('should return the initial state', () => {
    expect(ConvictionsReducer(undefined, {})).to.deep.equal([]);
  });

  it('should handle RECEIVE_CONVICTIONS, returning the new convictions array', () => {
    expect(ConvictionsReducer(undefined, { type: actions.RECEIVE_CONVICTIONS, convictions: doubleConvictions})).to.deep.equal(doubleConvictions)
  });

  it('should handle RECEIVE_CONVICTION, adding a current conviction to the end', () => {
    const thirdConviction = {id: 125, title: "Test Conviction Title3", detailed_description: "Test Conviction Detail3"}

    expect(ConvictionsReducer(doubleConvictions, { type: actions.RECEIVE_CONVICTION, conviction: thirdConviction})).to.deep.equal([...doubleConvictions, thirdConviction]);
  });

  it('should handle REMOVE_CONVICTION, removing the specified conviction', () => {
    expect(ConvictionsReducer(doubleConvictions, { type: actions.REMOVE_CONVICTION, convictionId: 123})).to.deep.equal([doubleConvictions[1]]);
  });

  it('should handle MODIFY_CONVICTION, modifying the existing conviction with the new input', () => {
    const modifiedConviction = { id: 123, title: "Test Conviction Title 4", detailed_description: "Test Description  4" };

    expect(ConvictionsReducer(doubleConvictions, { type: actions.MODIFY_CONVICTION, conviction: modifiedConviction})).to.deep.equal([modifiedConviction, doubleConvictions[1]]);
  });
});
