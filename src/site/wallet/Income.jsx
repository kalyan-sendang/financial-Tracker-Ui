import { useQuery } from "@tanstack/react-query";
import { getIncomePerMonth, getIncomes } from "../../services/IncomeRoutes";
import { Button, Table } from "reactstrap";
import IncomeList from "./IncomeList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { renderMonthOptions } from "./RenderMonthOptions";
import { excelGenerator } from "../../services/exportHelper";

function Income() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [allIncomesEnabled, setAllIncomesEnabled] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const {
    data,
    isLoading,
    refetch: refetchAllIncomes,
  } = useQuery({
    queryKey: ["getIncomes"],
    queryFn: () => getIncomes(search),
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

  useEffect(() => {
    const query = queryParams.get("query") ?? "";
    setSearchQuery(query);
    //eslint-disable-next-line
  }, [queryParams]);

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

  const handleSearch = () => {
    setQueryParams(search);
    if (selectedMonth === "all") {
      setAllIncomesEnabled(true);
      refetchAllIncomes();
    } else {
      setAllIncomesEnabled(false);
      refetchMonthlyIncomes();
    }
    if (search?.length > 0) {
      setSearch("");
      navigate(`?query=${search}`);
    }
  };

  const handleExport = async () => {
    const response = await getIncomes("");
    const data = response?.data?.response;
    if (response?.data?.success) {
      const columns = [
        "incomeId",
        "categoryId",
        "categoryName",
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
            Incomes
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
              className="mt-auto bg-success "
              style={{ border: "none" }}
              onClick={incomeHandler}
            >
              Add income
            </Button>
          </div>
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
