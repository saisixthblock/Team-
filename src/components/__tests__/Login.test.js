import React from "react";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Login from "../Login";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Card, Form, Input } from "reactstrap";
Enzyme.configure({adapter:new Adapter() });

describe('Create a SnapShot for the login component',()=>{
    let wrapper=shallow(<Login/>);
    let instanceFun=wrapper.instance();
    let sampleData={
        email:'abcd@gmail.com',
        password:'abcd'
    };
    it('Render the component correctly',()=>{
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it('Check the Card count',()=>{
        expect(wrapper.find(Card).exists()).toBe(true);
        expect(wrapper.find(Card)).toHaveLength(1);
    });
       beforeEach(()=>{
           jest.spyOn(instanceFun,'handleChange')
           instanceFun.handleChange('email','test@gmail.com');
       });
       it('call the function input value',()=>{
           expect(instanceFun.handleChange).toHaveBeenCalledWith('email','test@gmail.com')
       })
       it('set the state of input field of login component',()=>{
           expect(wrapper.state().email).toEqual('test@gmail.com');
       });
        it('submit the user data',()=>{
            wrapper.setState({
                state:{...sampleData},
            });
        });
        it("update data with button clcik",()=>{
            let submitbutton=wrapper.find('#test-button');
            submitbutton.simulate('click')
            expect(wrapper.state().email).toEqual('test@gmail.com'); 
        });
        it('Checking the form tag',()=>{
            expect(wrapper.find(Form).exists()).toBe(true); // inorder to check whether the form tag exists or not.
        })
        it('Checking the form tags',()=>{
            expect(wrapper.find(Form).length).toBe(1); // inorder to find the length of the form tag i;e; how many times the form tag used.
        })
});