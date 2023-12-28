import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

function HomePage({ user }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div>
        <h2 className="text-primary">
          <b>Financial Tracker</b>
        </h2>
      </div>
      <div>We will teach you how to save money.</div>

      <div className=" row d-flex justify-content-center mt-5">
        <div className="col-4">
          <h3>
            <b>BEST FINANCIAL SOLUTIONS</b>
          </h3>
        </div>
        <div>
          <p>
            Embark on a journey towards financial wellness with Financial
            Tracker. We provide the tools you need to understand your finances,
            stay on budget, and make your money work for you.
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-center ">
        {user ? (
          <Link to="/user">DashBoard</Link>
        ) : (
          <Button className="bg-primary" type="button" onClick={handleClick}>
            Sign Up
          </Button>
        )}
      </div>
    </div>
  );
}

export default HomePage;
