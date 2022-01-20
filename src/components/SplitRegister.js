import React, { Component } from "react";
import {Card,CardBody,Form, Col, Row,Button} from 'reactstrap';
import BasicDetails from "./BasicDetails";
import Additional from "./Additional";
import Address from "./Address";
import {Link} from 'react-router-dom';
import Login from "./Login";

class SplitRegister extends Component{
    
    handleSubmit=(e)=>{
        console.log(e)
        e.preventDefault();
        let values = this.props.values;
        if(!values.fullName){
            values.fullNameError = "FullName is Required.!";
        }
        if(!values.email){
            values.emailError = "Email ID is Required.!";
        }
        if(!values.password){
            values.passwordError = "Password is Required.!";
        }
        if(!values.phoneNumber){
            values.phoneNumberError = "PhoneNumber is Required.!";
        }
        if(!values.language){
            values.locationError = "Select the location.!";
        }
        if(!values.address){
            values.addressError = "Address is Required.!";
        }
        if(!values.city){
            values.cityError= "City is Required.!";
        }
        if(!values.state){
            values.stateError= "State is Required.!";
        }
        if(!values.pincode){
            values.pincodeError = "Pincode is Required.!";
        }
        if(!values.gender.male && !values.gender.female){
            values.genderError  = "Select Gender.!";
        }
        if(!values.checkbox.morning && !values.checkbox.evening ){
            values.checkboxError  = "Pick the time slot!";
        }
        this.setState({...values});
    }

    handleChange=(name,value)=>{
        let errors = this.props.values;
        if(name == "fullName" ){
            if(value == ''){
                errors.fullNameError = "fullName is Required.!";
                errors.fullName = value;
            }
            else{
                errors.fullNameError = '';
                errors.fullName = value;
            }
        }
        if(name=='phoneNumber'){
            if(value==''){
                errors.phoneNumberError="Phone Number is required";
                errors.phoneNumber=value;
            }
            else{
                errors.phoneNumberError='';
                errors.phoneNumber=value;
            }
        }
        if(name == "email" ){
            if(value == ''){
                errors.emailError = "Email ID Required.!";
                errors.email = value;
            }
            else{
                let model = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(!model.test(value)){
                    errors.emailError = "Invalid Email ID";
                    errors.email = value;
                }
                else{
                    errors.emailError = '';
                    errors.email = value;
                }
            }
        }
        if(name == "password" ){
            if(value == ''){
                errors.passwordError = "Password is Required.!";
                errors.password = value;
            }
            else{
                errors.passwordError = '';
                errors.password = value;
            }
        }
        if(name == "address" ){
            if(value == ''){
                errors.addressError= "Address is Required.!";
                errors.address = value;
            }
            else{
                errors.addressError = '';
                errors.address = value;
            }
        }
        if(name == "city" ){
            if(value == ''){
                errors.cityError= "City is Required.!";
                errors.city = value;
            }
            else{
                errors.cityError = '';
                errors.city = value;
            }
        }
        if(name == "state" ){
            if(value == ''){
                errors.stateError= "state is Required.!";
                errors.state = value;
            }
            else{
                errors.stateError = '';
                errors.state = value;
            }
        }
        if(name == "pincode" ){
            if(value == ''){
                errors.pincodeError = "Pincode is Required.!";
                errors.pincode = value;
            }
            else{
                errors.pincodeError = '';
                errors.pincode = value;
            }
        }
        if(name == "location" ){
            if(value == ''){
                errors.locationError = "Select Location.!";
                errors.location = value;
            }
            else{
                errors.locationError = '';
                errors.location =value;
            }
        }
        if(name == "gender"){
            let male = document.getElementById('male').checked;
            let female = document.getElementById('female').checked;
            if(!male && !female ){
                errors.genderError  = "Select Gender";
            }
            else{
                errors.gender.male = male;
                errors.gender.female = female;
                errors.genderError = '';
            }
        }
        if(name == "checkbox"){
            let morning = document.getElementById('morning').checked;
            let evening = document.getElementById('evening').checked;
            if(!morning && !evening ){
                errors.checkboxError  = "Select the time slot";
                errors.checkbox.morning = morning;
                errors.checkbox.evening = evening;
            }
            else{
                errors.checkbox.morning = morning;
                errors.checkbox.evening = evening;
                errors.checkboxError = '';
            }
        }
        this.setState({
            ...errors
        })
    }

    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <BasicDetails values={this.props.values}
                            handleChange={this.handleChange}
                            handleBlur={this.props.handleBlur}
                        />
                    </Row>            
                    <Row>
                        <Address values={this.props.values}
                            handleChange={this.handleChange}
                            handleBlur={this.props.handleBlur}  
                        />
                    </Row>
                    <Row>
                        <Additional values={this.props.values}
                            handleChange={this.handleChange}
                            handleBlur={this.props.handleBlur} 
                        />
                    </Row><br/>
                    <Row>
                        <Col style={{marginLeft:200}}>
                            <Button type="submit" outline color="success">Register</Button>
                            <Button style={{marginLeft:15}} type="reset" outline color="danger">Cancel</Button><br/>
                            If already registered ? Please <Link to='/' component={<Login/>}>login</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
export default SplitRegister