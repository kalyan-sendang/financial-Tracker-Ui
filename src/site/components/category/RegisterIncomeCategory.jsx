import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Label } from "reactstrap";
import axiosInstance from "../../../../axiosInstance";
import { emitErrorToast, emitSuccessToast } from "../toastify/toastEmitter";

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
      const response = await axiosInstance.post(`/income-category`, value);
      console.log(response?.data?.message);
      emitSuccessToast(response?.data?.message);
      clickHandler();
    } catch (error) {
      const res = error?.response?.data?.message;
      emitErrorToast(res);
      console.log("Error creating new Category", error);
    }
  };

  return (
    <div>
      <h3>
        <b>Add Income category</b>
      </h3>
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
    </div>
  );
}

export default RegisterIncomeCategory;
