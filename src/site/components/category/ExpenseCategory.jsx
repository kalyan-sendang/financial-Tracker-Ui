import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  expensePerCategory,
  getExpenseCategory,
} from "../../../services/ExpenseRoutes";
import ExpenseCategoryList from "./ExpenseCategoryList";
import axiosInstance from "../../../../axiosInstance";

function ExpenseCategory() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getExpenseCategory"],
    queryFn: () => getExpenseCategory(),
  });
  const { data: totalExpense } = useQuery({
    queryKey: [`getExpenseByCategory`],
    queryFn: () => expensePerCategory(),
  });
  const amountSpent = totalExpense?.data?.response || {};
  const expenseCategories = data?.data?.response;
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const incomeHandler = async () => {
  //   navigate("/user/wallet/registerIncome");
  // };
  const onDelete = async (id) => {
    const response = await axiosInstance.delete(`/expenseCategory/${id}`);
    refetch();
  };

  const onUpdate = async (id) => {
    console.log(id);
    navigate(`/user/category/updateExpenseCategory/${id}`);
  };

  const expenseHandler = async () => {
    navigate("/user/category/expenseCategory");
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h3>Expense Category</h3>
        </div>
        <div className="col d-flex justify-content-end">
          <Button
            className="mt-auto bg-primary"
            style={{ border: "none" }}
            onClick={expenseHandler}
          >
            Add expense Category
          </Button>
        </div>
      </div>
      <Table bordered hover className="mt-2">
        <thead>
          <tr>
            <th>ExpenseCategoryId</th>
            <th>Name</th>
            <th>Maximum Limit</th>
            <th>Amount Left</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenseCategories?.map((expenseCategory, idx) => (
            // different compo
            <ExpenseCategoryList
              key={idx}
              expenseCategory={expenseCategory}
              onDelete={onDelete}
              onUpdate={onUpdate}
              amountSpent={amountSpent}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseCategory;
