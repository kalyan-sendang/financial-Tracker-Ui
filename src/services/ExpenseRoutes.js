import axiosInstance from "../../axiosInstance";

export const getExpenses = async () => {
    return axiosInstance.get("/expense");
  };
  
  export const addExpense = async () => {
    return axiosInstance.post("/expense");
  }