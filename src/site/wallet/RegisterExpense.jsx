import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Field, Form, Formik } from "formik";
import { Button, Label } from "reactstrap";
import {
  ValidateAmount,
  validateNote,
} from "../../validation/expenseFormvalidation";
import { useNavigate } from "react-router-dom";
import RegisterCategory from "./RegisterCategory";
import { emitErrorToast } from "../components/toastify/toastEmitter";

function RegisterExpense() {
  const navigate = useNavigate();

  const wallet = JSON.parse(localStorage.getItem("wallet"));
  const walletId = wallet?.walletId;
  const [categories, setCategories] = useState([]);
  const [expenseForm, setExpenseForm] = useState({
    expenseCategoryId: 1,
    amount: "",
    note: "",
  });

  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosInstance.get("/expenseCategory");
      const data = response?.data;
      const categories = data?.response;
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching expenseCategories:", error);
    }
  };
  useEffect(() => {
    fetchExpenseCategories();
  }, []);

  const formikSubmit = async (value, action) => {
    try {
      await axiosInstance.post(`/expense/${walletId}`, value);
      navigate("/user/wallet");
    } catch (error) {
      const responseData = error?.response?.data?.message;
      emitErrorToast(responseData);
    }
  };

  const categoryHandler = () => {
    setShowCategoryForm(true);
  };

  const clickHandler = () => {
    fetchExpenseCategories();
    setShowCategoryForm(false);
  };
  const handleClick = () => {
    navigate("/user/wallet");
  };
  return (
    <div className="name">
      {showCategoryForm ? (
        <div>
          <div>
            <button
              className="bg-danger rounded pt-1 pb-1 "
              style={{ height: "35px", float: "right" }}
              onClick={() => {
                setShowCategoryForm(false);
                fetchExpenseCategories();
              }}
              type="button"
            >
              <i className="fa-solid fa-xmark fa-fade fa-lg"></i>
            </button>
          </div>
          <RegisterCategory clickHandler={clickHandler} />
        </div>
      ) : (
        <div>
          <div>
            <Button
              className="bg-danger rounded pt-1 pb-1 "
              style={{ height: "35px", float: "right" }}
              onClick={handleClick}
            >
              <i className="fa-solid fa-xmark fa-fade fa-lg"></i>
            </Button>
          </div>
          <h1>Expense Registration</h1>
          <br></br>
          <Formik initialValues={expenseForm} onSubmit={formikSubmit}>
            {({ errors, touched }) => (
              <Form>
                <div className="form-group">
                  <Label>Select Category</Label>
                  <Field
                    className="form-control"
                    as="select"
                    name="expenseCategoryId"
                  >
                    {categories.map((category, idx) => (
                      <option value={category?.expenseCategoryId} key={idx}>
                        <span>{category.name}</span>
                        <span> MaxLimit: Rs. {category.maxLimit}</span>
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="mt-2">
                  <button
                    type="button"
                    className="btn"
                    style={{ color: "green", border: "none", outline: "none" }}
                    onClick={categoryHandler}
                  >
                    + Add Category
                  </button>
                </div>
                <div className="form-group mt-2">
                  <Label>Amount</Label>
                  <Field
                    className="form-control"
                    name="amount"
                    type="Number"
                    validate={ValidateAmount}
                  />
                  {errors.amount && touched.amount && (
                    <div style={{ color: "red" }}>{errors.amount}</div>
                  )}
                </div>
                <div className="form-group mt-2">
                  <Label>Note</Label>
                  <Field
                    className="form-control"
                    name="note"
                    type="text"
                    validate={validateNote}
                  />
                  {errors.note && touched.note && (
                    <div style={{ color: "red" }}>{errors.note}</div>
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
      )}
    </div>
  );
}

export default RegisterExpense;
