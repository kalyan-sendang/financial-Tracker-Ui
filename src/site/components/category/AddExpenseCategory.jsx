import { useNavigate } from "react-router-dom";
import RegisterCategory from "./RegisterExpenseCategory";

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
        <RegisterCategory clickHandler={clickHandler} />
      </div>
    </div>
  );
}

export default AddExpenseCategory;
