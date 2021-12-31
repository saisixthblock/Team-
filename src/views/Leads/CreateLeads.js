import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
import CIcon from "@coreui/icons-react";
import { DocsLink } from "src/reusable";
import axios from "axios";
import Swal from "sweetalert2";
import Select from 'react-select';
import "./Leads.css"

class CreateLeads extends React.Component {
  state = {
    id: this.props.match.params.id,
    name: "",
    email: "",
    phone: "",
    address: "",
    assignedTo: "",
    usersList: [],
    extrafieldResult:[],
    result:[],
    resultHandle:[],
    selectResult:[],
    openResult:false,
    select:"",
    leadId:"",
    leadLogId:"",
    extraFormObject:[],
    extraCheckboxArray:[],
    resultTextInput:"",
    resultTextArea:"",
    resultRadios:"",
    resultCheckbox:[],
    subResult:[],
    addLeadLogResult:false,
    subResultCheckbox:false,
  };
  
  textInputExtraFieldHandle=(e,index)=>{
    let arr = this.state.extraFormObject?this.state.extraFormObject:[];
    arr[index]= {value:e.target.value};
    this.setState({
      ...this.state,
      extraFormObject:arr,
    })
  }
  datePickerExtraFieldHandle=(e,index)=>{
    let arr2 = this.state.extraFormObject?this.state.extraFormObject:[];
    arr2[index]= {value:e.target.value};
    this.setState({
      ...this.state,
      extraFormObject:arr2,
    })
  }
  textAreaExtraFieldHandle=(e,index)=>{
    let arr1 = this.state.extraFormObject?this.state.extraFormObject:[];
    arr1[index]= {value:e.target.value};
    this.setState({
      ...this.state,
      extraFormObject:arr1,
    })
  }
  checkboxHandleChange =(e,index,option,idx)=>{
    let array = this.state.extraFormObject[index]?this.state.extraFormObject[index]:[];
    array[idx]=e.target.checked;
    this.setState({
      extraCheckboxArray:array,
    })
    let array1 = this.state.extraFormObject;
    array1[index] = array;
    this.setState({
      extraFormObject:array1,
    })
  }
  radioHandleChange =(e,index,idx1)=>{
    let array3 = [];
    array3[idx1]=e.target.checked;
    this.setState({
      extraCheckboxArray:array3,
    })
    let array5 = this.state.extraFormObject;
    array5[index] = array3;
    this.setState({
      extraFormObject:array5,
    })
  }
  addLeadLogHandle =()=>{
    //console.log("addLeadLogHandle",this.props.match.params.id);
    let obj = {};
    obj.userId = localStorage.getItem("loginUserId");
    obj.company = localStorage.getItem("loginCompanyId");
    obj.leadId = this.props.match.params.id;
    console.log("button addleadlog----obj",obj);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
    axios.post("http://localhost:3000/user/api/create/new/leadlog",obj)
          .then((response)=>{
            console.log("response",response);
           
            this.setState({addLeadLogResult:!this.state.addLeadLogResult,})
            this.leadUpdateApi();
           // this.props.history.push("/leads")
          })
          .catch((error)=>{console.log(error.response)})
  }
  resultHandleChange=(data)=>{
    //result lo select onchange
    let arr =[];
    this.state.result.map((list)=>{
      return(
        list.resultId==data.value?arr.push(list.taskData,data.value):""
      )
    })
    this.setState({select:data,resultHandle:arr,});
   
  }
  subResultCheckboxHandle=(e)=>{
    this.setState({subResultCheckbox:!this.state.subResultCheckbox})
  }
  resultSubResultHandle=(e,option,idx)=>{
    let today = new Date().toISOString().slice(0, 10)
     
    if(today<=e.target.value){
        var currentDate = new Date();
        this.setState({subResult:e.target.value})
    }else{
        if(e.target.checked==true){
          let Array = this.state.subResult?this.state.subResult:[];
              Array[idx] = {label:option.text,value:option.text} 
              this.setState({subResult:Array},()=>{console.log(this.state.subResult)})
          }
        this.setState({subResult:e.target.value},()=>{console.log(this.state.subResult)})
    }
  }
  getLeadLogId=()=>{
    //if(this.state.leadId !=""){
      axios.get("http://localhost:3000/user/api/get/lead/"+ this.state.leadId)
          .then((response)=>{
            console.log("res--getLogId",response);
            this.setState({
              extraFormObject:response.data.data.data.extraFormObject,
              name: response.data.data.data.lead_name,
              email: response.data.data.data.email,
              phone: response.data.data.data.phone,
              address: response.data.data.data.address,
              assignedTo: response.data.data.data.assignedTo._id,
              textField:response.data.data.data.extraFormObject.textField,
              textArea:response.data.data.data.extraFormObject.textArea,
              radios:response.data.data.data.extraFormObject.radios,
              checkbox:response.data.data.data.extraFormObject.checkbox,
              //leadLogId:response.data.data.leadsLogData._id,
              //leadId:this.props.match.params.id,
             // 
            })
            if(this.state.id=="new"){
              this.setState({ leadLogId:response.data.data.leadsLogData._id})
            }
            
          })
          .catch((error)=>{console.log(error.response)})
   // }
  }
  
  updateLeadLog=()=>{
    let obj = {};
    obj.result = this.state.resultHandle[1];
    obj.subResult = this.state.subResult;
    obj.leadLogId = this.state.leadLogId;
    this.state.resultHandle[0].map((selectData)=>{
     // console.log(selectData,selectData.element)
      if(selectData.element=="DatePicker"){
          if(this.state.subResultCheckbox == true){
            obj.nextcallDate=this.state.subResult;
          }
          else{
            obj.apptDate=this.state.subResult; 
          }
      }
    })
    console.log("obj-res",obj)
    //console.log("lead",this.state.leadId);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
     axios.put("http://localhost:3000/user/api/update/only/leadlog/"+this.state.leadId,obj)
          .then((response)=>{
            console.log(response);
            this.props.history.push("/leads")
          })
          .catch((error)=>{console.log(error.response)})
  }
    resultHandleSubmit = async()=>{
      await this.getLeadLogId();
      this.updateLeadLog();
      
      
     // let leadLogId1 = "";
    // await  axios.get("http://localhost:3000/user/api/get/lead/"+this.state.leadId)
    //   .then((response)=>{
    //     console.log(response);
    //      leadLogId1 = response.data.data.leadsLogData._id
    //      console.log(leadLogId1);
    //      this.setState({leadLogId:response.data.data.leadsLogData._id})
    //   })
    //   .catch((error)=>{console.log(error.response)})

   // this.state.resultHandle
    //let resultArray = [];
    //this.state.result.map((arr)=>{return(arr.resultId==this.state.resultHandle[1]?)})
    //let today = new Date().toISOString().slice(0, 10)
   // console.log("resultHandle",this.state.resultHandle[0]);
   
    //console.log("resultHandleSubmit",this.state.resultHandle[1]);
  }
  
  leadUpdateApi = ()=>{
    console.log(this.props.match.params.id)
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
  axios.get("http://localhost:3000/user/api/get/lead/" + this.props.match.params.id)
    .then((response) => {
      console.log("resss1",response);
      this.getLeadLogId();
      //console.log("resss--result",response.data.data.leadsLogData.result);
      if(response.data.data.leadsLogData==null){
        //console.log("if");    
        this.setState({ addLeadLogResult:!this.state.addLeadLogResult,})
      }else{
       // console.log("elsenull")
       this.setState({ openResult:!this.state.openResult,leadLogId:response.data.data.leadsLogData._id})
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
  }
  componentDidMount() {
    if (this.state.id != "new") {
      this.setState({leadId:this.props.match.params.id});
     this.leadUpdateApi();
    
    }
    var loginCompanyId = localStorage.getItem("loginCompanyId");
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("loginToken");
    axios.get("http://localhost:3000/user/api/all/company/members/" + loginCompanyId)
          .then((response) => {
            //console.log("assignedTo",response.data.data.data);
            this.setState({ usersList: response.data.data.data });
          })
          .catch((error) => {
            console.log(error.response);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong! check it once",
            });
          });
    axios.get("http://localhost:3000/user/api/get/company/custom/forms")
          .then((response)=>{
            //console.log("data",response.data.data.data[0]);
            this.setState({
              extrafieldResult:response.data.data.data[0].extrafieldObject,
              result:response.data.data.data[0].formObject,
            },()=>{console.log(this.state.extrafieldResult)})
          })
          .catch((error)=>{console.log(error)})
          var resultlistarray =[];
      axios.get("http://localhost:3000/user/api/get/company/result/"+loginCompanyId)
            .then((response)=>{
              //console.log("get/company/result",response.data.data.data)
                response.data.data.data.map((results)=>{return(resultlistarray.push({ value:results._id, label:results.name}))})
                this.setState({selectResult:resultlistarray})
            })
            .catch((error)=>{console.log(error)})

  }
  
  render() {
    return (
      <Formik
        enableReinitialize
        initialValues={this.state}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          phone: Yup.string()
            .required("Number is required")
            .min(10, "Minimum 10 numbers")
            .max(13, "Maximum 13 numbers"),
          address: Yup.string().required("Education is required"),
          assignedTo: Yup.string().required("select opctions"),
        })}
        onSubmit={(values) => {
         // console.log("submit",values);
          let obj = {};
          obj.lead_name = values.name;
          obj.email = values.email;
          obj.assignedTo = values.assignedTo;
          obj.phone = values.phone;
          obj.address = values.address;
          obj.extraFormObject= this.state.extraFormObject;
          console.log("obj--create lead",obj);

          if (this.state.id == "new") {
           // console.log("submit", values);
            var loginUserId = localStorage.getItem("loginUserId");
            var loginCompanyId = localStorage.getItem("loginCompanyId");
            axios.defaults.headers.common["Authorization"] =
              localStorage.getItem("loginToken");
            axios
              .post("http://localhost:3000/user/api/create/new/lead/" +loginCompanyId +"/" +loginUserId,obj)
              .then((response) => {
                console.log(response.data);
                //this.props.history.push("/leads");
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "leads created successfully",
                });
                this.setState({
                  openResult:!this.state.openResult,
                  name:response.data.data.data.lead_name,
                  email: response.data.data.data.email,
                   assignedTo :response.data.data.data.assignedTo,
                  phone : response.data.data.data.phone,
                  address : response.data.data.data.address,
                  leadId:response.data.data.data._id,
                 })
                 this.getLeadLogId();
                // this.getLeadLog();
              })
              .catch((error) => {
                console.log(error.response);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: error.response.data.message.message,
                });
              });
          } else {
            console.log("else");
            axios
              .put(
                "http://localhost:3000/user/api/update/only/lead/" +
                  this.state.id,
                obj
              )
              .then((response) => {
                console.log(response.data);
                this.props.history.push("/leads");
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "leads details updated successfully",
                  //showConfirmButton: false,
                  // timer: 1500,
                });
              })
              .catch((error) => {
                console.log(error.response);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong! check it once",
                });
              });
          }
        }}
        render={({
          errors,
          status,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
        <div>      
          <Form onSubmit={handleSubmit}>
            <CCol>
              <CCard>
                <CCardHeader>
                  {this.state.id == "new" ? "Create lead" : "Update lead"}
                    <button style={{ float: "right",border: "1px solid #00000040",color:"white",backgroundColor:"#5dcb5b"}} 
                        onClick={this.handleSubmit}><CIcon name="cil-save"/>
                    </button>
                </CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol xs="12" md="4">
                      Name
                      <CInputGroup>
                        <CInput
                          id="name"
                          name="name"
                          placeholder="enter name"
                          value={values.name}
                          onChange={handleChange("name")}
                          onBlur={handleBlur("name")}
                        />
                      </CInputGroup>
                      {touched.name && errors.name ? (
                        <span style={{ color: "red" }}>{errors.name}</span>
                      ) : null}
                    </CCol>
                    <CCol xs="12" md="4">
                      Mail
                      <CInputGroup>
                        <CInput
                          id="email"
                          name="email"
                          placeholder="enter email"
                          value={values.email}
                          onChange={handleChange("email")}
                          onBlur={handleBlur("email")}
                        />
                      </CInputGroup>
                      {touched.email && errors.email ? (
                        <span style={{ color: "red" }}>{errors.email}</span>
                      ) : null}
                    </CCol>
                    <CCol xs="12" md="4">
                      Phone number
                      <CInputGroup>
                        <CInput
                          id="phone"
                          name="phone"
                          placeholder="enter phone"
                          value={values.phone}
                          onChange={handleChange("phone")}
                          onBlur={handleBlur("phone")}
                        />
                      </CInputGroup>
                      {touched.phone && errors.phone ? (
                        <span style={{ color: "red" }}>{errors.phone}</span>
                      ) : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol xs="12" md="4">
                      Address
                      <CInputGroup>
                        <CInput
                          id="address"
                          name="address"
                          placeholder="enter address"
                          value={values.address}
                          onChange={handleChange("address")}
                          onBlur={handleBlur("address")}
                        />
                      </CInputGroup>
                      {touched.address && errors.address ? (
                        <span style={{ color: "red" }}>{errors.address}</span>
                      ) : null}
                    </CCol>
                    <CCol xs="12" md="4">
                      assignedTo
                      <CInputGroup>
                        <CSelect
                          custom
                          name="assignedTo"
                          id="assignedTo"
                          value={values.assignedTo}
                          onChange={handleChange("assignedTo")}
                          onBlur={handleBlur("assignedTo")}
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
                      {touched.assignedTo && errors.assignedTo ? (
                        <span style={{ color: "red" }}>
                          {errors.assignedTo}
                        </span>
                      ) : null}
                    </CCol>
                  </CFormGroup>
                  extra field
                  <CFormGroup row>
                      {this.state.extrafieldResult.map((list,index)=>{
                        return(
                            list.element=="TextInput"? 
                            <CCol xs="12" md="4" key={index}> 
                             Text input 
                              <CInputGroup>
                                <CInput
                                  id="textField" name="textField" placeholder="enter textField"
                                  value={this.state.extraFormObject[index]?this.state.extraFormObject[index].value:null}
                                  onChange={(e)=>this.textInputExtraFieldHandle(e,index)} 
                                />
                              </CInputGroup>
                            </CCol>
                            :list.element=="DatePicker"? 
                            <CCol xs="12" md="4" key={index}> 
                              Date picker
                              <CInputGroup>
                                <CInput type="date" id="date-input" name="date input" placeholder="date"
                                    value={this.state.extraFormObject[index]?this.state.extraFormObject[index].value:null}
                                    onChange={(e)=>this.datePickerExtraFieldHandle(e,index)}
                                />
                              </CInputGroup>
                            </CCol>
                            :list.element=="TextArea"?
                            <CCol xs="12" md="4" key={index}>
                              textArea
                            <CTextarea 
                              name="textarea" id="textarea" rows="4"
                              placeholder="Enter textArea Content..." 
                              value={this.state.extraFormObject[index]?this.state.extraFormObject[index].value:null}
                                 onChange={(e)=>this.textAreaExtraFieldHandle(e,index)}
                            />
                          </CCol>
                          :list.element=="RadioButtons"?
                          <CCol xs="12" md="4" key={index}>
                            Radios
                           {list.options.map((option, idx1) => {
                                return (
                                  <div key={idx1}>
                                    <CCol>
                                      <input type="radio" name="radio"
                                       checked={this.state.extraFormObject[index]?this.state.extraFormObject[index][idx1]:false}
                                       onChange={(e)=>this.radioHandleChange(e,index,idx1)}
                                      />
                                      <label>{option.text}</label>
                                    </CCol>
                                  </div>
                                );
                              })}
                          </CCol>:
                         list.element=="Checkboxes"?
                            <CCol xs="12" md="4" key={index}>
                              Checkbox
                             {list.options.map((option, idx) => {
                                  return (
                                    <div key={idx}>
                                      <CCol>
                                        <CFormGroup variant="checkbox" className="checkbox">
                                          <CInputCheckbox id={`checkbox${idx + 1}`} name="checkbox" 
                                              value={option.value}
                                              checked={this.state.extraFormObject[index]?this.state.extraFormObject[index][idx]:false}
                                              onChange={(e)=>this.checkboxHandleChange(e,index,option,idx)}
                                           />
                                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">
                                            {option.text}
                                          </CLabel>
                                        </CFormGroup>
                                      </CCol>
                                    </div>
                                  );
                                })}
                          </CCol>:"ff"
                            )
                      })}
                  </CFormGroup>
                </CCardBody>
              </CCard>
            </CCol>
          </Form>
          <CCollapse show={this.state.openResult}>
          <CCol >
              <CCard>
                <CCardHeader>
                  result
                </CCardHeader>
                <CCardBody>
                <CFormGroup row>
                  <CCol xs="12" md="4">
                  Result
                  <CInputGroup>   
                  <Select xs="12" md="4"
                       value={this.state.select}
                       onChange={this.resultHandleChange}
                       options={this.state.selectResult}
                 />
                  </CInputGroup>
                  </CCol>
                  {this.state.resultHandle==""?null:(this.state.resultHandle[0].map((subResultUi,index)=>{
                    return(
                      subResultUi.element=="TextInput"?
                        <CCol xs="12" md="4" key={index}>
                          Sub Result  
                          <CInputGroup>
                            <CInput
                              id="textField"
                              name="textField"
                              placeholder="enter textField"
                              value={this.state.subResult}
                              onChange={this.resultSubResultHandle}
                            />
                          </CInputGroup>
                        </CCol>
                       :subResultUi.element=="DatePicker"? 
                        <CCol style={{float:"right"}} >
                          <CCol xs="12" md="4" key={index}> 
                              Date picker
                              <CInputGroup>
                              <CInput type="date" id="date-input" name="date input" placeholder="date"
                                  value={this.state.subResult}
                                  onChange={this.resultSubResultHandle}
                              />
                              </CInputGroup>
                          </CCol>
                          <CCol xs="12" md="4" >
                            <CFormGroup variant="custom-checkbox" inline>
                              <CInputCheckbox custom id="inline-checkbox3" name="inline-checkbox3" value={this.state.subResultCheckbox} onChange={this.subResultCheckboxHandle}/>
                              <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">create new open log</CLabel>
                            </CFormGroup>
                             
                          </CCol>
                          </CCol>
                       :subResultUi.element=="TextArea"?
                          <CCol xs="12" md="4" key={index}>
                              Sub Result 
                            <CTextarea 
                              name="textarea" 
                              id="textarea" 
                              rows="4"
                              placeholder="Enter textArea Content..." 
                              value={this.state.subResult}
                            onChange={this.resultSubResultHandle}
                           />
                         </CCol>
                        :subResultUi.element=="RadioButtons"?
                          <CCol xs="12" md="4" key={index}>
                              Sub Result 
                              {subResultUi.options.map((option, idx1) => {
                                return (
                                  <div key={idx1}>
                                    <CCol>
                                      <input type="radio" name="radio"
                                       checked={this.state.subResult?this.state.subResult[idx1]:false}
                                       onChange={this.resultSubResultHandle}
                                      />
                                      <label>{option.text}</label>
                                      
                                    </CCol>
                                  </div>
                                );
                              })}
                          
                          </CCol>
                        :subResultUi.element=="Checkboxes"?
                          <CCol xs="12" md="4" key={index}>
                                Sub Result 
                                {subResultUi.options.map((option, idx) => {
                                  return (
                                    <div key={idx}>
                                      <CCol>
                                        <CFormGroup variant="checkbox" className="checkbox">
                                          <CInputCheckbox id={`checkbox${idx + 1}`} name="checkbox" 
                                              value={option.value}
                                              //checked={this.state.subResult?this.state.subResult[idx]:false}
                                              onChange={(e)=>this.resultSubResultHandle(e,option,idx)}
                                           />
                                          <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">
                                            {option.text}
                                          </CLabel>
                                        </CFormGroup>
                                      </CCol>
                                    </div>
                                  );
                                })}
                         </CCol>:""
                      )}))
                      }
                   
                  </CFormGroup>
                </CCardBody>
                <CCol style={{ marginLeft: "34%" }}>
                    <CFormGroup className="form-actions">
                      <CButton
                        onClick={() => this.props.history.push("/leads")}
                        type="button"
                        size="sm"
                        color="danger"
                        style={{ padding: "6px 25px 6px 25px" }}
                      >
                        Cancel
                      </CButton>

                      <CButton
                        style={{
                          marginLeft: "10px",
                          padding: "6px 25px 6px 25px",
                        }}
                        type="button"
                        size="sm"
                        color="success"
                           onClick={this.resultHandleSubmit}
                      >
                        Submit
                      </CButton>
                    </CFormGroup>
                  </CCol>
              </CCard>
          </CCol> 
          </CCollapse> 
          <CCollapse show={this.state.addLeadLogResult}>
          <CCol >
              <CCard>
                <CCardHeader>
                  Add lead log
                </CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                  <CCol xs="12" md="4">
                  <CButton
                        onClick={this.addLeadLogHandle}
                        type="button" size="sm" color="primary"
                        style={{ padding: "6px 25px 6px 25px" }}
                      >
                        Add call log
                      </CButton>
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                {/* <CCol style={{ marginLeft: "10%" }}>
                    <CFormGroup className="form-actions">
                      <CButton
                        onClick={() => this.props.history.push("/leads")}
                        type="button" size="sm" color="danger"
                        style={{ padding: "6px 25px 6px 25px" }}
                      >
                        Cancel
                      </CButton>

                      <CButton
                        style={{ marginLeft: "10px", padding: "6px 25px 6px 25px",}}
                        type="button" size="sm" color="success"
                           onClick={this.resultHandleSubmit}
                      >
                        Submit
                      </CButton>
                    </CFormGroup>
                  </CCol> */}
              </CCard>
            </CCol>
            </CCollapse>
          </div>

        )}
      ></Formik>
    );
  }
}
export default CreateLeads;
