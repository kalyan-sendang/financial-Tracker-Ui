import { useQuery } from "@tanstack/react-query";
import { getIncomes } from "../../services/IncomeRoutes";
import { Button, Table } from "reactstrap";
import IncomeList from "./IncomeList";
import { useNavigate } from "react-router-dom";

function Income() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["getIncomes"],
    queryFn: () => getIncomes(),
  });

  const incomes = data?.data?.response;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const incomeHandler = async () => {
    navigate("/user/wallet/registerIncome");
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h3>Incomes</h3>
        </div>
        <div className="col d-flex justify-content-end">
          <Button
            className="mt-auto bg-success "
            style={{ border: "none" }}
            onClick={incomeHandler}
          >
            Add income
          </Button>
        </div>
      </div>
      <Table bordered hover className="mt-2">
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
