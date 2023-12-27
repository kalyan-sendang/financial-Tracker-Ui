import { useNavigate } from "react-router-dom";
import RegisterIncomeCategory from "../../wallet/RegisterIncomeCategory";

function AddIncomeCategory() {
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

        <RegisterIncomeCategory clickHandler={clickHandler} />
      </div>
    </div>
  );
}

export default AddIncomeCategory;
