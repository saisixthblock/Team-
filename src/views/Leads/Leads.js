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
import styles from "../Users/users.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BootstrapTable,TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import CIcon from "@coreui/icons-react";

let loginCompanyId = localStorage.getItem("loginCompanyId");
class Leads extends React.Component {
  state = {
    leadsList: [],
  };
  clickEventHandler = (id) => {
    console.log("click");
    //console.log(id);
    this.props.history.push(`/createLeads/${id}`);
  };
  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("loginToken");
    axios
      .get("http://localhost:3000/user/api/get/leads/" + loginCompanyId)
      .then((response) => {
        let leads=[];
        console.log(response);
       
        response.data.data.data.map((values,index)=>{
          leads.push({
            id:values._id,
            sno:index+1,
            lead_name:values.lead_name,
            phone:values.phone,
            email:values.email,
            assignedTo:values.assignedTo.fullName,
            address:values.address,
          })
        })
        this.setState({ leadsList:leads });
        console.log(leads)
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
 
  editButton=(cell,row)=>{
    return(<p hreff="#" onClick={()=>this.handleClick(cell,row)} style={{cursor:"pointer"}}>edit<CIcon name="cil-save"/></p>)
  }
  handleClick=(cell,row)=>{
    console.log(row.id)
    this.props.history.push(`/createLeads/${row.id}`);
  }
  render() {
    return (
      <div>
        <div>
          <CCol>
            <CCard>
              <CCardHeader>
                User Table
                <Link
                  style={{
                    float: "right", border: "1px solid #00000040", cursor: "pointer", backgroundColor: "#4CAF50",
                    padding: "5px 20px", color: "white", borderRadius: "5px", textDecoration: "none",marginLeft:"10px"
                  }}
                  className="button"
                  to="/importLeads"
                >
                  Import Leads
                </Link>
                <Link
                  style={{
                    float: "right", border: "1px solid #00000040", cursor: "pointer", backgroundColor: "#4CAF50",
                    padding: "5px 20px",color: "white", borderRadius: "5px",textDecoration: "none",
                  }}
                  className="button"
                  to="/createLeads/new"
                >
                  Create Leads
                </Link>
                
              </CCardHeader>
              <CCardBody>
              <BootstrapTable data={this.state.leadsList} striped keyField='phone' pagination  hover={true} >
                  <TableHeaderColumn width="5" dataField="sno" >Sno</TableHeaderColumn>
                  <TableHeaderColumn width="15" dataField="lead_name" >Name</TableHeaderColumn>
                  <TableHeaderColumn width="15" dataField="email" >Mail</TableHeaderColumn>
                  <TableHeaderColumn width="10" dataField="phone" >Phone</TableHeaderColumn>
                  <TableHeaderColumn width="10" dataField="address" >address</TableHeaderColumn>
                  <TableHeaderColumn width="12" dataField="assignedTo" >AssignedTo</TableHeaderColumn>
                  <TableHeaderColumn width="8" dataField="action" dataFormat={this.editButton} >action</TableHeaderColumn>
              </BootstrapTable>



                {/* <table className={styles.table}>
                  <thead>
                    <tr>
                    <th className={styles.th}>S.no</th>
                      <th className={styles.th}>name</th>
                      <th className={styles.th}>Mail</th>
                      <th className={styles.th}>Phone</th>
                      <th className={styles.th}>Address</th>
                      <th className={styles.th}>assignedTo</th>
                      <th className={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.leadsList.length == 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          data not found
                        </td>
                      </tr>
                    ) : (
                      this.state.leadsList.map((list, index) => {
                        return (
                          <tr key={index}>
                            <td className={styles.td}>{index+1}</td>
                            <td className={styles.td}>{list.lead_name}</td>
                            <td className={styles.td}>{list.email}</td>
                            <td className={styles.td}>{list.phone}</td>
                            <td className={styles.td}>{list.address}</td>
                            <td className={styles.td}>
                              {list.assignedTo.fullName}
                            </td>
                            <td className={styles.td}>
                              <button
                                onClick={() => this.clickEventHandler(list._id)}
                              >
                                edit
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table> */}
              </CCardBody>
            </CCard>
          </CCol>
        </div>
      </div>
    );
  }
}
export default Leads;
