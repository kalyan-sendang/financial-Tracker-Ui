import { useQuery } from "@tanstack/react-query";
import { getIncomePerMonth, getIncomes } from "../../services/IncomeRoutes";
import { Button, Table } from "reactstrap";
import IncomeList from "./IncomeList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { renderMonthOptions } from "./RenderMonthOptions";

function Income() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [allIncomesEnabled, setAllIncomesEnabled] = useState(false);

  const {
    data,
    isLoading,
    refetch: refetchAllIncomes,
  } = useQuery({
    queryKey: ["getIncomes"],
    queryFn: () => getIncomes(),
    enabled: allIncomesEnabled,
  });

  const { data: perMonth, refetch: refetchMonthlyIncomes } = useQuery({
    queryKey: [`getIncomeByMonth/${selectedMonth}`],
    queryFn: () => getIncomePerMonth(selectedMonth),
    enabled: !allIncomesEnabled && selectedMonth !== "all",
  });
  const incomes = allIncomesEnabled
    ? data?.data?.response
    : perMonth?.data?.response;

  useEffect(() => {
    if (selectedMonth === "all") {
      setAllIncomesEnabled(true);
      refetchAllIncomes();
    } else {
      setAllIncomesEnabled(false);
      refetchMonthlyIncomes();
    }
    //eslint-disable-next-line
  }, [selectedMonth, setAllIncomesEnabled]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const incomeHandler = async () => {
    navigate("/user/wallet/registerIncome");
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value) || "all";
    setSelectedMonth(newMonth);
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
            <th>
              <div>
                Date
                <select
                  className="ms-4"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  <option value="all">All Incomes</option>
                  {renderMonthOptions()}
                </select>
              </div>
            </th>
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
