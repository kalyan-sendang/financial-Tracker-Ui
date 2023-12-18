import axiosInstance from "../../axiosInstance";

export const getExpenses = async () => {
    return axiosInstance.get("/expense");
  };
  