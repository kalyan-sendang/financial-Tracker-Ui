import { useQuery } from "@tanstack/react-query";
import { Table } from "reactstrap";
import { getExpenses } from "../../services/ExpenseRoutes";
import ExpenseList from "./ExpenseList";

function Expense() {
  const { data, isLoading } = useQuery({
    queryKey: ["getExpenses"],
    queryFn: () => getExpenses(),
  });

  const expenses = data?.data?.response;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Expenses</h3>
      <Table bordered hover>
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
