import { JSDOM } from "jsdom";
import chai from 'chai';
import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {configure} from 'enzyme';
import sinon from 'sinon';
import { spy } from 'sinon';

function setUpDomEnvironment(){
  const dom = new JSDOM('<!doctype html><html><body></body></html>');
  const {window} = dom;

  global.window = window;
  global.document = window.document;
  global.navigator = {
    userAgent: 'node.js',
  };

  global.$ = require('jquery');
  global.jQuery = require('jquery');

  global.expect = expect;
  global.assert = assert;
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
