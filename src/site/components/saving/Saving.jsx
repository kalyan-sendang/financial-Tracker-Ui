import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "reactstrap";
import { getSavings } from "../../../services/savingRoutes";
import SavingsList from "./SavingsList";
import { useNavigate } from "react-router-dom";

function Saving() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["getSaving"],
    queryFn: () => getSavings(),
  });
  const savings = data?.data?.response;

  if (isLoading) {
    return <div>Loading....</div>;
  }

  const handleClick = (id) => {
    navigate(`/user/saving/addamount/${id}`);
  };

  const addFinancialGoal = () => {
    navigate("/user/saving/RegisterSaving");
  };

  return (
    <div className="container">
      <div>
        <h3>
          <b>Financial Goals:</b>
        </h3>
      </div>
      <div className="col d-flex justify-content-end">
        <Button
          className="mt-auto bg-primary"
          style={{ border: "none" }}
          onClick={addFinancialGoal}
        >
          Add Financial Goal
        </Button>
      </div>
      <Table bordered hover className="mt-2">
        <thead>
          <tr>
            <th>Goal_Id</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Goal Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {savings?.map((saving, idx) => (
            // different compo
            <SavingsList key={idx} saving={saving} handleClick={handleClick} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Saving;
