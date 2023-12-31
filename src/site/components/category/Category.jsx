import { Col, Row } from "reactstrap";
import IncomeCategory from "./IncomeCategory";
import ExpenseCategory from "./ExpenseCategory";

function Category() {
  return (
    <div>
      <div className="d-flex justify-content-center ">
        <h2>
          <b>Category</b>
        </h2>
      </div>
      <div className="mt-4">
        <Row>
          <Col>
            <ExpenseCategory />
          </Col>
          <Col>
            <IncomeCategory />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Category;
