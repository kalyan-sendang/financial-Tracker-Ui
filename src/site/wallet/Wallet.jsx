import { useQuery } from "@tanstack/react-query";
import { getWallet } from "../../services/Routes";
import { Card, Col, Row } from "react-bootstrap";
import Expense from "./Expense";
import Income from "./Income";

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
            <b>My Wallet</b>
          </h2>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{wallet?.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Rs.{wallet?.amount}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </div>
      </Row>

      <div style={{ marginTop: "2rem" }}>
        <h3>
          <b>Transactions</b>
        </h3>
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
