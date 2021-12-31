import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CBadge,
  CDataTable,
} from "@coreui/react";
 
import { ListGroup, ListGroupItem,Button,Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { BootstrapTable,TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import CIcon from "@coreui/icons-react";

 
class AssignTo extends React.Component {
    state={
        filterToggle:false,
        changeAssignToggle:false,
        usersList:[],
        tableData:[],
        filterSelectId:"",
        assignedUser:"",
        limit:"",
        assignedToUser:"",
    }
 filterHandleToggle=()=>{
    
    console.log("filter")
    this.setState({filterToggle:!this.state.filterToggle})
 }
 changeAssignToggle=()=>{
    this.setState({changeAssignToggle:!this.state.changeAssignToggle})
 }
 assignedSelectUsers=(e,data)=>{
    
   if(data=="select1"){
    console.log("1",e.target.value)
    this.setState({assignedUser:e.target.value})
   }
   if(data=="limit"){
    console.log("limt",e.target.value)
    this.setState({limit:e.target.value})
   }
   if(data=="select2"){
    console.log("2",e.target.value)
    this.setState({assignedToUser:e.target.value})
   }
 }
 assignSubmitHandle=()=>{
  
   var loginCompanyId = localStorage.getItem("loginCompanyId");
   axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
   let obj = {};
   obj.assignedUser=this.state.assignedUser;
   obj.limit=parseInt(this.state.limit);
   obj.assignedToUser=this.state.assignedToUser;
   console.log("obj",obj)
  axios.post("http://localhost:3000/user/api/get/change/assigne/leads/"+loginCompanyId,obj)
        .then((response)=>{
          console.log(response);
          this.setState({assignedUser:"",limit:"",assignedToUser:"",changeAssignToggle:!this.state.changeAssignToggle})
        })
        .catch((error)=>{console.log(error.response)})
 }
 filterUsersHandleChange=(e)=>{
  console.log(e.target.value);
  this.setState({filterSelectId:e.target.value})
 }
 filterSubmitHandle=()=>{
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
  axios.get("http://localhost:3000/user/api/get/assignedleads/"+this.state.filterSelectId)
        .then((response) => {
          console.log("filter",response.data.data)
          let array1=[]
          response.data.data.data.map((data,index)=>{
              array1.push({name:data.leadId.lead_name,phone:data.leadId.phone,email:data.leadId.email,assignedTo:data.assignedTo[0].fullName,})
          })
         
          this.setState({ tableData: array1,filterToggle:!this.state.filterToggle });
        })
        .catch((error)=>{console.log(error.response)})
 }
 componentDidMount(){
  var loginCompanyId = localStorage.getItem("loginCompanyId");
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
  axios.get("http://localhost:3000/user/api/get/Admin/leads/" + loginCompanyId)
  .then((response) => {
    console.log("res table",response);
    console.log("r table",response.data.data.data);
    let array=[]
    response.data.data.data.map((data,index)=>{
      // console.log(data.leadId.lead_name)
      array.push({name:data.leadId.lead_name,phone:data.leadId.phone,email:data.leadId.email,assignedTo:data.assignedTo[0].fullName,})
    })
    //console.log(array)
    this.setState({ tableData: array });
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
              <CCardHeader><CRow><CCol>
                <strong>Assigned To</strong>
                <Button color="primary" style={{float:"right"}}  id="Popover" 
                  onClick={this.changeAssignToggle} >Change Assign</Button>
                <Popover style={{width:"275px",marginTop:"8px"}} placement="bottom" 
                  isOpen={this.state.changeAssignToggle} target="Popover" >
                  <CCol xs="12" md="12">
                    <strong style={{fontSize:"13px"}}>Lead assigned user</strong>
                    <CInputGroup>
                      <CSelect custom name="assignedTo" id="assignedTo"
                          style={{margin:"6px 0px"}} onChange={(e)=>this.assignedSelectUsers(e,"select1")}
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
                    <strong>limit</strong>
                    <CInputGroup>
                      <CInput
                        // autoComplete="username"
                        // value={this.state.username}
                         onBlur={(e)=>this.assignedSelectUsers(e,"limit")}
                         //onBlur={this.userEventHandler}
                      />
                    </CInputGroup>
                        <strong style={{fontSize:"13px"}}>Lead assignedTo user</strong>
                    <CInputGroup>
                    <CSelect custom name="assignedTo" id="assignedTo"
                      style={{margin:"6px 0px"}} onChange={(e)=>this.assignedSelectUsers(e,"select2")}
                      >
                        <option value="">Please select</option> 
                        {this.state.usersList.map((list1) => {
                          return (
                            <option value={list1._id} key={list1._id}>
                              {list1.fullName}
                            </option>
                          );
                        })}
                    </CSelect>
                    </CInputGroup>
                    <Button outline color="primary" style={{margin: "4% 35%"}} 
                        onClick={this.assignSubmitHandle} >Submit</Button>
                  </CCol>
                </Popover>

                {/* //filter */}
                <Button color="primary" style={{float:"right",margin:"0px 10px"}} id="Popover1" 
                    onClick={this.filterHandleToggle}>Filter</Button>
                <Popover style={{width:"275px",marginTop:"8px"}} placement="bottom" 
                      isOpen={this.state.filterToggle} target="Popover1" >
                  <CCol xs="12" md="12">
                    <strong style={{fontSize:"13px"}}>Lead assigned user</strong>
                    <CInputGroup>
                    <CSelect custom name="assignedTo" id="assignedTo"
                      style={{margin:"6px 0px"}} onChange={this.filterUsersHandleChange}
                       >
                        <option value="">Please select</option> 
                        {this.state.usersList.map((list) => {
                          return (
                            <option value={list._id} key={list._id}>
                              {list.fullName}
                            </option>
                          );
                        })}
                     </CSelect>
                    </CInputGroup>
                    <Button outline color="primary" style={{margin: "4% 35%"}} 
                      onClick={this.filterSubmitHandle}>Submit</Button>
                  </CCol>
                </Popover>
 
                </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <BootstrapTable   data={this.state.tableData} striped keyField='phone' pagination  hover={true}>
                    <TableHeaderColumn width="5" dataField="name" >Name</TableHeaderColumn>
                    <TableHeaderColumn width="15" dataField="phone" >Mobile</TableHeaderColumn>
                    <TableHeaderColumn width="15" dataField="email" >Email</TableHeaderColumn>
                    <TableHeaderColumn width="10" dataField="assignedTo" >AssignedTo</TableHeaderColumn>
                </BootstrapTable>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
      </div>
    );
  }
}
 
export default AssignTo

// Chandrakanth Veeraganti1:29 PM
//  let obj={};
//         obj.phone=this.state.phoneNumber;
//         obj.assignedTo=this.state.assignedTo.value;
//         obj.callDate=this.state.callDate;