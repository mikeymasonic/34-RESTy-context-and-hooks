import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

describe('List component', () => {
  it('renders List', () => {
    const wrapper = shallow(<List 
      requests={[]}
      handleClear={() => {}}
      handleLoad={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
  });
});
