import { useState } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ link, title, active, setActive }) => {
  return (
    <>
      <li className={`nav-item`} onClick={() => setActive(link)}>
        <Link
          to={link}
          className={`nav-link link-dark ${active === link && "active"}`}
        >
          {title}
        </Link>
      </li>
    </>
  );
};

const Sidebar = () => {
  const wallet = JSON.parse(localStorage.getItem("wallet"));
  const [active, setActive] = useState(window.location.pathname);
  return (
    <div
      className="flex-shrink-0 p-3 text-dark  bg-light"
      style={{ height: "100vh" }}
    >
      <div className="text-center pb-3">
        <Link
          to="/user"
          className="pb-3 mb-3 link-dark text-decoration-none border-bottom"
        >
          <span className="fs-5 fw-bold">Financial Tracker</span>
        </Link>
      </div>
      {wallet ? (
        <div className="pt-3">
          <ul className="nav nav-pills flex-column mb-auto">
            <NavLink
              link="/user"
              title="Dashboard"
              active={active}
              setActive={setActive}
            />
            <NavLink
              link="/user/wallet"
              title="My Wallet"
              active={active}
              setActive={setActive}
            />
          </ul>
        </div>
      ) : (
        <div className="pt-3">
          <ul className="nav nav-pills flex-column mb-auto">
            <NavLink
              link="/user"
              title="Dashboard"
              active={active}
              setActive={setActive}
            />
            <NavLink
              link="/user/registerwallet"
              title="Register Wallet"
              active={active}
              setActive={setActive}
            />
            <NavLink
              link="/user/wallet"
              title="My Wallet"
              active={active}
              setActive={setActive}
            />
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
