import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

function Navbar() {
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem("userprofile"));
  // const [notificationEnabled, setNotificationEnabled] = useState(false);
  const logoutHandler = () => {
    localStorage.removeItem("userprofile");
    localStorage.removeItem("wallet");
    Cookies.remove("auth");
    navigate("/");
  };

  // const handleClick = () => {
  //   setNotificationEnabled(true);
  // };
  return (
    <div>
      {/* {notificationEnabled && <Notification />} */}
      <nav className="navbar navbar-expand">
        <div
          className="navbar-collapse d-flex justify-content-end "
          id="navbarSupportedContent"
        >
          <div className="d-flex ">
            <ul className="navbar-nav mr-auto d-flex align-items-center ">
              <li className="nav-item active" style={{ paddingRight: "1rem" }}>
                <Button
                  className="bg-white text-primary border-0 "
                  type="button"
                  // onClick={handleClick}
                >
                  <i className="fa-solid fa-bell fa-lg "></i>
                </Button>
              </li>
            </ul>
            <ul className="navbar-nav mr-auto">
              {userProfile ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-user"></i>
                    {userProfile.userName}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link to="/user/profile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" onClick={logoutHandler}>
                        logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item active">
                  <a className="nav-link" href="login">
                    <i className="fa-solid fa-user"></i>
                    SignIn<span className="sr-only"></span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
