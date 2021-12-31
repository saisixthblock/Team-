
import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import { Row,Col,Input, CardHeader } from "reactstrap";
import { Label } from "reactstrap";
import { AppSwitch } from '@coreui/react';
import * as Yup from 'yup';
import {Button, Card, CardBody,FormFeedback,FormGroup} from 'reactstrap';
import {Formik,Form} from 'formik'
//import values from "core-js/fn/array/values";
//import axios from '../../containers/Axios/Config';
import axios from "axios";
import swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Roles extends Component{
    
    state={ 
        initalRolesDetails:[
                 {menu:'Select All',id:0,identifier:'selectall'},
                 {menu:'DashBoard',id:1,identifier:'dashboard'},
                 {menu:'Projects',id:2,identifier:'projects'},
                 {menu:'Assigned To Me',id:3,identifier:'assigned_to_me'},
                 {menu:'Calls Made',id:4,identifier:'calls_made'},
                 {menu:'Settings',id:5,identifier:'settings'},
                 {menu:'Company Settings',id:6,identifier:'company_settings'},
                 {menu:'Result',id:7,identifier:'result'},
                 {menu:'Result Details',id:8,identifier:'result_details'},
                 {menu:'Log Type',id:9,identifier:'logType'},
                 {menu:'Call Status',id:10,identifier:'callStatus'},
                 {menu:'Next Call Date',id:11,identifier:'nextCallDate'},
                 {menu:'Users',id:12,identifier:'users'},
                 {menu:'Permissions',id:13,identifier:'permissions'},
                 
              
        ],
        updatedRolesDetails:[], 
        name:''    
    }
    

    componentDidMount(){
        // console.log(this.props.match.params)
         var roleId=this.props.match.params.id
        //console.log(roleId)
         if(roleId != 'new'){
         axios.get(process.env.REACT_APP_BACKEND_API_URL+'/get/role/permissions/'+roleId)
         .then(response=>{ 
            console.log(response)
            var setRolesDetails=[];
            this.state.initalRolesDetails.map((initalRolesPush,index)=>{
                console.log(initalRolesPush)
                console.log(setRolesDetails)
                if(initalRolesPush.identifier != 'selectall'){
                    console.log([initalRolesPush.identifier])
                setRolesDetails.push({id:initalRolesPush.id,
                    [initalRolesPush.identifier]:
                    response.data.data.data[initalRolesPush.identifier]
                })
                 //console.log(setRolesDetails)
                }
                else
                {    
                setRolesDetails.push({id:initalRolesPush.id,
                    [initalRolesPush.identifier]:{
                        canView:false,
                        canCreate:false,
                        canUpdate:false,
                        canDelete:false,
                    }
                })
                }
             
            })
            this.setState({
                updatedRolesDetails:setRolesDetails,
                name:response.data.data.data.roleName,    
            },
            
            //()=>{console.log(setRolesDetails)}
            )   
        })
         }
        else
        {
        var setRolesDetails=[];
        this.state.initalRolesDetails.map((initalRolesPush,index)=>{
            setRolesDetails.push({id:initalRolesPush.id,
                [initalRolesPush.identifier]:{
                    canView:false,
                    canCreate:false,
                    canUpdate:false,
                    canDelete:false,
                }
            })
        })
        this.setState({
            updatedRolesDetails:setRolesDetails,
        }
        
         ,()=>console.log(this.state.updatedDetails)
     
        )
    }}

    changeHandler=(row,toggle,object)=>{ 
        
        //console.log(row)
        var changedRolesDetails=this.state.updatedRolesDetails;
        if(row.identifier=='selectall'){
        this.state.initalRolesDetails.map((rolecolumn,index)=>{
            changedRolesDetails[index][rolecolumn.identifier][object]=!toggle;
        }
        //,()=>console.log(object)
        )
        this.setState({updatedRolesDetails:changedRolesDetails}
            
             //,()=>console.log(this.state.updatedRolesDetails)
            )
        }
        else{
            changedRolesDetails[row.id][row.identifier][object]=!this.state.updatedRolesDetails[row.id][row.identifier][object]
            if(changedRolesDetails[row.id][row.identifier][object]==false){
                changedRolesDetails[0]['selectall'][object]=false
            }
            this.setState({updatedRolesDetails:changedRolesDetails}
                
                //,()=>console.log(this.state.updatedRolesDetails)
                )
        } 
    }

    FormattedData=(cell,row,object)=>{
        //console.log(3)
        //console.log(row)
        //console.log(this.state.updatedRolesDetails)
        var toggle=this.state.updatedRolesDetails[row.id] ? this.state.updatedRolesDetails[row.id][row.identifier][object] : false;
        // return (<AppSwitch 
        // checked={toggle}
        // onChange={()=>this.changeHandler(row,toggle,object)}
        //  //className={'float-right'} 
        // variant={'pill'} 
        // label color={'primary'} 
        // size={'lg'}/>)
    }


    handleChange=(e)=>{
            this.setState({[e.target.name]:e.target.value})
    }
  
    onSubmit=(values)=>{
        
        // console.log(this.state.updatedDetails)
        let payLoadRoleDetails={};
        payLoadRoleDetails.roleName=values.name;
        if(this.props.match.params.id != 'new'){
            this.state.initalRolesDetails.map((finalRolesData,index)=>{
                //if(finalRolesData.identifier != 'selectall'){
                payLoadRoleDetails[finalRolesData.identifier]=this.state.updatedRolesDetails[index][finalRolesData.identifier];
                // console.log(this.state.updatedDetails[index][finalRolesData.identifier])
                // }
            })
            axios.put(process.env.REACT_APP_BACKEND_API_URL+'/update/company/role/permissions/'+this.props.match.params.id,payLoadRoleDetails)
            .then(response=>{
                console.log(payLoadRoleDetails)
                if(response.data.status==200){
                    toast.success('Your data has been saved')
                    this.props.history.push('/permissions');
                    
                    // swal.fire({  
                    //   title: 'Success',  
                    //   type: 'success',  
                    //   text: 'Your data has been saved.',
            
                    // });
                  }
                })
              .catch(error=>{
                  console.log(error.response)
                  toast.error(error.response.data.message)
                    // swal.fire({  
                    //   icon: 'error',  
                    //   title: 'error',  
                    //   text: 'Something went wrong!',  
                            
                    // }); 
                  
                })    
        }else{
        this.state.initalRolesDetails.map((finalRolesData,index)=>{
            payLoadRoleDetails[finalRolesData.identifier]=this.state.updatedRolesDetails[index][finalRolesData.identifier];
            //console.log(this.state.updatedRolesDetails[index][finalRolesData.identifier])
           
        })
         //console.log(payLoadData)
         
        let companyId=localStorage.getItem('companyId')
        let userId=localStorage.getItem('userId')
        axios.post(process.env.REACT_APP_BACKEND_API_URL+'/create/new/user/role/'+ companyId +'/'+ userId,payLoadRoleDetails)
        .then(response=>{
            console.log(response)
            //console.log(userId)
            if(response.data.status==200){
              toast.success('Your data has been saved')
              this.props.history.push('/permissions');
            //   swal.fire({  
            //     title: 'Success',  
            //     type: 'success',  
            //     text: 'Your data has been saved.',
      
            //   });
            }
          })
        .catch(error=>{
             console.log(error)
             toast.error(error.response.data.message)
            //   swal.fire({  
            //     icon: 'error',  
            //     title: 'error',  
            //     text: 'Something went wrong!',  
                      
            //   }); 
            
          })    
    }}

    render(){ 
        //console.log(1)
       return(
            <div style={{marginTop:'50px'}}>
                 <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  style={{ zIndex: "1999" }}
                />
                <Card>
                    <CardBody>
                        <Formik
                            enableReinitialize={true}
                            initialValues={this.state}
                            validationSchema={ Yup.object().shape({
                            name:Yup.string().required('RoleName is required')
                            })}
                            onSubmit={this.onSubmit}
                        >
                        {({values,errors,touched,handleBlur,handleSubmit})=>(
                            //console.log(2),
                            <Form onSubmit={handleSubmit}> 
                                <Row style={{marginBottom:'10px'}}>
                                    <Col md={4}>
                                        <FormGroup> 
                                            <Label htmlFor='name'>Role *</Label>
                                            <Input   
                                                type="text" name="name" 
                                                value={values.name} 
                                                onChange={this.handleChange}
                                                onBlur={handleBlur}
                                                invalid={errors.name && touched.name}
                                                valid={!errors.name } 
                                            />
                                            <FormFeedback>{errors.name}</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                          
                                <BootstrapTable data={this.state.initalRolesDetails} keyField='menu' bordered={false}>
                                    <TableHeaderColumn 
                                        dataField='menu'
                                    >
                                        Menu
                                    </TableHeaderColumn>
                                    <TableHeaderColumn 
                                        dataField='view' 
                                        dataFormat={this.FormattedData} 
                                        formatExtraData='canView'
                                    >
                                        View
                                    </TableHeaderColumn>
                                    <TableHeaderColumn 
                                        dataField='create' 
                                        dataFormat={this.FormattedData} 
                                        formatExtraData='canCreate'
                                    >
                                        Create
                                    </TableHeaderColumn>
                                    <TableHeaderColumn 
                                        dataField='update' 
                                        dataFormat={this.FormattedData} 
                                        formatExtraData='canUpdate'
                                    >
                                        Update
                                    </TableHeaderColumn>
                                    <TableHeaderColumn 
                                        dataField='delete' 
                                        dataFormat={this.FormattedData} 
                                        formatExtraData='canDelete'
                                    >
                                        Delete
                                    </TableHeaderColumn>
                                </BootstrapTable>
                                <Row className="text-center">
                                    <Col className="text-center">
                                        <Button 
                                            style={{width: 200}} 
                                            className='pl-20 ' 
                                            outline color="danger" 
                                            size="lg" 
                                            type="reset" 
                                            
                                        >
                                            Cancel
                                        </Button>{' '}&nbsp;&nbsp;
                                         <Button 
                                            style={{width: 200}} 
                                            outline color="success" 
                                            size="lg" 
                                            type="submit" 
                                        >
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                        </Formik>
                    </CardBody>
                </Card>
           </div>
       )
   }
}
export default Roles

