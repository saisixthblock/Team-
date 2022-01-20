import React, { Component } from "react";
import {Card, CardBody, CardHeader,Col,FormGroup,Input,Row,Form, Button, Label} from 'reactstrap';
import SplitRegister from "./SplitRegister";

class Register extends Component{
    state={
        fullName:'',
        fullNameError:'',
        email:'',
        emailError:'',
        password:'',
        passwordError:'',
        phoneNumber:'',
        phoneNumberError:'',
        address:'',
        addressError:'',
        city:'',
        cityError:'',
        pincode:'',
        pincodeError:'',
        state:'',
        stateError:'',
        location:"",
        locationError:'',
        gender:{male:false,
            female:false,
        },
        genderError:'',
        checkbox:{
            morning:false,
            evening:false,
        },
        checkboxError:'',
        
    }

    radioBlur(){
        let errors = this.state;
        let male =  document.getElementById('male').checked;
        let female = document.getElementById('female').checked;
        if(!male && ! female){
            errors.genderError = "Select Gender.!";
        }
        else{
            errors.genderError= '';
        }
        this.setState({
            ...errors
        })
    }
    checkboxBlur= ()=>{
        let errors = this.state;
        let morning = document.getElementById('morning').checked;
        let evening = document.getElementById('evening').checked;
        if( !morning && !evening ){
            errors.checkboxError = "Pick the time slot";
        }
        else{
            errors.checkboxError='';
        }
        this.setState({
            ...errors
        })
    }

    handleBlur=(name,value)=>{
        let errors = this.state;
        if(name == 'fullName'){
            if(value == ''){
                errors.fullNameError="FullName is Required.!";
            }
            else{
                errors.fullNameError="";
            }
        }
        if(name == 'gender'){
            this.radioBlur();
        }
        if(name == 'checkbox'){
            this.checkboxBlur();
        }
        if(name == 'password'){
            if(value == ''){
                errors.passwordError="Password is Required.!";
            }
            else{
                errors.passwordError="";
            }    
        }
        if(name == 'phoneNumber'){
            if(value == ''){
                errors.phoneNumberError="PhoneNumber is Required.!";
            }
            else{
                errors.phoneNumberError="";
            }
        }
        if(name == 'address'){
            if(value == ''){
                errors.addressError="Address is Required.!";
            }
            else{
                errors.addressError="";
            }
        }
        if(name == 'state'){
            if(value == ''){
                errors.stateError="state is Required.!";
            }
            else{
                errors.stateError="";
            }  
        }
        if(name == 'city'){
            if(value == ''){
                errors.cityError="City is Required.!";
            }
            else{
                errors.cityError="";
            } 
        }
        if(name == 'pincode'){
            if(value == ''){
                errors.pincodeError="Pincode is Required.!";
            }
            else{
                errors.pincodeError="";
            }   
        }
        if(name == 'location'){
            if(value == ''){
                errors.locationError="Select location.!"
            }
            else{
                errors.locationError="";
            }
        }
        if(name == 'email'){
            if(!value){
                errors.emailError="Email is Required.!";
            }
            else{
                let model = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(!model.test(value)){
                    errors.emailError="Invalid Email ID";
                }
                else{
                    errors.emailError='';
                }
            }
        }
        this.setState({
            ...errors
        })
    }
    
    render(){
        return(
            <Row>
                <Col>
                    <Card style={{marginTop:100,marginLeft:500,marginRight:300}}>
                        <CardHeader>
                            <div className='header' style={{marginLeft:100}}><b>REGISTRATION</b></div>
                        </CardHeader>
                        <CardBody>
                            <SplitRegister values={this.state} handleBlur={this.handleBlur}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            
        )
    }
}
export default Register