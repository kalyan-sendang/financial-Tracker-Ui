import { useState } from "react";
import "../../styles/styles.css";
import axiosInstance from "../../../axiosInstance.js";
import { Field, Form, Formik } from "formik";
import { Label } from "reactstrap";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../validation/userFormValidation.js";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    userName: "",
    email: "",
    password: "",
    role: "USER",
  });

  const formikSubmit = async (value, action) => {
    const response = await axiosInstance
      .post("/user", value)
      .then(() => navigate("/admin/user"))
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
                  type="text"
                  validate={validatePassword}
                />
                {errors.password && touched.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </div>
              <div>
                <Label>Roles: </Label>
                <Field className="form-control" as="select" name="role">
                  <option value="USER">USER</option>
                  <option value="INTERN">INTERN</option>
                  <option value="ADMIN">ADMIN</option>
                </Field>
              </div>
              <button type="submit" className="btn btn-primary">
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
