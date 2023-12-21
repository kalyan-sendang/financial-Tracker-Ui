import { useEffect, useState } from "react";
import ExpenseHistogram from "../components/ExpenseHistogram";
import IncomeHistogram from "../components/IncomeHistogram";
import { Card, Col, Container, Row } from "reactstrap";
import ExpensePieChart from "../components/ExpensePieChart";
import IncomePieChart from "../components/IncomePieChart";
import LineChart from "../components/LineChart";

function UserDashboard() {
  const [chartsLoaded, setChartsLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("userprofile"));
  console.log(user);
  useEffect(() => {
    if (!window.google.visualization) {
      window.google.charts.load("current", { packages: ["corechart"] });
    }
    window.google.charts.setOnLoadCallback(() => {
      setChartsLoaded(true);
    });
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
                  <ExpensePieChart />
                </Card>
              </Col>
              <Col>
                <Card>
                  <IncomePieChart />
                </Card>
              </Col>
            </Row>
          </Container>

          <hr className="bg-info border-3 border-top border-secondary" />
          <LineChart />
          <hr className="bg-info border-3 border-top border-secondary" />
          <ExpenseHistogram />
          <hr className="bg-info border-3 border-top border-secondary" />
          <IncomeHistogram />
        </>
      )}
    </div>
  );
}

export default UserDashboard;
