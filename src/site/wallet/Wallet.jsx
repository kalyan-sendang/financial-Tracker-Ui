import { useQuery } from "@tanstack/react-query";
import { getWallet } from "../../services/Routes";
import { Card, Col, Row } from "react-bootstrap";
import Expense from "./Expense";
import Income from "./Income";
import TotalExpenseCard from "./TotalExpenseCard";
import TotalIncomeCard from "./TotalIncomeCard";

function Wallet() {
  const { data, isLoading } = useQuery({
    queryKey: ["getWallets"],
    queryFn: () => getWallet(),
  });
  const wallet = data?.data?.response;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <Row>
        <div className="col-3">
          <h2>
            <b>{wallet?.name}</b>
          </h2>

          <Card
            style={{
              width: "18rem",
              backgroundColor: "#b8e1f2",
              border: "none",
            }}
          >
            <Card.Body>
              <Card.Title>Total Balance</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Rs.{wallet?.amount}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </div>
        <div className="col-3" style={{ paddingTop: "45px" }}>
          <TotalExpenseCard />
        </div>
        <div className="col-3" style={{ paddingTop: "45px" }}>
          <TotalIncomeCard />
        </div>
      </Row>

      <div style={{ marginTop: "2rem" }}>
        <div className="d-flex justify-content-center">
          <h3>
            <b>Transactions</b>
            <hr></hr>
          </h3>
        </div>

        <Row>
          <Col>
            <Expense />
          </Col>
          <Col>
            <Income />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Wallet;
