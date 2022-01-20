import React, { Component } from "react";
import { Card,CardBody, Col, FormGroup, Input, Label,Row } from "reactstrap";

class BasicDetails extends Component{
    render(){
        return(
            <div>
                <Row>
                    <Col md={6} >
                        <FormGroup>
                            <Label htmlFor="fullName">Fullname:</Label>
                            <Input type="text"
                                name="fullName"
                                placeholder="Enter the Fullname"
                                value={this.props.values.fullName}
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />
                            {this.props.values.fullNameError ? <p style={{color:'red'}}>{this.props.values.fullNameError}</p>: null}
                        </FormGroup>
                    </Col>
                    <Col md={6} >
                        <FormGroup>
                            <Label htmlFor="phoneNumber">PhoneNumber:</Label>
                            <Input type="text"
                                name="phoneNumber"
                                placeholder="Enter the Phone Number"
                                value={this.props.values.phoneNumber}
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />
                            {this.props.values.phoneNumberError ? <p style={{color:'red'}}>{this.props.values.phoneNumberError}</p> : null}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="email">Email Id:</Label>
                            <Input type="email"
                                name="email"
                                placeholder="Enter the email ID"
                                value={this.props.values.email}
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />
                            {this.props.values.emailError ? <p style={{color:'red'}}>{this.props.values.emailError}</p>:null}
                        </FormGroup>
                    </Col>
                    <Col md={6} >
                        <FormGroup>
                            <Label htmlFor="password">Password:</Label>
                            <Input type="password"
                                name="password"
                                placeholder="Enter the password"
                                value={this.props.values.password}
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />
                            {this.props.values.passwordError ? <p style={{color:'red'}}>{this.props.values.passwordError}</p>: null}
                        </FormGroup>
                    </Col>    
                </Row>
            </div>
        )
    }
}
export default BasicDetails