import React from "react";
import Register from "../Register";
import Enzyme from 'enzyme';
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Input } from "reactstrap";

Enzyme.configure({adapter:new Adapter() });

describe('Create a snapShot for the register component',()=>{
    it('Create the snapshot for the register component',()=>{
        let wrapper=shallow(<Register/>)
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
});
describe('testing the register component',()=>{
    let wrapper=shallow(<Register/>)
    let instanceFun=wrapper.instance();
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

    beforeEach(()=>{
        jest.spyOn(instanceFun,'handleBlur');
        instanceFun.handleBlur('fullName','chandu');
        instanceFun.handleBlur('email','chandu@gmail.com')
    });
    it('check the fullname input field',()=>{
        expect(instanceFun.handleBlur).toHaveBeenCalledWith('fullName','chandu');
    });
    it('submit the user data',()=>{
        wrapper.setState({
            state:{...sampleData},
        });
    });
    it('check the IF condition',()=>{
        //console.log(instanceFun);
        //instanceFun.radioBlur();
    })
});