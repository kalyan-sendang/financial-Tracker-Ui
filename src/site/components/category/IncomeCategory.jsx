import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getIncomeCategory } from "../../../services/IncomeRoutes";
import IncomeCategoryList from "./IncomeCategoryList";
import axiosInstance from "../../../../axiosInstance";

function IncomeCategory() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getIncomeCategory"],
    queryFn: () => getIncomeCategory(),
  });

  const incomeCategories = data?.data?.response;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // const incomeHandler = async () => {
  //   navigate("/user/wallet/registerIncome");
  // };

  const onDelete = async (id) => {
    const response = await axiosInstance.put(`/incomeCategory/${id}`);
    refetch();
  };

  const incomeHandler = async () => {
    navigate("/user/category/incomeCategory");
  };
  return (
    <div>
      <div className="row">
        <div className="col">
          <h3>Income Category</h3>
        </div>
        <div className="col d-flex justify-content-end">
          <Button
            className="mt-auto bg-primary"
            style={{ border: "none" }}
            onClick={incomeHandler}
          >
            Add Income Category
          </Button>
        </div>
      </div>
      <Table bordered hover className="mt-2">
        <thead>
          <tr>
            <th>IncomeCategoryId</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {incomeCategories?.map((incomeCategory, idx) => (
            // different compo
            <IncomeCategoryList
              key={idx}
              incomeCategory={incomeCategory}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default IncomeCategory;
