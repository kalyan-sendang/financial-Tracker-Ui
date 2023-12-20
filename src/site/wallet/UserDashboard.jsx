import { useEffect, useState } from "react";
import ExpenseHistogram from "../components/ExpenseHistogram";
import IncomeHistogram from "../components/IncomeHistogram";
import { Col, Container, Row } from "reactstrap";
import ExpensePieChart from "../components/ExpensePieChart";
import IncomePieChart from "../components/IncomePieChart";

function UserDashboard() {
  const [chartsLoaded, setChartsLoaded] = useState(false);
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
      <Container>
        <Row>
          <Col>
            <ExpensePieChart chartsLoaded={chartsLoaded} />
          </Col>
          <Col>
            <IncomePieChart chartsLoaded={chartsLoaded} />
          </Col>
        </Row>
      </Container>

      <ExpenseHistogram chartsLoaded={chartsLoaded} />
      <IncomeHistogram chartsLoaded={chartsLoaded} />
    </div>
  );
}

export default UserDashboard;
