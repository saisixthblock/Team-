import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('Render the app component',()=>{
  it('Rendering the div component',()=>{
    let wrapper=shallow(<App/>)
    expect(wrapper.find('div')).toHaveLength(1);
  });
})