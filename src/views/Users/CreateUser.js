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
import CIcon from "@coreui/icons-react";
import userDataList from "./UsersDataList";
import Swal from "sweetalert2";
import axios from "axios";

class CreateUser extends React.Component {
  state = {
    username: "",
    usernameerr: "",
    mail: "",
    mailerr: "",
    phone: "",
    phoneerr: "",
    password: "",
    passworderr: "",
    userType: "",
    userTypeerr: "",
    address: "",
    addresserr: "",
    id: this.props.match.params.id,
  };

  userEventHandler = (e) => {
    //console.log("y");
    this.setState({
      username: e.target.value,
      usernameerr: "",
    });
    if (e.target.value == "") {
      this.setState({
        usernameerr: "Username is required",
      });
    }
  };
  mailEventHandler = (e) => {
    let ge = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      mail: e.target.value,
    });
    if (ge.test(e.target.value)) {
      this.setState({
        mail: e.target.value,
        mailerr: "",
      });
    } else {
      this.setState({
        mailerr: "invalid mail",
      });
    }
    if (e.target.value == "") {
      this.setState({
        mailerr: "Mail is required",
      });
    }
  };
  phoneEventHandler = (e) => {
    let rg = /^[a-zA-Z\s]+$/;
    if (!rg.test(e.target.value)) {
      this.setState({
        phone: e.target.value,
        phoneerr: "",
      });
    } else {
      this.setState({
        phoneerr: "This field allows only numbers",
      });
    }
    if (e.target.value == "") {
      this.setState({
        phoneerr: "Phone number is required",
      });
    }
  };
  pwdEventHandler = (e) => {
    this.setState({
      password: e.target.value,
      passworderr: "",
    });
    if (e.target.value == "") {
      this.setState({
        passworderr: "Password is required",
      });
    }
  };
  userTypeEventHandler = (e) => {
    this.setState({
      userType: e.target.value,
      userTypeerr: "",
    });
    if (e.target.value == "") {
      this.setState({
        userTypeerr: "Field is required",
      });
    }
  };
  addressEventHandler = (e) => {
    this.setState({
      address: e.target.value,
      addresserr: "",
    });
    if (e.target.value == "") {
      this.setState({
        addresserr: "Address is required",
      });
    }
  };
  submitEventHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    if (this.state.username.length <= 2) {
      this.setState({
        usernameerr: "Username is required",
      });
    }
    if (this.state.mail == "") {
      this.setState({
        mailerr: "Mail is required",
      });
    }
    if (this.state.phone == "") {
      this.setState({
        phoneerr: "Phone number is required",
      });
    }
    if (this.state.password == "") {
      this.setState({
        passworderr: "Password is required",
      });
    }
    if (this.state.userType == "") {
      this.setState({
        userTypeerr: "Field is required",
      });
    }
    if (this.state.address == "") {
      this.setState({
        addresserr: "Address is required",
      });
    } else {
      var loginUserId = localStorage.getItem("loginUserId");
      var obj = {};
      obj.fullName = this.state.username;
      obj.user_type = this.state.userType;
      obj.email = this.state.mail;
      obj.password = this.state.password;
      obj.phone = this.state.phone;
      // obj.designation=this.state.username;
      obj.address = this.state.address;
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("loginToken");
      if (this.state.id == "new") {
        // userDataList.push({
        //   username: this.state.username,
        //   phone: this.state.phone,
        //   mail: this.state.mail,
        //   password: this.state.password,
        //   userType: this.state.userType,
        //   address: this.state.address,
        // });
        //console.log(userDataList);

        axios
          .post(
            "http://localhost:3000/user/api/add/members/company/" + loginUserId,
            obj
          )
          .then((response) => {
            console.log(response.data);
            this.props.history.push("/users");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User created successfully",
              //showConfirmButton: false,
              //timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error.response.data);
            if (error.response.data.status == 500) {
              Swal.fire("details already exists!", "enter new details");
            }
          });
      } else {
        axios.defaults.headers.common["Authorization"] =
          localStorage.getItem("loginToken");
        axios
          .put(
            "http://localhost:3000/user/api/update/company/member/" +
              this.state.id,
            obj
          )
          .then((response) => {
            //console.log(response.data);
            this.props.history.push("/users");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User details updated successfully",
              //showConfirmButton: false,
              // timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response.data.status == 500) {
              Swal.fire("details already exists!", "enter new details");
            }
          });
        //console.log("else");
        // userDataList.map((list, index) => {
        //   if (list.phone == this.state.id) {
        //     userDataList[index].phone = this.state.phone;
        //     userDataList[index].username = this.state.username;
        //     userDataList[index].mail = this.state.mail;
        //     userDataList[index].password = this.state.password;
        //     userDataList[index].userType = this.state.userType;
        //     userDataList[index].address = this.state.address;
        //   }
        // });
        // this.props.history.push("/users");
        // Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: "User details updated successfully",
        //   //showConfirmButton: false,
        //   // timer: 1500,
        // });
      }
    }
  };
  componentDidMount() {
    //console.log(userDataList);
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("loginToken");
    axios
      .get(
        "http://localhost:3000/user/api/display/company/member/" + this.state.id
      )
      .then((response) => {
        //console.log(response.data.data.data);
        let { fullName, phone, email, user_type, password, address } =
          response.data.data.data;
        this.setState({
          phone: phone,
          mail: email,
          username: fullName,
          password: password,
          userType: user_type,
          address: address,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    // for (let i = 0; i < userDataList.length; i++) {
    //   //console.log(userData[i]);
    //   if (userDataList[i].phone === this.state.id) {
    //     // console.log("if");
    //     this.setState({
    //       phone: userDataList[i].phone,
    //       mail: userDataList[i].mail,
    //       username: userDataList[i].username,
    //       password: userDataList[i].password,
    //       userType: userDataList[i].userType,
    //       address: userDataList[i].address,
    //     });
    //   }
    // }
  }
  render() {
    return (
      <div>
        <CCol>
          <CCard>
            <CCardHeader>
              {this.state.id == "new" ? "Create User" : "Update User"}
            </CCardHeader>
            <CCardBody>
              <form>
                <CFormGroup row>
                  <CCol xs="12" md="4">
                    Username
                    <CInputGroup>
                      <CInput
                        placeholder="Enter your username"
                        // autoComplete="username"
                        value={this.state.username}
                        onChange={this.userEventHandler}
                        onBlur={this.userEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>
                      {this.state.usernameerr}
                    </span>
                  </CCol>
                  <CCol xs="12" md="4">
                    Mail
                    <CInputGroup>
                      <CInput
                        placeholder="Enter your mail"
                        autoComplete="email"
                        value={this.state.mail}
                        onChange={this.mailEventHandler}
                        onBlur={this.mailEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>{this.state.mailerr}</span>
                  </CCol>
                  <CCol xs="12" md="4">
                    Phone number
                    <CInputGroup>
                      <CInput
                        placeholder="enter your phone number"
                        autoComplete="phone"
                        value={this.state.phone}
                        onChange={this.phoneEventHandler}
                        onBlur={this.phoneEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>{this.state.phoneerr}</span>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="12" md="4">
                    Password
                    <CInputGroup>
                      {/* <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend> */}

                      <CInput
                        placeholder="Password"
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.pwdEventHandler}
                        onBlur={this.pwdEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>
                      {this.state.passworderr}
                    </span>
                  </CCol>

                  <CCol xs="12" md="4">
                    Address
                    <CInputGroup>
                      <CInput
                        placeholder="Enter your address"
                        autoComplete="address"
                        value={this.state.address}
                        onChange={this.addressEventHandler}
                        onBlur={this.addressEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>
                      {this.state.addresserr}
                    </span>
                  </CCol>
                  <CCol xs="12" md="4">
                    User type
                    <CInputGroup>
                      <CSelect
                        custom
                        name="select"
                        id="select"
                        onChange={this.userTypeEventHandler}
                        onBlur={this.userTypeEventHandler}
                        value={this.state.userType}
                      >
                        <option value="">Please select</option>
                        <option value="Admin">Admin</option>
                        <option value="Caller">Caller</option>
                      </CSelect>
                    </CInputGroup>
                    <span style={{ color: "red" }}>
                      {this.state.userTypeerr}
                    </span>
                  </CCol>
                </CFormGroup>
                <CCol style={{ marginLeft: "34%" }}>
                  <CFormGroup className="form-actions">
                    <CButton
                      onClick={() => this.props.history.push("/users")}
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
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </div>
    );
  }
}
export default CreateUser;
