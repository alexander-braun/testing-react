import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from './App';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders learn react link', () => {
  //Renders component shallow without inner components
  const shallowWrapper = shallow(<App />);
  //.debut() shows DOM as a string
  console.log(shallowWrapper.debug());
  //Assertions with expect()
  //.toBeTruthy() returns true if not null/undefined/empty string
  expect(shallowWrapper).toBeTruthy();
  //.toBeFalsy() returns true if null/undefined/empty
  //expect(shallowWrapper).toBeFalsy();
});

/**
 * Unit Tests
 * -> Test one piece (usually one function)
 *
 * Integration Tests
 * -> Test how multiple units work together
 *
 * Acceptance / End-toEnd(e2e) test
 * -> How a user would interact with the app
 *
 * Primary goal is to test behavior not implementation.
 * -> Do not want to re-write tests after refactor
 * -> Find good balance -> sometimes just check if a part
 *    of the integration works
 *
 *
 */

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for the setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  let wrapper = shallow(<App {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test('renders without error', () => {
  const wrapper = setup();
  //Finds the data-attribute (or .css or #id or component)
  const appComponent = findByTestAttr(wrapper, 'component-app');
  //Test if there is 1 node inside the appComponent (only one element has the data-test attribute)
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  //Finds the data-attribute (or .css or #id or component)
  const button = findByTestAttr(wrapper, 'increment-button');
  //Test if there is 1 node inside the appComponent (only one element has the data-test attribute)
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  //Finds the data-attribute (or .css or #id or component)
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  //Test if there is 1 node inside the appComponent (only one element has the data-test attribute)
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toBe('The counter is 0');
});

test('click on button increments counter in display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

test('click on decrement button decrements counter', () => {
  const counter = 2;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('decrement never goes beyond 0', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(0);
});
