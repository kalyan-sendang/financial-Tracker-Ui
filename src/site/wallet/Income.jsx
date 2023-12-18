import { useQuery } from "@tanstack/react-query";
import { getIncomes } from "../../services/IncomeRoutes";
import { Table } from "reactstrap";
import IncomeList from "./IncomeList";

function Income() {
  const { data, isLoading } = useQuery({
    queryKey: ["getIncomes"],
    queryFn: () => getIncomes(),
  });

  const incomes = data?.data?.response;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Incomes</h3>
      <Table bordered hover>
        <thead>
          <tr>
            <th>IncomeId</th>
            <th>Category</th>
            <th>Amount</th>
            <th>date</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {incomes?.map((income, idx) => (
            // different compo
            <IncomeList key={idx} income={income} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Income;
