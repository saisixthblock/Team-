import React from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { render } from "enzyme";
import userData from "../loginData/LoginData";
import axios from "axios";

class Register extends React.Component {
  state = {
    username: "",
    usernameerr: "",
    mail: "",
    mailerr: "",
    phone: "",
    phoneerr: "",
    password: "",
    passworderr: "",
    company: "",
    companyerr: "",
    address: "",
    addresserr: "",
    data: { username: "" },
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
  companyEventHandler = (e) => {
    this.setState({
      company: e.target.value,
      companyerr: "",
    });
    if (e.target.value == "") {
      this.setState({
        companyerr: "Field is required",
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
    //console.log(userData);
    if (this.state.username == "") {
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
    if (this.state.company == "") {
      this.setState({
        companyerr: "Field is required",
      });
    }
    if (this.state.address == "") {
      this.setState({
        addresserr: "Address is required",
      });
    } else {
      // userData.push({
      //   username: this.state.username,
      //   phone: this.state.phone,
      //   mail: this.state.mail,
      //   password: this.state.password,
      //   company: this.state.company,
      //   address: this.state.address,
      // });
      // console.log(userData);
      axios
        .post("http://localhost:3000/user/api/company/registartion", {
          fullName: this.state.username,
          phone: this.state.phone,
          email: this.state.mail,
          password: this.state.password,
          companyName: this.state.company,
          address: this.state.address,
        })
        .then((response) => {
          console.log(response.data);
          this.props.history.push("/login");
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <form onSubmit={this.submitEventHandler}>
                  <CCardBody className="p-4">
                    {/* <CForm> */}
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        // autoComplete="username"
                        value={this.state.username}
                        onChange={this.userEventHandler}
                        onBlur={this.userEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>
                      {this.state.usernameerr}
                    </span>
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        value={this.state.mail}
                        onChange={this.mailEventHandler}
                        onBlur={this.mailEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>{this.state.mailerr}</span>
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-phone" />
                          {/*cil-screen-smartphone*/}
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Phone number"
                        autoComplete="phone"
                        value={this.state.phone}
                        onChange={this.phoneEventHandler}
                        onBlur={this.phoneEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>{this.state.phoneerr}</span>
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
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
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-star" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Company name"
                        autoComplete="company"
                        value={this.state.company}
                        onChange={this.companyEventHandler}
                        onBlur={this.companyEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>
                      {this.state.companyerr}
                    </span>
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-calculator" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Address"
                        autoComplete="address"
                        value={this.state.address}
                        onChange={this.addressEventHandler}
                        onBlur={this.addressEventHandler}
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>
                      {this.state.addresserr}
                    </span>
                    <CButton
                      color="success"
                      block
                      type="submit"
                      className="mt-3"
                    >
                      Create Account
                    </CButton>
                    {/* </CForm> */}
                  </CCardBody>
                </form>
                <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" sm="6">
                      <p style={{ marginTop: "6px" }}>
                        Already have an account ?
                      </p>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <Link to="/Login">
                        <CButton className="btn-twitter mb-1" block>
                          <span>login</span>
                        </CButton>
                      </Link>
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Register;
