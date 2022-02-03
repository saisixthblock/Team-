import React from "react";
import Additional from "../Additional";
import Enzyme from 'enzyme';
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Input } from "reactstrap";

Enzyme.configure({adapter:new Adapter() });

let sampleData={
    fullName:'',
    email:'abcd@gmail.com',
    password:'abcd',
    phoneNumber:'998877',
    address:'',
    city:'hyd',
    pincode:'502032',
    state:'',
    location:'Hyderabad',
    gender:"male",
    checkbox:'morning',
}

describe('Testing the Additional component',()=>{
    let wrapper=shallow(<Additional handleChange={jest.fn()} handleBlur={jest.fn()} values={sampleData}/>);
    it('Create the snapShot of Additional component', async ()=>{
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('cheking the initaial values of component',()=>{
        expect(wrapper.find(Input).at(0).prop('value')).toEqual('Hyderabad');
        expect(wrapper.find(Input).at(1).prop('id')).toEqual('male');
        expect(wrapper.find(Input).at(2).prop('id')).toEqual('female');
        expect(wrapper.find(Input).at(3).prop('id')).toEqual('morning');
        expect(wrapper.find(Input).at(4).prop('id')).toEqual('evening');
    });
    it('Checking the handleChange for the additional component',()=>{
        wrapper.find(Input).at(0).prop('onChange')({target :{value :'Hyderabad'}});
        wrapper.find(Input).at(1).prop('onChange')({target :{value :'male'}});
        wrapper.find(Input).at(2).prop('onChange')({target :{value :'female'}});
        wrapper.find(Input).at(3).prop('onChange')({target :{value :'morning'}});
        wrapper.find(Input).at(4).prop('onChange')({target :{value :'evening'}});
    });
    it('Checking the handleBlur for the additional component',()=>{
        wrapper.find(Input).at(0).prop('onBlur')({target :{value :'Hyderabad'}});
        wrapper.find(Input).at(1).prop('onBlur')({target :{value :'male'}});
        wrapper.find(Input).at(2).prop('onBlur')({target :{value :'female'}});
        wrapper.find(Input).at(3).prop('onBlur')({target :{value :'morning'}});
        wrapper.find(Input).at(4).prop('onBlur')({target :{value :'evening'}});
    });
    it('Setting the props for the additional component',()=>{
        wrapper.setProps({
            ...sampleData,
            location:'Hyderabad',
            gender:'male',
            checkbox:'morning',
        });
    });
    it('cheking the values of component after setting props',()=>{
        expect(wrapper.find(Input).at(0).prop('value')).toEqual('Hyderabad');
        expect(wrapper.find(Input).at(1).prop('id')).toEqual('male');
        expect(wrapper.find(Input).at(2).prop('id')).toEqual('female');
        expect(wrapper.find(Input).at(3).prop('id')).toEqual('morning');
        expect(wrapper.find(Input).at(4).prop('id')).toEqual('evening');
    });

    
});
