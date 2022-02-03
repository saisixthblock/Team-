import React from "react";
import BasicDetails from "../BasicDetails";
import Enzyme from 'enzyme';
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Input } from "reactstrap";

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

describe('Testing the Basic Details component',()=>{
    let wrapper=shallow(<BasicDetails handleChange={jest.fn()} values={sampleData} handleBlur={jest.fn()}/>);
    it('Create the snapShot of basicDetails component', async ()=>{
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('Testing the FullName input field',()=>{
        expect(wrapper.find(Input).at(0).prop('value')).toEqual('abcd');// in order to check the value of the input field
    });
    it('Testing the phoneNumber input field value',()=>{
        expect(wrapper.find(Input).at(1).prop('value')).toEqual('998877'); // in order to check the value of the input field
    })
    it('Checking the onChange for fullname input feild',()=>{ // inorder to check the onChange for the input field
        wrapper.find(Input).at(0).prop('onChange')({target : {value:'chandu'}});
        wrapper.find(Input).at(1).prop('onChange')({target : {value:'98486'}});
        wrapper.find(Input).at(2).prop('onChange')({target:{value:'chandu@gmail.com'}});
        wrapper.find(Input).at(3).prop('onChange')({target:{value:'12345'}}); 
    });
    it('Checking the onBlur for the input fields',()=>{ //inorder to check the onBlur for the input field
        wrapper.find(Input).at(0).prop('onBlur')({target : {value : 'chandrakanth'}});
        wrapper.find(Input).at(1).prop('onBlur')({target : {value:'9492833880'}});
        wrapper.find(Input).at(2).prop('onBlur')({target:{value:'chandrakanth@gmail.com'}});
        wrapper.find(Input).at(3).prop('onBlur')({target:{value:'chandu'}});
    })
    it('checking the number of times the input tag is used',()=>{
        expect(wrapper.find(Input)).toHaveLength(4); // inoredr to check how many times we have used the Input tag in component
    });
    it('setProps for the input field',()=>{ // setting the props for the input field
        wrapper.setProps({
            values:{
                ...sampleData,
                fullName:'chandu',
                address:'Hyd',
                phoneNumber:'98765',
            },
        });
    });
    it('Checking the values of input field after changing the properties of field',()=>{
        expect(wrapper.find(Input).at(0).prop('value')).toEqual('chandu'); // checking the fullName input field value after setProps method
        expect(wrapper.find(Input).at(1).prop('value')).toEqual('98765'); // checking the phoneNumber input field value after setProps method
    })
});