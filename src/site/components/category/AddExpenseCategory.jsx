import RegisterCategory from "../../wallet/RegisterCategory";
import { useNavigate } from "react-router-dom";

function AddExpenseCategory() {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/user/category");
  };
  return (
    <div className="name">
      <div>
        <button
          className="bg-danger rounded pt-1 pb-1 "
          style={{ height: "35px", float: "right" }}
          onClick={() => {
            clickHandler();
          }}
          type="button"
        >
          <i className="fa-solid fa-xmark fa-fade fa-lg"></i>
        </button>
        <RegisterCategory />
      </div>
    </div>
  );
}

export default AddExpenseCategory;
