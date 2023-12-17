import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userprofile"));
  const location = useLocation();

  if (!userData) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default Protected;
