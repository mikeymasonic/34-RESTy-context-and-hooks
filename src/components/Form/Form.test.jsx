import React from 'react';
import { shallow } from 'enzyme';
import Form from './Form';
import { StateProvider } from '../../hooks/StateProvider';

describe('Form component', () => {
  it('renders Form', () => {
    const wrapper = shallow(
      <StateProvider>
        <Form />
      </StateProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
