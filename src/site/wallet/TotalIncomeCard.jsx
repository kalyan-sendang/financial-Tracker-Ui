import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "react-bootstrap";
import { getTotalIncome } from "../../services/IncomeRoutes";

function TotalIncomeCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["getTotalIncome"],
    queryFn: () => getTotalIncome(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data?.data.response);
  return (
    <div>
      <Card
        style={{ width: "18rem", backgroundColor: "#caebd0", border: "none" }}
      >
        <Card.Body>
          <Card.Title>Total Incomes</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Rs.{data?.data?.response}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
}
export default TotalIncomeCard;
