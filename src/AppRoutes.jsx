import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "./site/SiteLayout";
import LoginUser from "./site/login/Login";
import RegisterUser from "./site/register/Register";
import Public from "./site/utils/Public";
import HomePage from "./site/homePage/HomePage";
import UserLayout from "./site/UserLayout";
import Protected from "./site/utils/Protected";
import RegisterWallet from "./site/wallet/RegisterWallet";
import Wallet from "./site/wallet/Wallet";
import RegisterExpense from "./site/wallet/RegisterExpense";
import RegisterIncome from "./site/wallet/RegisterIncome";
import Category from "./site/components/category/Category";
import UpdateExpenseCategory from "./site/components/category/UpdateExpenseCategory";
import AddExpenseCategory from "./site/components/category/AddExpenseCategory";
import AddIncomeCategory from "./site/components/category/AddIncomeCategory";
import UserDashboard from "./site/UserDashboard";
import ProfilePage from "./site/login/ProfilePage";
import { useState } from "react";

const AppRoutes = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userprofile"))
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<HomePage user={user} />} />
          <Route
            path="login"
            element={
              <Public>
                <LoginUser setUser={setUser} />
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
          <Route path="register-wallet" element={<RegisterWallet />} />
          <Route path="profile" element={<ProfilePage />} />
          {/* <Route path="notification" element={<Notification />} /> */}
          <Route path="wallet">
            <Route index element={<Wallet />} />
            <Route path="registerExpense" element={<RegisterExpense />} />
            <Route path="registerIncome" element={<RegisterIncome />} />
          </Route>
          <Route path="category">
            <Route index element={<Category />} />
            <Route
              path="updateExpenseCategory/:id"
              element={<UpdateExpenseCategory />}
            />
            <Route path="expenseCategory" element={<AddExpenseCategory />} />
            <Route path="incomeCategory" element={<AddIncomeCategory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
