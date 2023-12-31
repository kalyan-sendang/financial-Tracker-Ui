import { Field, Form, Formik } from "formik";
import "../../../styles/styles.css";
import { useEffect, useState } from "react";
import { Label } from "reactstrap";
import axiosInstance from "../../../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

function UpdateExpenseCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenseCategoryForm, setExpenseCategoryForm] = useState({
    name: "",
    maxLimit: "",
  });

  const fetchData = async () => {
    const response = await axiosInstance.get(`/expenseCategory/${id}`);
    setExpenseCategoryForm(response?.data?.response);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
    } else if (value <= 0) {
      error = "Amount cannot be negetive or zero";
    } else if (!Number.isInteger(value)) {
      error = "Enter in number format";
    }
    return error;
  }

  const handleClick = () => {
    navigate("/user/category");
  };

  const formikSubmit = async (value, action) => {
    try {
      await axiosInstance.put(`/expense-category/${id}`, value);
      navigate("/user/category");
    } catch (error) {
      console.log("Error creating new Category", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div>
          <h3>
            <b>Update Expense category</b>
          </h3>
        </div>
      </div>
      <div className="name">
        <Formik
          initialValues={expenseCategoryForm}
          onSubmit={formikSubmit}
          enableReinitialize
        >
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
  );
}

export default UpdateExpenseCategory;
