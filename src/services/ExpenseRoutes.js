import axiosInstance from "../../axiosInstance";

export const getExpenses = async (query) => {
  return await axiosInstance.get(`/expense?query=${query}`);
};

export const getExpensePerMonth = async (id) => {
  return await axiosInstance.get(`/expense/expense-per-month/${id}`);
};

export const addExpense = async () => {
  return await axiosInstance.post("/expense");
};

export const getTotalExpense = async () => {
  return await axiosInstance.get("/expense/total-expense");
};

export const expensePerCategory = async () => {
  return await axiosInstance.get("/expense/expense-per-cat");
};

export const getExpenseCategory = async () => {
  return await axiosInstance.get("/expense-category");
};
