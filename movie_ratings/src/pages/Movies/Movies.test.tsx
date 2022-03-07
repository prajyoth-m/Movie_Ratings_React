import React from 'react';
import { shallow } from 'enzyme';
import Movies from './Movies';

describe('<Movies />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Movies />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
