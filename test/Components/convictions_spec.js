import ConvictionList from './../../frontend/Components/conviction/ConvictionList.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

describe('ConvictionList', () => {
  const currentUser = {id: 1};
  const authentication = { currentUser: currentUser};
  const fetchConvictions = sinon.stub();
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
