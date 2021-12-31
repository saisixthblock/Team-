import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Formik = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      education: "",
      terms: false,
    },
    onSubmit: (values) => {
      console.log("submit", values);
    },
    // validate: (values) => {
    //   console.log("vald");
    //   let errors = {};
    //   if (!values.name) {
    //     errors.name = "Name required";
    //   }
    //   if (!values.email) {
    //     errors.email = "Email required";
    //   }
    //   if (!values.password) {
    //     errors.password = "Password required";
    //   }
    //   return errors;
    // },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().required("Mail is required").email("Invalid mail"),
      gender: Yup.string().required("Gender is required"),
      education: Yup.string().required("Education is required"),
      terms: Yup.boolean().oneOf([true], "Field is required"),
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
    }),
  });
  //console.log(formik.values)
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Name</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: "red" }}>{formik.errors.name}</div>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>
                <label>E-mail</label>
              </td>
              <td>
                <input
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <label>Password</label>
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>
                <label>phone</label>
              </td>
              <td>
                <input
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div style={{ color: "red" }}>{formik.errors.phone}</div>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>
                <label>Gender</label>
              </td>
              <td>
                {" "}
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={formik.handleChange}
                />
                male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={formik.handleChange}
                />
                female
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={formik.handleChange}
                />
                other
                {formik.errors.gender ? (
                  <div style={{ color: "red" }}>{formik.errors.gender}</div>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>
                <label>education</label>
              </td>
              <td>
                <select
                  name="education"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">select</option>
                  <option value="10th">10th</option>
                  <option value="inter">inter</option>
                  <option value="Btech">Btech</option>
                  <option value="Mtech">Mtech</option>
                </select>
                {formik.errors.education ? (
                  <div style={{ color: "red" }}>{formik.errors.education}</div>
                ) : null}
              </td>
            </tr>
            <tr>
              <td> </td>
              <td>
                {" "}
                <input
                  type="checkbox"
                  name="terms"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                terms and conditions
                {formik.errors.terms ? (
                  <div style={{ color: "red" }}>{formik.errors.terms}</div>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Formik;
