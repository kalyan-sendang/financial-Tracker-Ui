import axiosInstance from "../../axiosInstance";

export const getExpenses = async () => {
  return await axiosInstance.get("/expense");
};

export const addExpense = async () => {
  return await axiosInstance.post("/expense");
};

export const getTotalExpense = async () => {
  return await axiosInstance.get("/totalExpense");
};

export const getTotalExpensePerCategory = async (id) => {
  return await axiosInstance.get(`/totalExpense/${id}`);
};

export const getExpenseCategory = async () => {
  return await axiosInstance.get("/expenseCategory");
};
