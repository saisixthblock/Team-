import React, { Component } from "react";
import { Card,CardBody, Col, FormGroup, Input, Label,Row } from "reactstrap";

class Address extends Component{
    render(){
        return(
            <div>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="address">Address:</Label>
                            <Input type="textarea"
                                name="address"
                                value={this.props.values.address}
                                placeholder="Enter the address"
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />
                            {this.props.values.addressError ? <p style={{color:'red'}}>{this.props.values.addressError}</p> : null}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label htmlFor="city">City:</Label>
                            <Input type="text"
                                name="city"
                                value={this.props.values.city}
                                placeholder="Enter the city"
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />
                            {this.props.values.cityError ? <p style={{color:'red'}}>{this.props.values.cityError}</p>: null}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="pincode">pincode:</Label>
                            <Input type="text"
                                name="pincode"
                                placeholder="Enter the pincode"
                                value={this.props.values.pincode}
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />
                            {this.props.values.pincodeError ? <p style={{color:'red'}}>{this.props.values.pincodeError}</p> : null}
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label htmlFor="state">State:</Label>
                        <Input type="text"
                            name="state"
                            placeholder="Enter the state"
                            value={this.props.values.state}
                            onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                            onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                        />
                        {this.props.values.stateError ? <p style={{color:'red'}}>{this.props.values.stateError}</p> : null}
                    </FormGroup>
                    </Col>
                </Row>    
            </div>
            
        )
    }
}
export default Address