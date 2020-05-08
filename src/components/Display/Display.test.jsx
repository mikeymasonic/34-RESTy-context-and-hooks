import React from 'react';
import { shallow } from 'enzyme';
import Display from './Display';
import { StateProvider } from '../../hooks/StateProvider';

describe('Display component', () => {
  it('renders Display', () => {
    const wrapper = shallow(
      <StateProvider>
        <Display />
      </StateProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
