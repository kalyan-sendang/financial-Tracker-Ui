import { useQuery } from "@tanstack/react-query";
import { Button, Col, Table } from "reactstrap";
import { getExpenses } from "../../services/ExpenseRoutes";
import ExpenseList from "./ExpenseList";
import { useNavigate } from "react-router-dom";

function Expense() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["getExpenses"],
    queryFn: () => getExpenses(),
  });

  const expenses = data?.data?.response;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const expenseHandler = async () => {
    navigate("/user/wallet/registerExpense");
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h3>Expenses</h3>
        </div>
        <div className="col d-flex justify-content-end">
          <Button
            className="mt-auto bg-danger"
            style={{ border: "none" }}
            onClick={expenseHandler}
          >
            Add expenses
          </Button>
        </div>
      </div>

      <Table bordered hover className="mt-2">
        <thead>
          <tr>
            <th>ExpenseId</th>
            <th>Category</th>
            <th>Amount</th>
            <th>date</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense, idx) => (
            // different compo
            <ExpenseList key={idx} expense={expense} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Expense;
