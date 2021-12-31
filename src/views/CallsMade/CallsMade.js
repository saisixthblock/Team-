import React from "react";
import {
  CBadge,
  CInput,
  CInputGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CSelect,
  CDataTable,
  CButton,
} from "@coreui/react";
import { ListGroup, ListGroupItem,Button,Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Moment from 'moment';

import { Link } from "react-router-dom";
import axios from "axios";
import { BootstrapTable,TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import CIcon from "@coreui/icons-react";
import { objectOf } from "prop-types";

 
class CallsMade extends React.Component {
    state={
        filterToggle:false,
        tableData:[],
        filterSelect:"",
        filterPhone:"",
        filterDate:"",
        usersList:[],
    }
    editButton=(cell,row)=>{
      return(<p hreff="#" onClick={()=>this.handleClick(cell,row)} style={{cursor:"pointer"}}><span style={{color:"blue"}}>{cell}</span></p>)
    }
    handleClick=(cell,row)=>{
      this.props.history.push(`/createLeads/${row.id}`);
    }
 filterHandleToggle=()=>{
    console.log("filter")
    this.setState({filterToggle:!this.state.filterToggle})
 }
 assignedSelectUsers=(e,data)=>{
   console.log(data,e.target.value)
   if(data=="select"){
     this.setState({filterSelect:e.target.value})
   }
   if(data=="phone"){
    this.setState({filterPhone:e.target.value})
  }
  if(data=="date"){
    this.setState({filterDate:e.target.value})
  }
 }
 assignSubmitHandle=()=>{
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
  let obj={};
  obj.phone=this.state.filterPhone;
  obj.assignedTo=this.state.filterSelect;
  obj.callDate=this.state.filterDate;
  axios.post("http://localhost:3000/user/api/callsmade/filter",obj)
        .then((response)=>{
          console.log(response)
          this.setState({filterToggle:!this.state.filterToggle})
        })
        .catch((error)=>{console.log(error.response)})
 }
 componentDidMount(){
  var loginCompanyId = localStorage.getItem("loginCompanyId");
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
  axios.get("http://localhost:3000/user/api/get/project/callmadeleads/" + loginCompanyId)
  .then((response) => {
    console.log("res",response);
    console.log("res",response.data.data.data);
    let array = [];
    response.data.data.data.map((value,index)=>{
      //console.log(value.callDate.slice(0,10))
      array.push({Sno:index+1,id:value.leadId._id,name:value.leadId.lead_name,phone:value.leadId.phone,email:value.leadId.email,result:value.result.name,subResult:value.subResult,assignedTo:value.assignedTo.fullName,callDate:value.callDate.slice(0,10)})
    })
    this.setState({tableData:array})
    console.log(array)
  })
  .catch((error)=>{console.log(error)})
  axios.get("http://localhost:3000/user/api/all/company/members/" + loginCompanyId)
      .then((response) => {
        console.log("assignedTo",response.data.data.data);
        this.setState({ usersList: response.data.data.data });
      })
      .catch((error)=>{console.log(error)})
 }
  render() {
    return (
      <div>
        <div>
          <CCol>
            <CCard>
              <CCardHeader>
                <strong>Calls made</strong>
                
                <Button color="primary" style={{float:"right",margin:"0px 10px"}} id="Popover" onClick={this.filterHandleToggle}>Filter</Button>
                <Popover style={{width:"275px",marginTop:"8px"}} placement="bottom" 
                  isOpen={this.state.filterToggle} target="Popover" >
                  <CCol xs="12" md="12">
                    <strong style={{fontSize:"13px"}}>Select user</strong>
                    <CInputGroup>
                      <CSelect custom name="assignedTo" id="assignedTo"
                          style={{margin:"6px 0px"}} onChange={(e)=>this.assignedSelectUsers(e,"select")}
                        >
                          <option value="">Please select</option>
                            {this.state.usersList.map((lists) => {
                            return (
                              <option value={lists._id} key={lists._id}>
                                {lists.fullName}
                              </option>
                            );
                          })}   
                      </CSelect>
                    </CInputGroup>
                    <strong>Phone number</strong>
                    <CInputGroup>
                      <CInput
                        // autoComplete="username"
                        // value={this.state.username}
                         onBlur={(e)=>this.assignedSelectUsers(e,"phone")}
                         //onBlur={this.userEventHandler}
                      />
                    </CInputGroup>
                        <strong style={{fontSize:"13px"}}>Call Date</strong>
                    <CInputGroup>
                    <CInput type="date" id="date-input" name="date input" placeholder="date"
                               onChange={(e)=>this.assignedSelectUsers(e,"date")}     
                                />
                    </CInputGroup>
                    <Button outline color="primary" style={{margin: "4% 35%"}} 
                        onClick={this.assignSubmitHandle} >Submit</Button>
                  </CCol>
                </Popover>
              </CCardHeader>
              <CCardBody>
                 <BootstrapTable data={this.state.tableData} striped keyField='phone' pagination  hover={true}>
                    <TableHeaderColumn width="5" dataField="Sno" >Sno</TableHeaderColumn>
                    <TableHeaderColumn width="12" dataField="name" dataFormat={this.editButton} >Name</TableHeaderColumn>
                    <TableHeaderColumn width="8" dataField="phone" >mobile</TableHeaderColumn>
                    <TableHeaderColumn width="14" dataField="email" >Email</TableHeaderColumn>
                    <TableHeaderColumn width="9" dataField="result" >Result</TableHeaderColumn>
                    <TableHeaderColumn width="8" dataField="subResult" >Sub Result</TableHeaderColumn>
                    <TableHeaderColumn width="10" dataField="assignedTo" >Assigned To</TableHeaderColumn>
                    <TableHeaderColumn width="8" dataField="callDate"  >Call Date</TableHeaderColumn>
                </BootstrapTable>



                 
              </CCardBody>
            </CCard>
          </CCol>
        </div>
      </div>
    );
  }
}
 
export default CallsMade