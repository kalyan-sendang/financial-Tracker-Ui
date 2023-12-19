import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Field, Form, Formik } from "formik";
import { Label } from "reactstrap";
import {
  ValidateAmount,
  validateNote,
} from "../../validation/expenseFormvalidation";
import { useNavigate } from "react-router-dom";

function RegisterIncome() {
  const navigate = useNavigate();

  const wallet = JSON.parse(localStorage.getItem("wallet"));
  const walletId = wallet?.walletId;
  const [categories, setCategories] = useState([]);
  const [incomeForm, setIncomeForm] = useState({
    incomeCategoryId: 1,
    amount: "",
    note: "",
  });

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/incomeCategory");
      const data = response?.data;
      const categories = data?.response;
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching expenseCategories:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const formikSubmit = async (value, action) => {
    console.log(walletId);
    const response = await axiosInstance
      .post(`/income/${walletId}`, value)
      .then(() => navigate("/user/wallet"))
      .catch((err) => err);
    console.log(response);
  };
  return (
    <div className="name">
      <div>
        <h1>Income Registration</h1>
        <br></br>
        <Formik initialValues={incomeForm} onSubmit={formikSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <Label>Select Category</Label>
                <Field
                  className="form-control"
                  as="select"
                  name="incomeCategoryId"
                >
                  {categories.map((category, idx) => (
                    <option value={category?.incomeCategoryId} key={idx}>
                      {category?.name}
                    </option>
                  ))}
                </Field>
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
    </div>
  );
}

export default RegisterIncome;
