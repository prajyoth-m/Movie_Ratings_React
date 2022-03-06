import React from 'react';
import { shallow } from 'enzyme';
import Users from './Users';

describe('<Users />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Users />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
