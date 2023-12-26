import { useEffect, useState } from "react";
import ExpenseHistogram from "../components/ExpenseHistogram";
import IncomeHistogram from "../components/IncomeHistogram";
import { Card, Col, Container, Row } from "reactstrap";
import ExpensePieChart from "../components/ExpensePieChart";
import IncomePieChart from "../components/IncomePieChart";
import LineChart from "../components/LineChart";
import axiosInstance from "../../../axiosInstance";

function UserDashboard() {
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("userprofile"));

  const [incomeData, setIncomeData] = useState("");
  const [expenseData, setExpenseData] = useState("");

  const getData = async () => {
    const expenseRes = await axiosInstance.get("/expenseData");
    setExpenseData(expenseRes?.data?.response);
    const incomeRes = await axiosInstance.get("/incomeData");
    setIncomeData(incomeRes?.data?.response);
  };
  useEffect(() => {
    if (!window.google.visualization) {
      window.google.charts.load("current", { packages: ["corechart"] });
    }
    window.google.charts.setOnLoadCallback(() => {
      setChartsLoaded(true);
    });

    getData();
  }, []);

  return (
    <div>
      <Card style={{ width: "20%", alignItems: "center", border: "none" }}>
        <h2>
          <b>Hello {user?.userName} !!!</b>
        </h2>
        <p>Lets manage your wallet finanace.</p>
      </Card>
      <hr className="bg-info border-3 border-top border-white" />
      {chartsLoaded && (
        <>
          <Container>
            <Row>
              <Col>
                <Card>
                  <ExpensePieChart expenseData={expenseData} />
                </Card>
              </Col>
              <Col>
                <Card>
                  <IncomePieChart incomeData={incomeData} />
                </Card>
              </Col>
            </Row>
          </Container>

          <hr className="bg-info border-3 border-top border-secondary" />
          <LineChart incomeData={incomeData} expenseData={expenseData} />
          <hr className="bg-info border-3 border-top border-secondary" />
          <ExpenseHistogram expenseData={expenseData} />
          <hr className="bg-info border-3 border-top border-secondary" />
          <IncomeHistogram incomeData={incomeData} />
        </>
      )}
    </div>
  );
}

export default UserDashboard;
