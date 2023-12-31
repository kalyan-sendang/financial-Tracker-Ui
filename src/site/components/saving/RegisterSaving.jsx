import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Label } from "reactstrap";
import "../../../styles/styles.css";
import {
  validateAmount,
  validateName,
} from "../../../validation/savingFormValidation";
import { emitErrorToast, emitSuccessToast } from "../toastify/toastEmitter";
import axiosInstance from "../../../../axiosInstance";
import { useNavigate } from "react-router-dom";

function RegisterSaving() {
  const navigate = useNavigate();
  const [financialGoal, setFinancialGoal] = useState({
    goal: "",
    amount: "",
    goalAmount: "",
  });

  const formikSubmit = async (value, action) => {
    try {
      const response = await axiosInstance.post(`/saving`, value);
      emitSuccessToast(response?.data?.message);
      navigate("/user/saving");
    } catch (error) {
      const res = error?.response?.data?.message;
      emitErrorToast(res);
    }
  };

  const handleClick = () => {
    navigate("/user/saving");
  };
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="pt-5">
          <h3>
            <b>Add Fianacial Goal</b>
          </h3>
          <div>
            <Formik initialValues={financialGoal} onSubmit={formikSubmit}>
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group mt-2">
                    <Label>Goal Name:</Label>
                    <Field
                      className="form-control"
                      name="goal"
                      type="text"
                      validate={validateName}
                    />
                    {errors.goal && touched.goal && (
                      <div style={{ color: "red" }}>{errors.goal}</div>
                    )}
                  </div>
                  <div className="form-group mt-2">
                    <Label>Amount:</Label>
                    <Field
                      className="form-control"
                      name="amount"
                      type="Number"
                      validate={validateAmount}
                    />
                    {errors.amount && touched.amount && (
                      <div style={{ color: "red" }}>{errors.amount}</div>
                    )}
                  </div>
                  <div className="form-group mt-2">
                    <Label>Goal Amount:</Label>
                    <Field
                      className="form-control"
                      name="goalAmount"
                      type="Number"
                      validate={validateAmount}
                    />
                    {errors.amount && touched.amount && (
                      <div style={{ color: "red" }}>{errors.amount}</div>
                    )}
                  </div>
                  <div>
                    <button type="submit" className="btn btn-success mt-2 pe-3">
                      Submit
                    </button>
                    <button
                      className="bg-danger rounded pt-1 pb-1 mt-2 pe-3"
                      style={{ height: "35px", float: "right" }}
                      onClick={() => {
                        handleClick();
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSaving;
