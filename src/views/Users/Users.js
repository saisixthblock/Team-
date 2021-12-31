import React from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
} from "@coreui/react";
//import userDataList from "./UsersDataList";
import styles from "./users.module.css";
import { Link } from "react-router-dom";
//import UserDataList from "./UsersDataList";
import axios from "axios";
import { BootstrapTable,TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import CIcon from "@coreui/icons-react";

class Users extends React.Component {
  state = {
    usersList: [],
  };
  clickEventHandler = (id) => {
    console.log("click");
    //console.log(id);
    this.props.history.push(`/createUser/${id}`);
  };
  editButton=(cell,row)=>{
    return(<p hreff="#" onClick={()=>this.handleClick(cell,row)} style={{cursor:"pointer"}}>edit<CIcon name="cil-save"/></p>)
  }
  handleClick=(cell,row)=>{
    console.log(row.id)
    this.props.history.push(`/createUser/${row.id}`);
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
            sno:index+1,
            name:values.fullName,
            phone:values.phone,
            email:values.email,
            user_type:values.user_type,
            address:values.address,
          })
        })
        console.log("users",users)
        this.setState({ usersList:users});
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <div>
        {console.log(this.state.usersList)}
        <div>
          <CCol>
            <CCard>
              <CCardHeader>
                User Table
                <Link
                  style={{
                    float: "right",
                    border: "1px solid #00000040",
                    cursor: "pointer",
                    backgroundColor: "#4CAF50",
                    padding: "5px 20px",
                    color: "white",
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}
                  className="button"
                  to="/createUser/new"
                >
                  Create User
                </Link>
              </CCardHeader>
              <CCardBody>
              <BootstrapTable data={this.state.usersList} striped keyField='phone' pagination  hover={true} >
                  <TableHeaderColumn width="5" dataField="sno" >Sno</TableHeaderColumn>
                  <TableHeaderColumn width="15" dataField="name" >Username</TableHeaderColumn>
                  <TableHeaderColumn width="15" dataField="email" >Mail</TableHeaderColumn>
                  <TableHeaderColumn width="10" dataField="phone" >Phone</TableHeaderColumn>
                  <TableHeaderColumn width="10" dataField="address" >address</TableHeaderColumn>
                  <TableHeaderColumn width="12" dataField="user_type" >User type</TableHeaderColumn>
                  <TableHeaderColumn width="8" dataField="action" dataFormat={this.editButton} >action</TableHeaderColumn>
              </BootstrapTable>

               
              </CCardBody>
            </CCard>
          </CCol>
        </div>
      </div>
    );
  }
}
export default Users;
