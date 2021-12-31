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
} from "@coreui/react";
import axios from "axios"
import "./Dashboard.css"
import { ListGroup, ListGroupItem,Button } from "reactstrap";

class Dashboard extends React.Component {
  state={
    usersList:[],
    assignedId:"",
    status:[],
    isOpenBnDates:false,
    dateFilter:"today",
    today:true,
    yesterday:false,
    last_7_days:false,
    last_30_days:false,
    betwenn_dates:false,
    startDate:"",
    endDate:"",
    total_duration:'',
    average_duration:'',
  }
  selectUsersHandleChange=(e)=>{
    console.log("leads assigned users",e.target.value)
    this.setState({assignedId:e.target.value})
    this.dateFilterHandle("assignedTo")
  }
  startDateHandleChange=(e)=>{
    console.log(e.target.value)
    this.setState({startDate:e.target.value})
    this.dateFilterHandle("select_range")
    this.setState({isOpenBnDates:this.state.isOpenBnDates})
  }
  lastDateHandleChange=(e)=>{
    console.log(e.target.value)
    this.setState({endDate:e.target.value})
    this.dateFilterHandle("select_range")
  }
  dateFilterHandle=(data)=>{
    console.log(data)
    let obj = {};
    if(data=="today"){
      this.setState({today:true,yesterday:false, last_7_days:false,last_30_days:false, betwenn_dates:false,})
      obj.filter="today"
    }
    if(data=="yesterday"){
      this.setState({today:false,yesterday:true, last_7_days:false,last_30_days:false, betwenn_dates:false,})
      obj.filter="yesterday"
    }
    if(data=="last_7_days"){
      this.setState({today:false,yesterday:false, last_7_days:true,last_30_days:false, betwenn_dates:false,})
      obj.filter="last_7_days"
    }
    if(data=="last_30_days"){
      this.setState({today:false,yesterday:false, last_7_days:false,last_30_days:true, betwenn_dates:false,})
     
      //this.setState({dateFilter:"last_30_days"})
      obj.filter="last_30_days"
    }
    if(data=="assignedTo"){
      obj.assignedTo=this.state.assignedId;
    }
    if(data=="select_range"){
      this.setState({today:false,yesterday:false, last_7_days:false,last_30_days:false, betwenn_dates:true,})
      this.setState({isOpenBnDates:!this.state.isOpenBnDates})
      // if(this.state.startDate!=""||this.state.endDate!=""){
      //   this.setState({isOpenBnDates:this.state.isOpenBnDates})
      // }
      if(this.state.startDate!=""&&this.state.endDate!=""){
        obj.filter="select_range"
        obj.from=this.state.startDate;
        obj.to=this.state.endDate;
      }else{console.log("else select range"); return;}

    }
    var loginCompanyId = localStorage.getItem("loginCompanyId");
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken"); 
    console.log("obj",obj)
    axios.post("http://localhost:3000/user/api/admin/dashboard/filter/" + loginCompanyId,obj)
          .then((response)=>{
            console.log("api",response)
            this.setState({
              status:response.data.data.result,
               //callLogsTime:response.data.data.callLogs,
            })
            response.data.data.callLogs.map((value)=>{
              let totalCallMin=parseInt((value.total_duration/60));
              let totalMin=parseInt(value.total_duration % 60);
              let totalCall=totalCallMin+':'+totalMin;
              let averageCallMin=parseInt((value.average_duration/60));
              let averageMin=parseInt(value.average_duration % 60);
              let averagecall=averageCallMin+':'+averageMin;
              this.setState({total_duration:totalCall,average_duration:averagecall},()=>{console.log(this.state.total_duration,this.state.average_duration)})
             })
          })
          .catch((error)=>{console.log(error.response)})
  }
  //617f807ba1787711a03e70d1
  componentDidMount=()=>{
     var loginCompanyId = localStorage.getItem("loginCompanyId");
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
    axios.get("http://localhost:3000/user/api/admin/dashboard/" + loginCompanyId)
          .then((response)=>{
            console.log("admin",response)
            this.setState({status:response.data.data.result})
            response.data.data.callLogs.map((value)=>{
              let totalCallMin=parseInt((value.total_duration/60));
              let totalMin=parseInt(value.total_duration % 60);
              let totalCall=totalCallMin+':'+totalMin;
              let averageCallMin=parseInt((value.average_duration/60));
              let averageMin=parseInt(value.average_duration % 60);
              let averagecall=averageCallMin+':'+averageMin;
              this.setState({total_duration:totalCall,average_duration:averagecall})
             })
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
       <CCol xs="5" md="5" style={{ margin: "0% 0% 0% 25%" }}>
            <CCard>
              <CCardHeader><strong>Dashboard</strong> </CCardHeader>
              <CCardBody>
              <CFormGroup row>
                 
                  <div><Button type="button" outline color="primary" style={{padding:"17px 10px 17px 10px"}} className="mystyle" 
                     className={this.state.today?"active":"inactive"} 
                    onClick={()=>this.dateFilterHandle("today")}>today</Button>
                  </div>
                  <div><Button type="button" outline color="primary" style={{padding:"17px 10px 17px 10px",margin:"0px 8px"}} className="mystyle" 
                  // className={this.state.dateFilter=="yesterday"?"active":"inactive"}
                  className={this.state.yesterday?"active":"inactive"} 
                    onClick={()=>this.dateFilterHandle("yesterday")}>yesterday</Button>
                  </div>
                  <div><Button type="button" outline color="primary" className="mystyle"
                  className={this.state.last_7_days?"active":"inactive"} 
                   onClick={()=>this.dateFilterHandle("last_7_days")}>last 7<br/> days</Button>
                   </div>
                  <div><Button type="button" outline color="primary" className="mystyle" style={{margin:"0px 8px"}}
                  className={this.state.last_30_days?"active":"inactive"} 
                    onClick={()=>this.dateFilterHandle("last_30_days")}>last <br/>30 days</Button>
                  </div>
                  <div><Button type="button" outline color="primary" className="mystyle"
                  className={this.state.betwenn_dates?"active":"inactive"}  
                   onClick={()=>this.dateFilterHandle("select_range")}>between<br/> dates</Button>
                  </div>
                 
                </CFormGroup>
                <CCollapse show={this.state.isOpenBnDates}>
                  <CFormGroup  row>
                    <CCol xs="12" md="6">
                    Start date
                    <CInputGroup>
                      <CInput type="date" id="date-input" name="date input" placeholder="date"
                        onChange={this.startDateHandleChange} 
                      />
                    </CInputGroup>
                    </CCol>
                    <CCol xs="12" md="6">
                      Last date
                    <CInputGroup>
                      <CInput type="date" id="date-input" name="date input" placeholder="date"
                          onChange={this.lastDateHandleChange} 
                      />
                    </CInputGroup>
                    </CCol>
                  </CFormGroup>
                </CCollapse>
                <CFormGroup row>
                 <CCol xs="12" md="12">
                 Lead assigned user
                 <CInputGroup>
                 <CSelect
                          custom
                          name="assignedTo"
                          id="assignedTo"
                         onChange={this.selectUsersHandleChange}
                          
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
                 </CCol>
                 </CFormGroup>
                 <CFormGroup row>
                 <CCol xs="12" md="12">
                    
                  <ListGroup>
                    <ListGroupItem style={{ backgroundColor: "blue", color: "white" }}> <strong>OUTBOUND</strong></ListGroupItem>
                    <ListGroupItem>Total time <span style={{float:"right"}}>{this.state.total_duration==""?"0":(<span>{this.state.total_duration}min</span>)}</span></ListGroupItem>
                    <ListGroupItem>Average time <span style={{float:"right"}}>{this.state.average_duration==""?"0":(<span>{this.state.average_duration}min</span>)}</span></ListGroupItem>
                  </ListGroup>
                </CCol>
                </CFormGroup>
                <CFormGroup row>
                 <CCol xs="12" md="12">
                  <ListGroup>
                    <ListGroupItem style={{ backgroundColor: "blue", color: "white" }}><strong>STATUS</strong></ListGroupItem>
                    {this.state.status!=""?
                   <span>{this.state.status.map((value,index)=>{
                   return <ListGroupItem key={index}>{value.resultName}<span style={{float:"right"}}>{value.count}</span></ListGroupItem>
                   })}</span>
                    :null
                    }
                    
                    
                  </ListGroup>
                </CCol>
                </CFormGroup>
              </CCardBody>
            </CCard>
       </CCol>
      </div>
    );
  }
}
export default Dashboard;
