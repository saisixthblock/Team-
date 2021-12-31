import React from "react";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
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
import { ListGroup, ListGroupItem } from "reactstrap";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "./FormBuilder.css";
import axios from "axios";
import Swal from "sweetalert2";
import { data } from "jquery";
var items = [
  {
    key: "TextInput",
    field_name: "Text_input_",
    name: "Text Input",
    label: "Text Input",
    content: "text input...",
  },
  {
    key: "TextArea",
    field_name: "Text_Area_",
    name: "TextArea",
    label: "TextArea",
    content: "textarea...",
  },
  {
    key: "RadioButtons",
    //field_name: "Radio_Buttons_",
    //name: "Radio buttons",
    // label: "Radio buttons",
  },
  {
    key: "Checkboxes",
    // name: "Check box",
    //label: "check box",
    //field_name: "Check_box_",
  },
  {
    key:"DatePicker",
  }
];

class FormBuilderExample extends React.Component {
  state = {
    open: false,
    openResult: false,
    extraFieldPopup: false,
    extraFieldResult: [],
    result: [],
    extraResult:[],
    getDataFromDb:"",
    popoverOpen: [false, false, false, false,false],
    isOpenAddNewResult:false,
    addNewResultInput:"",
    addNewResultList:[],
    changeResultNameId:'',
    formId:'',
  };
  extraFieldHandleUpdate = (data) => {
    //let list = [];
    //console.log("extraFieldHandleUpdate", data);
    // data.task_data.map((datalist) => {
    //   list.push(datalist);
    // });
    // this.setState({
    //   extraFieldResult: data.task_data,
    // });
    this.setState({
      extraFieldResult:data.task_data
    })
  };
  resultHandleUpdate = (postData, index, resultId) => {
    let resultobj ={};
    resultobj.resultId=resultId;
    resultobj.taskData= postData.task_data;
    let array = this.state.extraResult;
     // console.log(resultobj);
    array[index]=resultobj
   
    let copyResult = this.state.result;
    //console.log(resultId);
    //console.log(index);
    copyResult[index] = postData.task_data;

    this.setState(
      {
        result: copyResult,
        extraResult:array,
      } 
      
    );
  };
  resultEventHandler = () => {
    this.setState({
      openResult: !this.state.openResult,
    });
  };
  extraFieldHandler = () => {
    //alert("e");
    this.setState({
      open: !this.state.open,
    });
  };
  addPopUpEventHandle = () => {
    this.setState({
      extraFieldPopup: !this.state.extraFieldPopup,
    });
  };
  resultPopOverhandle = (val) => {
    let copy = this.state.popoverOpen;
    copy[val] = !copy[val];

    this.setState({
      popoverOpen: copy,
    });
  };
  changeResultlistName=(id)=>{
    console.log(id);
    axios.get("http://localhost:3000/user/api/get/result/"+id)
          .then((response)=>{
            console.log(response);
            this.setState({
              isOpenAddNewResult:!this.state.isOpenAddNewResult,
              addNewResultInput:response.data.data.data.name,
              changeResultNameId:id,
            })
          })
          .catch((error)=>{console.log(error)})
  }
  callmethd=()=>{
   return console.log("callmethod");
  }
  submitAddNewResultHandler = (e)=>{
    
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
    var loginUserId = localStorage.getItem("loginUserId");
    var loginCompanyId = localStorage.getItem("loginCompanyId");
    var obj ={};
    obj.name=this.state.addNewResultInput;
    if(this.state.changeResultNameId==""){
        //console.log("submit if",this.state.addNewResultInput);
        axios.post("http://localhost:3000/user/api/create/new/result/"+loginCompanyId +"/" +loginUserId,obj)
              .then((response)=>{
                console.log(response);
                this.setState({addNewResultInput:"",isOpenAddNewResult:!this.state.isOpenAddNewResult});
                this.props.history.push("/FormBuilder");
                window.location = "/#/FormBuilder";
              })
              .catch((error)=>{console.log(error)})
    }
    else{
     // console.log("submit else",this.state.addNewResultInput);
        axios.put("http://localhost:3000/user/api/update/result/"+this.state.changeResultNameId,obj)
              .then((response)=>{
                console.log(response);
                this.setState({addNewResultInput:"",changeResultNameId:"",isOpenAddNewResult:!this.state.isOpenAddNewResult});
                this.props.history.push("/FormBuilder");
                window.location = "/#/FormBuilder";
              })
              .catch((error)=>{console.log(error)})
    }
          
  }
  submitEventHandler = () => {
    //alert("hai");
   // console.log("result", this.state.result);
   // console.log("extraField", this.state.extraFieldResult);
    // var extrafield = {};
    // extrafield.extrafieldObject = { task_data: this.state.extraFieldResult };
    // var result = {};
    // result.formObject = { task_data: this.state.result };
    var formName = "formBuilder";
    var obj = {};
    obj.formName = formName;
    obj.extrafieldObject =  this.state.extraFieldResult ;
    obj.formObject =  this.state.extraResult;
    console.log(obj);
      
    //console.log(this.state.getDataFromDb)
    //console.log("hai",this.state.getDataFromDb)
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("loginToken");
     // console.log("id",this.state.formId);
      if(this.state.getDataFromDb=="notFound"){
        //to create only one file 
        axios.post("http://localhost:3000/user/api/create/new/custom/form", obj)
              .then((response) => {
                console.log(response);
               
                this.setState({getDataFromDb:"Found",})
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Created successfully",
                });
                
              })
              .catch((error) => {
                console.log(error.response);
              });
    }
    if(this.state.getDataFromDb=="Found"){
      //to update that one file in db
      
     axios.defaults.headers.common["Authorization"] =
     localStorage.getItem("loginToken");
      axios.put("http://localhost:3000/user/api/update/custom/form/"+this.state.formId, obj)
        .then((response)=>{
            console.log("updateSubmit",response.data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Updated successfully",
            });
           })
        .catch((error)=>{console.log(error.response)})
    }
  };
componentDidMount(){
  
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
  var loginCompanyId = localStorage.getItem("loginCompanyId");
  axios.get("http://localhost:3000/user/api/get/company/result/"+loginCompanyId)
      .then((response)=>{
        console.log("get results",response.data.data.data);
        this.setState({addNewResultList:response.data.data.data})
      })
      .catch((error)=>{console.log("errr",error)})
  
  axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("loginToken");
  axios.get("http://localhost:3000/user/api/get/company/custom/forms")
  .then((response)=>{
    //console.log("xxx",response.data.data.data[0]);
   // console.log(this.state.extraFieldResult)
  
   if(response.data.data.data.length==0){
    this.setState({getDataFromDb:"notFound"});
  }
  else{
    let arr =[];
    response.data.data.data[0].formObject.map((val)=>{arr.push(val.taskData)})
    console.log("z",arr);
     this.setState({
      extraFieldResult:response.data.data.data[0].extrafieldObject,
      result:arr,
      getDataFromDb:"Found",
      formId:response.data.data.data[0]._id,
      extraResult:response.data.data.data[0].formObject,
     },()=>{console.log(this.state.extraResult)})
    // console.log("reqData",reqData);
  }
       
  })
  .catch((error)=>{console.log(error);})
}
  render() {
    return (
      <div>
        
        <div>
          <CCol xs="5" md="5" style={{ margin: "0% 0% 0% 15%" }}>
            <CCard>
              <CCardHeader>Create </CCardHeader>
              <CCardBody>
                <CCard>
                  <CCardHeader>
                    results 
                    <CInputGroupAppend
                      style={{ float: "right" }}
                      onClick={this.resultEventHandler}
                    >
                      <CInputGroupText>
                        <CIcon name="cil-cursor" />
                      </CInputGroupText>
                    </CInputGroupAppend>
                  </CCardHeader>
                  <CCollapse show={this.state.openResult}>
                    <div>
                      <CCardHeader id="Popover" style={{ backgroundColor: "blue", color: "white" }} onClick={()=>{this.setState({isOpenAddNewResult:!this.state.isOpenAddNewResult})}} >
                        +Add new result
                      </CCardHeader>
                        <Popover placement="right" isOpen={this.state.isOpenAddNewResult} target="Popover" >
                          <PopoverBody>
                          <CCard>
                            <CCardHeader>Result </CCardHeader>
                              <CCardBody>
                              Result Name
                                <CInputGroup>
                                  <CInput  id="name" name="name" placeholder="enter name" value={this.state.addNewResultInput} onChange={(e)=>{this.setState({addNewResultInput:e.target.value})}} />
                              </CInputGroup>
                              </CCardBody>
                              <CFormGroup className="form-actions">
                                    <CButton
                                    style={{marginLeft: "10px", padding: "6px 25px 6px 25px",}}
                                    type="button"
                                    size="sm"
                                    color="success"
                                      onClick={this.submitAddNewResultHandler}
                                  >
                                    Submit
                                  </CButton>
                                  <CButton
                                   style={{marginLeft: "10px", padding: "6px 25px 6px 25px",}}
                                    onClick={()=>{this.setState({isOpenAddNewResult:!this.state.isOpenAddNewResult})}}
                                    type="button"  size="sm" color="danger" >
                                    Cancel
                                  </CButton>
                                </CFormGroup>
                             
                          </CCard>
                          </PopoverBody>
                        </Popover>
                      <ListGroup>
                        {this.state.addNewResultList.map((list, index) => {
                          return (
                            <div key={index}>
                              <ListGroupItem>
                             <span onClick={()=>{this.changeResultlistName(list._id)}}>   {list.name} </span>
                                <button
                                  id={"Popover" + index}
                                  style={{
                                    float: "right",
                                    backgroundColor: "blue",
                                    color: "white",
                                  }}
                                  onClick={() =>
                                    this.resultPopOverhandle(index)
                                  }
                                >
                                  {this.state.popoverOpen[index] ? "X" : "+"}
                                </button>
                              </ListGroupItem>
                              <Popover
                                placement="right"
                                isOpen={this.state.popoverOpen[index]}
                                target={"Popover" + index}
                              >
                                <PopoverBody>
                                  <ReactFormBuilder
                                    data={this.state.result[index]}
                                    toolbarItems={items}
                                    onPost={(e) =>
                                      this.resultHandleUpdate(e, index,list._id)
                                    }
                                  />
                                </PopoverBody>
                              </Popover>
                            </div>
                          );
                        })}
                      </ListGroup>
                    </div>
                  </CCollapse>
                </CCard>
                <CCard>
                  {" "}
                  <CCardHeader>
                    extra fields
                    <CInputGroupAppend
                      style={{ float: "right" }}
                      onClick={this.extraFieldHandler}
                    >
                      <CInputGroupText>
                        <CIcon name="cil-cursor" />
                      </CInputGroupText>
                    </CInputGroupAppend>
                  </CCardHeader>
                  <CCollapse show={this.state.open}>
                    <div>
                      <CFormGroup>
                        {this.state.extraFieldResult.map((list1, index) => {
                          return list1.element == "TextInput" ? (
                            <div key={index}>
                              <CCol md="4">
                                <CLabel htmlFor="text-input">Text Input</CLabel>
                              </CCol>
                              <CCol xs="12" md="9">
                                <CInput
                                  id="text-input"
                                  name="text-input"
                                  placeholder="Text"
                                />
                              </CCol>
                            </div>
                          ) : (
                            " "
                          );
                        })}
                      </CFormGroup>

                      <CFormGroup>
                        {this.state.extraFieldResult.map((list1, index) => {
                          return list1.element == "TextArea" ? (
                            <div key={index}>
                              <CCol md="3">
                                <CLabel htmlFor="textarea-input">
                                  Textarea
                                </CLabel>
                              </CCol>
                              <CCol xs="12" md="9">
                                <CTextarea
                                  name="textarea-input"
                                  id="textarea-input"
                                  rows="3"
                                  placeholder="Content..."
                                />
                              </CCol>
                            </div>
                          ) : (
                            " "
                          );
                        })}
                      </CFormGroup>
                      <CFormGroup>
                        {this.state.extraFieldResult.map((list1, index) => {
                          return list1.element == "RadioButtons" ? (
                            <div key={index}>
                              <CCol>
                                <CLabel>Radios</CLabel>
                              </CCol>
                              {list1.options.map((option, index) => {
                                return (
                                  <div key={index}>
                                    <CCol>
                                      <CFormGroup variant="checkbox">
                                        <CInputRadio
                                          className="form-check-input"
                                          //id="radio1"
                                          id={`radio${index + 1}`}
                                          name="radios"
                                          value={option.value}
                                        />
                                        <CLabel
                                          variant="checkbox"
                                          htmlFor={`radio${index + 1}`}
                                        >
                                          {option.text}
                                        </CLabel>
                                      </CFormGroup>
                                    </CCol>
                                  </div>
                                );
                              })}

                              <br />
                            </div>
                          ) : (
                            " "
                          );
                        })}
                      </CFormGroup>
                      <CFormGroup>
                        {this.state.extraFieldResult.map(
                          (checkboxList, index) => {
                            return checkboxList.element == "Checkboxes" ? (
                              <div key={index}>
                                <CCol>
                                  <CLabel>Checkboxes</CLabel>
                                </CCol>
                                {checkboxList.options.map((option, index) => {
                                  return (
                                    <div key={index}>
                                      <CCol>
                                        <CFormGroup
                                          variant="checkbox"
                                          className="checkbox"
                                        >
                                          <CInputCheckbox
                                            //id="checkbox1"
                                            id={`checkbox${index + 1}`}
                                            name="checkbox1"
                                            value={option.value}
                                          />
                                          <CLabel
                                            variant="checkbox"
                                            className="form-check-label"
                                            htmlFor="checkbox1"
                                          >
                                            {option.text}
                                          </CLabel>
                                        </CFormGroup>
                                      </CCol>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              " "
                            );
                          }
                        )}
                      </CFormGroup>

                      <div>
                        <button
                          id="Popover1"
                          style={{
                            float: "right",
                            margin: "20px",
                            backgroundColor: "blue",
                            color: "white",
                          }}
                          onClick={this.addPopUpEventHandle}
                        >
                          {this.state.extraFieldPopup ? "close" : "open"}
                        </button>
                        {/* <div className="textInputPopup">
                          <Popover
                            placement="bottom"
                            isOpen={this.state.extraFieldPopup}
                            target="Popover1"
                          >
                            <PopoverBody>
                              <ReactFormBuilder
                                data={this.state.extraFieldResult}
                                toolbarItems={items}
                                onPost={this.handleUpdate}
                              />
                            </PopoverBody>
                          </Popover>
                        </div> */}
                      </div>
                    </div>
                  </CCollapse>
                </CCard>
              </CCardBody>

              <CCardFooter>
                <CCol style={{ marginLeft: "22%" }}>
                  <CFormGroup className="form-actions">
                    <CButton
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
                      onClick={this.submitEventHandler}
                    >
                      Submit
                    </CButton>
                  </CFormGroup>
                </CCol>
              </CCardFooter>
            </CCard>
          </CCol>

          {this.state.extraFieldPopup ? (
            <div style={{ minHeight: "250px", marginTop: "0px" }}>
              <ReactFormBuilder
                data={this.state.extraFieldResult}
                toolbarItems={items}
                onPost={this.extraFieldHandleUpdate}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default FormBuilderExample;
