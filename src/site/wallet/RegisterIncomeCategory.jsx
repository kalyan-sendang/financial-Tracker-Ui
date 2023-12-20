import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Label } from "reactstrap";
import axiosInstance from "../../../axiosInstance";

function RegisterIncomeCategory({ clickHandler }) {
  const [incomeCategoryForm, setIncomeCategoryForm] = useState({
    name: "",
  });

  function validateName(value) {
    let error;
    if (!value) {
      error = "Category name is Required";
    }
    return error;
  }

  const formikSubmit = async (value, action) => {
    try {
      await axiosInstance.post(`/incomeCategory`, value);
      clickHandler();
    } catch (error) {
      console.log("Error creating new Category", error);
    }
  };

  return (
    <Formik initialValues={incomeCategoryForm} onSubmit={formikSubmit}>
      {({ errors, touched }) => (
        <Form>
          <div className="form-group mt-2">
            <Label>Income Category name</Label>
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
          <div>
            <button type="submit" className="btn btn-primary mt-2 pe-3">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default RegisterIncomeCategory;
