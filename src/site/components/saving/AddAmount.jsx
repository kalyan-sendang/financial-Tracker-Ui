import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { Label } from "reactstrap";
import { emitErrorToast, emitSuccessToast } from "../toastify/toastEmitter";
import axiosInstance from "../../../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/styles.css";
import { getASaving } from "../../../services/savingRoutes";
import { useQuery } from "@tanstack/react-query";

function AddAmount() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState({
    amount: "",
  });
  const { data, isLoading } = useQuery({
    queryKey: ["getASaving"],
    queryFn: () => getASaving(id),
  });
  const saving = data?.data?.response;
  if (isLoading) {
    return <div>Loading....</div>;
  }

  function validateAmount(value) {
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

  const formikSubmit = async (value, action) => {
    try {
      const response = await axiosInstance.put(`/saving/${id}`, value);
      emitSuccessToast(response?.data?.message);
      navigate("/user/saving");
    } catch (error) {
      const res = error?.response?.data?.message;
      emitErrorToast(res);
      console.log("Error creating new Category", error);
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
            <b>Add Amount</b>
          </h3>
          <div>
            <Formik initialValues={amount} onSubmit={formikSubmit}>
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group mt-2">
                    <Label>Goal:</Label>

                    <Field className="form-control" value={saving?.goal} />
                  </div>

                  <div className="form-group mt-2">
                    <Label>Amount :</Label>
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

export default AddAmount;
