import { useQueries, useQuery } from "@tanstack/react-query";
import { Button } from "react-bootstrap";
import { getTotalExpensePerCategory } from "../../../services/ExpenseRoutes";

function ExpenseCategoryList({ expenseCategory, onUpdate, onDelete }) {
  //Define an array of queries for each category
  const queries = expenseCategory.map((category) => ({
    queryKey: ["getExpenseByCategory", category.expenseCategoryId],
    queryFn: () => getTotalExpensePerCategory(category.expenseCategoryId),
  }));

  // Use useQueries to execute multiple queries
  const results = useQueries(queries);

  return (
    <tr>
      <th>{expenseCategory?.expenseCategoryId}</th>
      <th>{expenseCategory?.name}</th>
      <th>
        {expenseCategory?.maxLimit}
        {"   "}Amount Left:{" "}
        {results.map((result) => result.data?.response || 0)}
      </th>
      <th className="d-flex justify-content-center ">
        <Button
          type=" button "
          variant="warning"
          onClick={() => onUpdate(expenseCategory?.expenseCategoryId)}
        >
          <i
            className="fa-solid fa-pen fa-beat-fade"
            style={{ color: "#030c1c" }}
          ></i>
        </Button>
        <Button
          className="ms-4"
          type=" button "
          variant="danger"
          onClick={() => onDelete(expenseCategory.expenseCategoryId)}
        >
          <i className="fa-solid fa-trash-can fa-beat-fade"></i>
        </Button>
      </th>
    </tr>
  );
}

export default ExpenseCategoryList;
