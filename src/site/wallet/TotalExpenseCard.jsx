import React from "react";
import { getTotalExpense } from "../../services/ExpenseRoutes";
import { useQuery } from "@tanstack/react-query";
import { Card } from "react-bootstrap";

function TotalExpenseCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["getTotalExpense"],
    queryFn: () => getTotalExpense(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Card style={{ width: "60%", backgroundColor: "#faaaa7", border: "none" }}>
      <Card.Body>
        <Card.Title>Total Expenses</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Rs.{data?.data?.response}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
export default TotalExpenseCard;
