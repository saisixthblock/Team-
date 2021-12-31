import React, { useState } from "react";
import { Link } from "react-router-dom";
//import { browserHistory } from "react-router";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import userData from "../loginData/LoginData";
import Swal from "sweetalert2";
import axios from "axios";

const Login = (props) => {
  //console.log(userData.phone);

  let [name, setname] = useState({ phone: "", phoneerr: "" });
  let [pwd, setpwd] = useState({ password: "", passworderr: "" });

  let phoneEventHandler = (e) => {
    //console.log(e.target.value);
    if (e.target.value != "") {
      //console.log("if");
      setname({ phone: e.target.value, phoneerr: "" });
    } else {
      //console.log("else");
      setname({ phone: "", phoneerr: "Phone number is required" });
    }
  };
  let passwordEventHandler = (e) => {
    setpwd({ password: e.target.value });
    if (e.target.value != "") {
      //console.log("if");
      setpwd({ password: e.target.value, passworderr: "" });
    } else {
      setpwd({ password: "", passworderr: "Password is required" });
    }
  };
  let SubmitEventHandler = () => {
    if (name.phone == "") {
      setname({ phoneerr: "Phone number is required" });
    }
    if (pwd.password == "") {
      setpwd({ passworderr: "Password is required" });
    }
    if (name.phone != "" && pwd.password != "") {
      axios
        .post("http://localhost:3000/user/api/company/user/login", {
          phone: name.phone,
          password: pwd.password,
        })
        .then((response) => {
          console.log(response.data);
          //console.log(response.data.data.token);
          localStorage.setItem("loginToken", response.data.data.token);
          localStorage.setItem(
            "loginCompanyId",
            response.data.data.user.company._id
          );
          localStorage.setItem("loginUserId", response.data.data.user._id);
          props.history.push("/home");
          Swal.fire("login success", "welcome");
          console.log("suc");
        })
        .catch((error) => {
          console.log(error);
          Swal.fire("Login failed", "invalid inputs");
        });

      //console.log(name.phone, pwd.password);
      // for (let i = 0; i < userData.length; i++) {
      //   //console.log(userData[i]);
      //   if (
      //     userData[i].phone === name.phone &&
      //     userData[i].password === pwd.password
      //   ) {
      //     props.history.push("/home");
      //     return Swal.fire("login success", "welcome");
      //   }
      // }
      // return Swal.fire("fail", "fail");
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        value={name.phone || ""}
                        onChange={phoneEventHandler}
                        onBlur={phoneEventHandler}
                        placeholder="Enter your phone number"
                        autoComplete="phone"
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>{name.phoneerr}</span>
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        value={pwd.password || ""}
                        onChange={passwordEventHandler}
                        onBlur={passwordEventHandler}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <span style={{ color: "red" }}>{pwd.passworderr}</span>
                    <CRow>
                      <CCol xs="6" className="mt-3">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={SubmitEventHandler}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
//"!**/*index.js",
     