import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toastify from "./components/toastify/Toastify";
import Sidebar from "./components/Sidebar";

const UserLayout = () => {
  return (
    <>
      <Toastify />
      <div className="container mt-2" style={{ maxWidth: "100%" }}>
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLayout;
