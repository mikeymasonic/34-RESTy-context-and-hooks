import React from 'react';
import { shallow } from 'enzyme';
import List from './List';
import { StateProvider } from '../../hooks/StateProvider';

describe('List component', () => {
  it('renders List', () => {
    const wrapper = shallow(
      <StateProvider>
        <List />
      </StateProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
