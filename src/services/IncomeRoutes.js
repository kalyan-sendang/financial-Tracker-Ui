import axiosInstance from "../../axiosInstance";

export const getIncomes = async (query) => {
  return axiosInstance.get(`/income?query=${query}`);
};
export const getIncomePerMonth = async (id) => {
  return await axiosInstance.get(`/income/income-per-month/${id}`);
};

export const addIncome = async () => {
  return axiosInstance.post("/income");
};

export const getTotalIncome = async () => {
  return axiosInstance.get("/income/total-income");
};

export const getIncomeCategory = async () => {
  return axiosInstance.get("/income-category");
};
