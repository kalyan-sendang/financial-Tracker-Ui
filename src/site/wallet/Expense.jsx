import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "reactstrap";
import { getExpensePerMonth, getExpenses } from "../../services/ExpenseRoutes";
import ExpenseList from "./ExpenseList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { renderMonthOptions } from "./RenderMonthOptions";
import axios from "axios";
import axiosInstance from "../../../axiosInstance";
import { excelGenerator } from "../../services/exportHelper";

function Expense() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [queryParams, setQueryParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [allExpensesEnabled, setAllExpensesEnabled] = useState(false);
  const [search, setSearch] = useState("");
  const {
    data,
    isLoading,
    refetch: refetchAllExpenses,
  } = useQuery({
    queryKey: ["getExpenses"],
    queryFn: () => getExpenses(search),
    enabled: allExpensesEnabled,
  });

  const { data: perMonth, refetch: refetchMonthlyExpenses } = useQuery({
    queryKey: [`getExpenseByMonth/${selectedMonth}`],
    queryFn: () => getExpensePerMonth(selectedMonth),
    enabled: !allExpensesEnabled && selectedMonth !== "all",
  });

  const expenses = allExpensesEnabled
    ? data?.data?.response
    : perMonth?.data?.response;

  useEffect(() => {
    if (selectedMonth === "all") {
      setAllExpensesEnabled(true);
      refetchAllExpenses();
      navigate("/user/wallet");
    } else {
      setAllExpensesEnabled(false);
      refetchMonthlyExpenses();
      navigate("/user/wallet");
    }
    //eslint-disable-next-line
  }, [selectedMonth, setAllExpensesEnabled]);

  useEffect(() => {
    const query = queryParams.get("query") ?? "";
    setSearchQuery(query);
    //eslint-disable-next-line
  }, [queryParams]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const expenseHandler = async () => {
    navigate("/user/wallet/registerExpense");
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value) || "all";
    setSelectedMonth(newMonth);
  };

  const handleSearch = () => {
    setQueryParams(search);
    if (selectedMonth === "all") {
      setAllExpensesEnabled(true);
      refetchAllExpenses();
    } else {
      setAllExpensesEnabled(false);
      refetchMonthlyExpenses();
    }
    if (search?.length > 0) {
      setSearch("");
      navigate(`?query=${search}`);
    }
  };

  const handleExport = async () => {
    const response = await getExpenses("");
    const data = response?.data?.response;
    if (response?.data?.success) {
      const columns = [
        "expenseId",
        "expenseCategoryId",
        "expenseCategoryName",
        "amount",
        "date",
        "note",
      ];
      excelGenerator("Transactions", "transactions", columns, data);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <h3>
            Expenses
            <Button
              className="bg-muted ms-5"
              type="button"
              onClick={handleExport}
            >
              Export
              <i className="fa-solid fa-download"></i>
            </Button>
          </h3>
          <hr></hr>
        </div>
        <div>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "150px",
                  height: "35px",
                }}
              />
              <Button
                style={{
                  marginLeft: "8px",
                  borderRadius: "0.375rem",
                  height: "35px",
                  textAlign: "center",
                }}
                className=" mt-auto bg-primary"
                type="button"
                onClick={handleSearch}
              >
                <span className="">Search</span>
              </Button>
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
        </div>
      </div>

      <Table bordered hover className="mt-2">
        <thead>
          <tr>
            <th>ExpenseId</th>
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
                  <option value="all">All Expenses</option>
                  {renderMonthOptions()}
                </select>
              </div>
            </th>
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
