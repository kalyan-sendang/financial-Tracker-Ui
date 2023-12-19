import axiosInstance from "../../axiosInstance";

export const getIncomes = async () => {
    return axiosInstance.get("/income");
  };

export const addIncome = async () => {
  return axiosInstance.post("/income");
}