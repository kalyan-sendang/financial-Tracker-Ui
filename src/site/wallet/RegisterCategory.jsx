import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Button, Label } from "reactstrap";
import axiosInstance from "../../../axiosInstance";
import "../../styles/styles.css";

function RegisterCategory({ clickHandler }) {
  const [expenseCategoryForm, setExpenseCategoryForm] = useState({
    name: "",
    maxLimit: "",
  });

  function validateName(value) {
    let error;
    if (!value) {
      error = "Category name is Required";
    }
    return error;
  }

  function validateMaxLimit(value) {
    let error;
    if (!value) {
      error = "Amount is Required";
    } else if (value < 0) {
      error = "Amount cannot be negetive";
    } else if (!Number.isInteger(value)) {
      error = "Enter in number format";
    }
    return error;
  }

  const formikSubmit = async (value, action) => {
    try {
      await axiosInstance.post(`/expenseCategory`, value);
      clickHandler();
    } catch (error) {
      console.log("Error creating new Category", error);
    }
  };

  return (
    <div>
      <h3>
        <b>Add Expense category</b>
      </h3>
      <Formik initialValues={expenseCategoryForm} onSubmit={formikSubmit}>
        {({ errors, touched }) => (
          <Form>
            <div className="form-group mt-2">
              <Label>Expense Category name</Label>
              <Field
                className="form-control"
                name="name"
                type="text"
                validate={validateName}
              />
              {errors.name && touched.name && (
                <div style={{ color: "red" }}>{errors.name}</div>
              )}
            </div>
            <div className="form-group mt-2">
              <Label>Expense Limit</Label>
              <Field
                className="form-control"
                name="maxLimit"
                type="Number"
                validate={validateMaxLimit}
              />
              {errors.maxLimit && touched.maxLimit && (
                <div style={{ color: "red" }}>{errors.maxLimit}</div>
              )}
            </div>
            <div>
              <button type="submit" className="btn btn-primary mt-2 pe-3">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterCategory;
