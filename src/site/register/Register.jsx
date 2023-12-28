import { useState } from "react";
import "../../styles/styles.css";
import axiosInstance from "../../../axiosInstance.js";
import { Field, Form, Formik } from "formik";
import { Label } from "reactstrap";
import {
  validateEmail,
  validatePassword,
  validateProfession,
  validateUsername,
} from "../../validation/userFormValidation.js";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    userName: "",
    email: "",
    password: "",
    profession: "",
  });

  const formikSubmit = async (value, action) => {
    const response = await axiosInstance
      .post("/auth/user/register", value)
      .then(() => navigate("/login"))
      .catch((err) => err);
  };
  return (
    <div className="name">
      <div>
        <h1>User Registration</h1>
        <br></br>
        <Formik initialValues={userForm} onSubmit={formikSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <Label>UserName</Label>
                <Field
                  className="form-control"
                  name="userName"
                  type="text"
                  validate={validateUsername}
                />
                {errors.userName && touched.userName && (
                  <div style={{ color: "red" }}>{errors.userName}</div>
                )}
              </div>
              <div className="form-group">
                <Label>Email</Label>
                <Field
                  className="form-control"
                  name="email"
                  type="text"
                  validate={validateEmail}
                />
                {errors.email && touched.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
              </div>
              <div>
                <Label>Password</Label>
                <Field
                  className="form-control"
                  name="password"
                  type="password"
                  validate={validatePassword}
                />
                {errors.password && touched.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </div>
              <div>
                <Label>Profession </Label>
                <Field
                  className="form-control"
                  name="profession"
                  type="text"
                  validate={validateProfession}
                />
                {errors.profession && touched.profession && (
                  <div style={{ color: "red" }}>{errors.profession}</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default RegisterUser;
