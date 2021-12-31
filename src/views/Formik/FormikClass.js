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

class FormikClass extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          mail: "",
          password: "",
          phone: "",
          gender: "",
          education: "",
          terms: false,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),

          mail: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            .required("Password is required")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              "Required 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
            ),
          phone: Yup.string()
            .required("Number is required")
            .min(10, "Minimum 10 numbers")
            .max(13, "Maximum 13 numbers"),
          gender: Yup.string().required("Gender is required"),
          education: Yup.string().required("Education is required"),
          terms: Yup.boolean().oneOf([true], "Field is required"),
        })}
        onSubmit={(values) => {
          console.log("submit", values);
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
          <Form onSubmit={handleSubmit}>
            <CCol xs="10" md="10">
              <CCard>
                <CCardHeader>Form using formik class</CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Username</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="name"
                        name="name"
                        placeholder="enter name"
                        value={values.name}
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                      />
                      {touched.name && errors.name ? (
                        <div style={{ color: "red" }}>{errors.name}</div>
                      ) : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Mail</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="mail"
                        name="mail"
                        placeholder="enter mail"
                        value={values.mail}
                        onChange={handleChange("mail")}
                        onBlur={handleBlur("mail")}
                      />
                      {touched.mail && errors.mail ? (
                        <div style={{ color: "red" }}>{errors.mail}</div>
                      ) : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">phone</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="phone"
                        name="phone"
                        placeholder="enter phone number"
                        value={values.phone}
                        onChange={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                      />
                      {touched.phone && errors.phone ? (
                        <div style={{ color: "red" }}>{errors.phone}</div>
                      ) : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="password"
                        name="password"
                        placeholder="enter password"
                        value={values.password}
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                      />
                      {touched.password && errors.password ? (
                        <div style={{ color: "red" }}>{errors.password}</div>
                      ) : null}
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Select</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        custom
                        name="select"
                        id="select"
                        onChange={handleChange("education")}
                        onBlur={handleBlur("education")}
                      >
                        <option value="">Please select</option>
                        <option value="10th">10th</option>
                        <option value="Inter">Inter</option>
                        <option value="Btech">Btech</option>
                        <option value="Mtech">Mtech</option>
                      </CSelect>
                      {touched.education && errors.education ? (
                        <div style={{ color: "red" }}>{errors.education}</div>
                      ) : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Gender</CLabel>
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio1"
                          name="gender"
                          value="male"
                          onChange={handleChange("gender")}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio1"
                        >
                          male
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio2"
                          name="gender"
                          value="Female"
                          onChange={handleChange("gender")}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio2"
                        >
                          female
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="inline-radio3"
                          name="gender"
                          value="other"
                          onChange={handleChange("gender")}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-radio3"
                        >
                          other
                        </CLabel>
                      </CFormGroup>
                      {touched.gender && errors.gender ? (
                        <div style={{ color: "red" }}>{errors.gender}</div>
                      ) : null}
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="2">
                      {/* <CLabel>Inline Checkboxes</CLabel> */}
                    </CCol>
                    <CCol md="9">
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          custom
                          id="inline-checkbox1"
                          name="inline-checkbox1"
                          value="terms"
                          onChange={handleChange("terms")}
                          onBlur={handleBlur("terms")}
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor="inline-checkbox1"
                        >
                          terms and conditions
                        </CLabel>
                      </CFormGroup>
                      {touched.terms && errors.terms ? (
                        <div style={{ color: "red" }}>{errors.terms}</div>
                      ) : null}
                    </CCol>
                  </CFormGroup>
                </CCardBody>
                <CCol md="5" style={{ marginLeft: "30%" }}>
                  <CButton type="submit" size="sm" color="primary">
                    Submit
                  </CButton>
                  <CButton
                    style={{ marginLeft: "5%" }}
                    type="reset"
                    size="sm"
                    color="danger"
                  >
                    Reset
                  </CButton>
                </CCol>

                <CCardFooter></CCardFooter>
              </CCard>
            </CCol>
          </Form>
        )}
      ></Formik>
    );
  }
}
export default FormikClass;
