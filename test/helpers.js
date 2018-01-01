import { JSDOM } from "jsdom";
import chai from 'chai';
// import chaiEnzyme from 'chai-enzyme';
import { expect, assert, should } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {configure} from 'enzyme';
import sinon from 'sinon';
import { spy } from 'sinon';

// function chaiDebugger (wrapper) {
//   let html = wrapper.html()
//   // do something cool with the html
//   return html
// }

function setUpDomEnvironment(){
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  const {window} = dom;
  // chai.use(require('chai-dom'))
  // chai.use(chaiEnzyme(chaiDebugger));
  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };

  global.$ = require('jquery');
  global.jQuery = require('jquery');

  global.expect = expect;
  global.assert = assert;
  global.should = should;
  global.sinon = sinon;
  global.spy = spy;

  global.mount = mount;
  global.render = render;
  global.shallow = shallow;

  copyProps(window, global);
}

function copyProps(src, target){
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

setUpDomEnvironment();

function noop(){
  return {};
}

require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;

configure({ adapter: new Adapter() });
