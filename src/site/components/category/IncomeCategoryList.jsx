import { Button } from "react-bootstrap";

function IncomeCategoryList({ incomeCategory, onDelete }) {
  return (
    <tr>
      <th>{incomeCategory?.incomeCategoryId}</th>
      <th>{incomeCategory?.name}</th>
      <th className="d-flex justify-content-center ">
        <Button
          type="button"
          variant="danger"
          onClick={() => onDelete(incomeCategory.incomeCategoryId)}
        >
          <i className="fa-solid fa-trash-can fa-beat-fade"></i>
        </Button>
      </th>
    </tr>
  );
}

export default IncomeCategoryList;
