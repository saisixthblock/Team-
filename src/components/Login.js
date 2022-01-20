import React, { Component } from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label,Row} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Register from './Register';

class Login extends Component{
    state={
        email:'',
        password:'',
        emailError:'',
        passwordError:'',
    }

    handleChange=(name,value)=>{
        let errors = this.state;
        if(name  == 'email'){   
            if(value != ''){
                let model = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(!model.test(value)){
                    errors.emailError ="Invalid Email ";
                    errors.email = value;
                }
                else{
                    errors.emailError ='';
                    errors.email = value;
                }
            }
            else{
                errors.emailError ="Email required.!";
                errors.email = value;
            }
        }
        if(name == 'password'){   
            if(value != ''){
                errors.passwordError ='';
                errors.password = value;
            }
            else{
                errors.passwordError ="Password Required.!";
                errors.password = value;
            }
        }
        this.setState({
            ...errors
        })
    }
    handleBlur=(e)=>{
        let errors = this.state;
        if(e.target.name == "email"){
            if(e.target.value == ''){
                errors.emailError="Email Required";
            }
            else{
                let model = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if(!model.test(e.target.value)){
                    errors.emailError ="Invalid Email ";
                }
                else{
                    errors.emailError='';
                }
            }
        }
        if(e.target.name == "password"){
            if(e.target.value == ''){
                errors.passwordError="Password Required"
            }
            else{
                errors.passwordError=''
            }
        }
        this.setState({...errors})
    }

    handleSumbit=(e)=>{
        //console.log(values)
        e.preventDefault();
        let emailError,passwordError;
        if(!this.state.email){
            emailError = "Email Required.!";
        }
        if(!this.state.password){
            passwordError = "Password Required.!";
        }
        this.setState({
            emailError:emailError,
            passwordError:passwordError
        }) 
    }
    render(){
        return(
            <Row>
                <Col>
                    <Card style={{marginTop:100,marginLeft:500,marginRight:400}} >
                        <CardHeader>
                        <div className='header'><b> LOGIN</b></div><br/>
                        </CardHeader>
                        <CardBody >
                            <Form onSubmit={this.handleSumbit}>
                                <Row>
                                    <Col md={6} >
                                        <FormGroup>
                                            <Label htmlFor='email'>Email:</Label>
                                            <Input type='text' 
                                                name='email'
                                                placeholder='Email Id'
                                                value={this.state.email}
                                                onChange={(e)=>this.handleChange(e.target.name, e.target.value)}
                                                onBlur={this.handleBlur}
                                            />            
                                            {this.state.emailError?<p style={{color:'red'}}>{this.state.emailError}</p>: null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} >
                                        <FormGroup>
                                            <Label htmlFor='password'>Password:</Label>
                                            <Input type='password'
                                                name='password'
                                                placeholder='Password'
                                                value={this.state.password}
                                                onChange={(e)=>this.handleChange(e.target.name, e.target.value)}
                                                onBlur={this.handleBlur}
                                            />
                                            {this.state.passwordError? <p style={{color:'red'}}>{this.state.passwordError}</p>:null}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button type='submit' id='test-button' outline color='success'>Login</Button> &nbsp;
                                        If Not Registered? Please <Link to='/register' component={<Register/>}>Register</Link>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            
        )
    }
}
export default Login