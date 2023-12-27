import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem("userprofile"));
  const logoutHandler = () => {
    localStorage.removeItem("userprofile");
    Cookies.remove("auth");
    navigate("/");
  };

  //   const handleSearch = () => {
  //     if (search?.length > 0) {
  //       setSearch("");
  //       navigate(`?query=${search}&page=1`);
  //     }
  //   };
  return (
    <div>
      <nav className="navbar navbar-expand">
        {/* <Link to="/wallet" className="navbar-brand">
          <h2>
            <b>Financial Tracker</b>
          </h2>
        </Link> */}
        <div className="navbar-collapse" id="navbarSupportedContent">
          <div
            className="container justify-content-end"
            style={{ display: "flex" }}
          >
            <ul className="navbar-nav mr-auto">
              <li
                className="nav-item active pt-2 "
                style={{ paddingRight: "1rem" }}
              >
                <Link>
                  <i className="fa-solid fa-bell fa-lg"></i>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item active">
                <a className="nav-link" href="register">
              
                  SignUp<span className="sr-only"></span>
                </a>
              </li> */}
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
                      <Link to="/profile" className="dropdown-item">
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
