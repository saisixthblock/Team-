import React, { Component } from "react";
import { Card,Row,Col, FormGroup, Label, Input } from "reactstrap";

class Additional extends Component{
    render(){
        return(
            <div>
                <Row>
                    <Col md={4}>
                        <FormGroup>
                            <Label htmlFor="location">Location:</Label>
                            <Input type="select" 
                                name="location"
                                placeholder="Select"
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                                value={this.props.values.location}>
                                    <option value="">Select</option>
                                    <option value='Hyderabad'>Hyderabad</option>
                                    <option value='Chennai'>Chennai</option>
                                    <option value='Banglore'>Banglore</option>
                            </Input>
                            {this.props.values.locationError ? <p style={{color:'red'}}>{this.props.values.locationError}</p>: null}       
                        </FormGroup>
                    </Col>
                    <Col md={8}>
                        <FormGroup>
                            <Label htmlFor="gender">Gender:</Label><br/>
                            <Input type="radio"
                                name="gender"
                                value=""
                                checked={this.props.values.gender.male}
                                id="male" 
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />&nbsp;
                            <Label htmlFor="male">male</Label>
                            <Input style={{marginLeft:5}} type="radio"
                                name="gender"
                                value=""
                                checked={this.props.values.gender.female}
                                id="female" 
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />&nbsp;
                            <Label htmlFor="female">female</Label>
                            {this.props.values.genderError ? <p style={{color:'red'}}>{this.props.values.genderError}</p>: null}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                           <Label htmlFor="checkbox"> Time Slot :</Label><br/>
                           <Input type="checkbox" 
                                name="checkbox" 
                                id="morning"
                                value={this.props.values.checkbox.morning}
                                checked = {this.props.values.checkbox.morning}
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                           />
                           <Label>Morning (9:00-12:00)</Label>
                           <Input style={{marginLeft:25}} 
                                type="checkbox" 
                                name="checkbox" 
                                id="evening"
                                value={this.props.values.checkbox.evening}
                                checked={this.props.values.checkbox.evening}
                                onChange={(e)=>this.props.handleChange(e.target.name, e.target.value)}
                                onBlur={(e)=>this.props.handleBlur(e.target.name,e.target.value)}
                            />
                            <Label>Evening (6:00-9:00)</Label>
                            {this.props.values.checkboxError ? <p style={{color:'red'}}>{this.props.values.checkboxError}</p>: null}
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Additional