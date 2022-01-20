import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json';
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Address from '../Address';
import { FormGroup, Input } from 'reactstrap';

Enzyme.configure({adapter:new Adapter() });

let sampleData={
    fullName:'abcd',
    email:'abcd@gmail.com',
    password:'abcd',
    phoneNumber:'998877',
    address:'',
    city:'hyd',
    pincode:'502032',
    state:'',
    location:'',
    gender:"",
    checkbox:'',
}

describe('Testing the Address component',()=>{
    let wrapper=shallow(<Address values={sampleData} handleChange={jest.fn()} handleBlur={jest.fn()}/>);
    it('Create the snapShot for the Address component',()=>{
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    it('Checking the value of the input field',()=>{
        expect(wrapper.find(Input).at(0).prop('value')).toEqual(''); // checking the value of address input field
        expect(wrapper.find(Input).at(1).prop('value')).toEqual('hyd'); // checking the value of city input field
        expect(wrapper.find(Input).at(2).prop('value')).toEqual('502032'); // checking the value of pincode input field
        expect(wrapper.find(Input).at(3).prop('value')).toEqual(''); // checking the value of state input field
    });
    it('Checking the onChange for the Address component',()=>{
        wrapper.find(Input).at(0).prop('onChange')({target : {value : 'Mac society'}});
        wrapper.find(Input).at(1).prop('onChange')({target : {value : 'hyderabad'}});
        wrapper.find(Input).at(2).prop('onChange')({target : {value : '500032'}});
        wrapper.find(Input).at(3).prop('onChange')({target : {value : 'Telangana'}});
    });
    it('Checking the onBlur of the Address component',()=>{
        wrapper.find(Input).at(0).prop('onBlur')({target : {value : 'Mac society'}});
        wrapper.find(Input).at(1).prop('onBlur')({target : {value : 'hyderabad'}});
        wrapper.find(Input).at(2).prop('onBlur')({target : {value : '500032'}});
        wrapper.find(Input).at(3).prop('onBlur')({target : {value : 'Telangana'}});
    });
    it('Checking the number of times Inpu tag is used',()=>{
        expect(wrapper.find(Input)).toHaveLength(4);
    })
    it('setting the props for Address component',()=>{
        wrapper.setProps({
            ...sampleData,
            address:'Mac Society',
            state:'telangana'
        });
    });
    // it('Checking the p tag data',()=>{
    //     expect(wrapper.find('p').exists()).toBe(true);
    // })

});