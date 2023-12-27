import { Button } from "react-bootstrap";

function ExpenseCategoryList({
  expenseCategory,
  onUpdate,
  onDelete,
  amountSpent,
}) {
  const maxLimit = expenseCategory?.maxLimit || 0;

  return (
    <tr>
      <th>{expenseCategory?.expenseCategoryId}</th>
      <th>{expenseCategory?.name}</th>
      <th>Rs.{expenseCategory?.maxLimit}</th>
      <th>
        Rs.{maxLimit - (amountSpent[expenseCategory?.expenseCategoryId] || 0)}
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
