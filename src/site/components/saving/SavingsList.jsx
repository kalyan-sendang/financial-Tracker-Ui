import { Button } from "reactstrap";

function SavingsList({ saving, handleClick }) {
  return (
    <tr>
      <th>{saving?.savingId}</th>
      <th>{saving?.goal}</th>
      <th>Rs. {saving?.amount}</th>
      <th>Rs. {saving?.goalAmount}</th>
      <th>
        <Button
          type=" button "
          className="bg-success"
          onClick={() => handleClick(saving?.savingId)}
        >
          Add Amount
        </Button>
      </th>
    </tr>
  );
}

export default SavingsList;
