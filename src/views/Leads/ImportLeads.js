import React from 'react'
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
    CListGroup,
    CListGroupItem,
    CInputRadio,
    CInputGroup,
    CInputGroupAppend,
    CInputGroupPrepend,
    CDropdown,
    CInputGroupText,
    CLabel,
    CSelect,
    CRow,
    CSwitch
  } from '@coreui/react'
  import Multiselect from 'multiselect-react-dropdown';
  import axios from 'axios';
  import Dropzone from 'react-dropzone';
  import XLSX from 'xlsx';
  import Swal from "sweetalert2";
  let array =[];
class ImportLeads extends React.Component{
    state={
        usersList:[],
        selectUsers:'',
        errorSelectUsers:'',
        allowDuplicate:false,
        file:'',
        headers:['Lead', 'Email', 'Phone', 'Address'],
        excelData:[],
        errorHeader:[],
        excelfieldsErr:[],
    }
    allowDuplicateCheckboxHandle=()=>{
        this.setState({allowDuplicate:!this.state.allowDuplicate},()=>{console.log(this.state.allowDuplicate)})
    }
     
    onSelect(selectedList, selectedItem) {
     array= selectedList
     // array.push(selectedList);
        console.log("selected",array);
        
    }
    onRemove(selectedList, removedItem) {
      console.log(this.state.selectUsers);
      array= selectedList
       // console.log("removed",selectedList,removedItem)
        //this.setState({selectUsers:selectedList})
    }
    chooseFileHandle = (file) => { 
      console.log(file)
     
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
  
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws,{header:1});
          resolve(data);
          this.state.headers.map((header,index)=>{
           if(data[0].includes(header)==false){
             console.log("if",data[0][index])
             this.state.errorHeader.push({error:data[0][index],required:header})
           }
          })
          this.setState({excelData:data,file:file})
          console.log('excelData',this.state.excelData,data)
         };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
      promise.then((d) => {
        console.log("d",d)
      }).catch((error)=>{console.log(error)})
    }
    dragZoneHandle=(file)=>{
      console.log(file)
      
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file[0]);
  
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws,{header:1});
          resolve(data);
          this.state.headers.map((header,index)=>{
           if(data[0].includes(header)==false){
             console.log("if",data[0][index])
             this.state.errorHeader.push({error:data[0][index],required:header})
           }
          })
          this.setState({excelData:data,file:file[0]})
          console.log(this.state.errorHeader)
         };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
      promise.then((d) => {
        console.log("d",d)
      }).catch((error)=>{console.log(error)})
    }
    submitEventHandler=()=>{
      this.setState({selectUsers:array})
      if(array==""){
        console.log("eerrrrrrrrrrr")
        this.setState({errorSelectUsers:"This field is required"})
      }
      var loginUserId = localStorage.getItem("loginUserId");
      var loginCompanyId = localStorage.getItem("loginCompanyId");
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
      console.log(this.state.allowDuplicate,array)
      console.log(this.state.file)
      
      var formData = new FormData();
      formData.append("allowDuplicate",this.state.allowDuplicate);
      array.map((user)=>{
        formData.append("users[]",user.id)
      })
      
      formData.append("images",this.state.file);
      console.log("obj",formData)
      axios.post('http://localhost:3000/user/api/file/upload/'+loginCompanyId+'/'+loginUserId,formData)
            .then((response)=>{
              console.log(response);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "leads imported successfully",
              });
              this.props.history.push("/leads")
            })
            .catch((error)=>{
              console.log(error.response.data.data)
              let Array=[];
              for(let i=0;i<error.response.data.data.length;i++){
               // console.log(error.response.data.data[i])
                Array.push({err:error.response.data.data[i]})
              }
              this.setState({excelfieldsErr:Array}) 
            })
    }
    componentDidMount() {
        let loginCompany = localStorage.getItem("loginCompanyId");
        axios.defaults.headers.common["Authorization"] =
          localStorage.getItem("loginToken");
        axios
          .get("http://localhost:3000/user/api/all/company/members/" + loginCompany)
          .then((response) => {
            console.log(response.data);
            let users=[];
            response.data.data.data.map((values,index)=>{
              users.push({
                id:values._id,
                name:values.fullName,
              })
            })
            console.log("users",users)
            this.setState({ usersList:users});
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
       
     
    render(){
        return(
          <CCol >
            <CCard>
              <CCardHeader>
                 Import Leads 
              </CCardHeader>
              <CCardBody>
              <CListGroup>
              <CListGroupItem>
              
                <CFormGroup>
                    <CCol xs="12" md="5">
                    Assign Leads To Users
                      <Multiselect
                        options={this.state.usersList}
                        onSelect={this.onSelect}
                        onRemove={this.onRemove}
                        displayValue="name"
                      />
                      {this.state.errorSelectUsers!=""?<span style={{color:"red"}}>{this.state.errorSelectUsers}</span>:null}
                    </CCol>
                    
                </CFormGroup>
                <CFormGroup style={{marginLeft:"2%"}}>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox custom id="inline-checkbox1" name="inline-checkbox1"
                          value={this.state.allowDuplicate}
                          onChange={this.allowDuplicateCheckboxHandle}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">Allows storage of Duplicate leads ?</CLabel>
                    </CFormGroup>
                </CFormGroup>
                <CFormGroup>
                  <CCol xs="12" md="9">
                     <input type="file" onChange={(e) => {
                        const file = e.target.files[0]; this.chooseFileHandle(file);
                      }}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CCol xs="12" md="9" style={{
                    width:"60%",border:"3px dashed black",height:"100px",textAlign:"center",padding:"32px",
                    fomtWeight:"500",fontSize:"18px"
                    }}>
                  <Dropzone accept={[".xlsx","xls"]} onDrop={this.dragZoneHandle}>
                    {({getRootProps, getInputProps}) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  
                  </CCol>
                  {this.state.errorHeader.map((err,index)=>{
                    return (
                    <span style={{color:"red"}} key={index}>error is {err.error} required is {err.required}, </span>
                    )})}
                    {this.state.excelfieldsErr.map((value,index)=>{return <div style={{color:"red"}} key={index}>{value.err}</div>})}
                </CFormGroup>
               
              </CListGroupItem> 
              </CListGroup>  
              </CCardBody>
              <CCardFooter>
              <CCol style={{ marginLeft: "34%" }}>
                    <CFormGroup className="form-actions">
                      <CButton
                        onClick={() => this.props.history.push("/leads")}
                        type="button" size="sm" color="danger" style={{ padding: "6px 25px 6px 25px" }}
                      >
                        Cancel
                      </CButton>
                      <CButton
                        style={{marginLeft: "10px", padding: "6px 25px 6px 25px",}}
                        type="button" size="sm" color="success" onClick={this.submitEventHandler}
                      >
                        Submit
                      </CButton>
                    </CFormGroup>
                </CCol>
              </CCardFooter>
            </CCard>
          </CCol>
          
        )
    }
}
export default ImportLeads