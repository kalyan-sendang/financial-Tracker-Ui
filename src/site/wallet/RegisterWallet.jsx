import { Field, Form, Formik } from "formik";
import { Label } from "reactstrap";
import axiosInstance from "../../../axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWallet } from "../../services/Routes";
import {
  emitErrorToast,
  emitSuccessToast,
} from "../components/toastify/toastEmitter";

function RegisterWallet() {
  const navigate = useNavigate();
  const [walletForm, setWalletForm] = useState({
    walletName: "",
    amount: "",
  });

  function validateWalletName(value) {
    let error;
    if (!value) {
      error = "Wallet name is Required";
    } else if (!/^[a-zA-Z0-9_-]{3,20}$/i.test(value)) {
      error = "Invalid Wallet Name";
    }
    return error;
  }

  function ValidateAmount(value) {
    let error;
    if (!value) {
      error = "Amount is Required";
    } else if (value < 0) {
      error = "Price cannot be negetive";
    } else if (!Number.isInteger(value)) {
      error = "Enter in number format";
    }
    return error;
  }

  const formikSubmit = async (value, action) => {
    try {
      const { status } = await axiosInstance.post("/wallet", value);
      if (status === 200) {
        const response = await getWallet();
        emitSuccessToast(response?.data?.message);
        localStorage.setItem(
          "wallet",
          JSON.stringify(response?.data?.response)
        );
        navigate("/user/wallet");
      }
    } catch (error) {
      const responseData = error?.response?.data?.message;
      emitErrorToast(responseData);
    }
  };
  return (
    <div className="name" style={{ paddingRight: "4rem" }}>
      <div>
        <h1>Add Wallet</h1>
        <br></br>
        <Formik initialValues={walletForm} onSubmit={formikSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <Label>Wallet Name</Label>
                <Field
                  className="form-control"
                  name="name"
                  type="text"
                  validate={validateWalletName}
                />
                {errors.name && touched.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <Label>Amount</Label>
                <Field
                  className="form-control"
                  name="amount"
                  type="number"
                  validate={ValidateAmount}
                />
                {errors.amount && touched.amount && (
                  <div style={{ color: "red" }}>{errors.amount}</div>
                )}
              </div>
              <div style={{ paddingTop: " 10px" }}>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterWallet;
