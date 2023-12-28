import { useState } from "react";
import "../../styles/styles.css";
import { Field, Form, Formik } from "formik";
import { Label } from "reactstrap";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Col, Row } from "react-bootstrap";
import axiosInstance from "../../../axiosInstance";
import { getWallet } from "../../services/Routes";

const LoginUser = ({ setUser }) => {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    userName: "",
    password: "",
  });

  function validateUsername(value) {
    let error;
    if (!value) {
      error = "UseName is Required";
    } else if (!/^[a-zA-Z0-9_-]{3,20}$/i.test(value)) {
      error = "Invalid Username";
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is Required";
    } else if (value.length < 6) {
      error = "Password must be at least 6 characters long";
    }
    return error;
  }

  const formikSubmit = async (value, action) => {
    try {
      const { status, data } = await axiosInstance.post(
        "/auth/user/login",
        value
      );
      const token = data?.token;

      Cookies.set("auth", "Bearer " + token);
      if (status === 200 && Cookies.get("auth")) {
        const response = await axiosInstance.get(`/userprofile`);
        localStorage.setItem("userprofile", JSON.stringify(response?.data));
        setUser(response?.data);
        const resData = await getWallet();
        console.log(resData?.data?.response);
        if (resData?.data?.success === true) {
          localStorage.setItem(
            "wallet",
            JSON.stringify(resData?.data?.response)
          );
          navigate("/user/wallet");
        }
        // else {
        //   navigate("/wallet/registerwallet");
        // }
      }
    } catch (error) {
      navigate("/user/register-wallet");
    }
  };
  return (
    <div className="name" style={{ paddingBottom: "200px" }}>
      <div>
        <h1>Login User!!!</h1>
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
              <br></br>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <Row className="py-3">
          <Col>
            New Customer? <Link to={"/register"}>Register</Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LoginUser;
