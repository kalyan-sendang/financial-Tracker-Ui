import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./site/SiteLayout";
import LoginUser from "./site/login/Login";
import RegisterUser from "./site/register/Register";
import Public from "./site/utils/Public";
import HomePage from "./site/homePage/HomePage";
import UserLayout from "./site/UserLayout";
import UserDashboard from "./site/wallet/userDashboard";
import Protected from "./site/utils/Protected";
import RegisterWallet from "./site/wallet/RegisterWallet";
import Wallet from "./site/wallet/Wallet";
import RegisterExpense from "./site/wallet/RegisterExpense";
import RegisterIncome from "./site/wallet/RegisterIncome";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="login"
            element={
              <Public>
                <LoginUser />
              </Public>
            }
          />
          <Route
            path="register"
            element={
              <Public>
                <RegisterUser />
              </Public>
            }
          />
        </Route>
        <Route
          path="/user"
          element={
            <Protected>
              <UserLayout />
            </Protected>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="registerwallet" element={<RegisterWallet />} />
          <Route path="wallet">
            <Route index element={<Wallet />} />
            <Route path="registerExpense" element={<RegisterExpense />} />
            <Route path="registerIncome" element={<RegisterIncome />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
