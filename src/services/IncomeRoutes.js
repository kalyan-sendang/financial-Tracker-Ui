import axiosInstance from "../../axiosInstance";

export const getIncomes = async () => {
    return axiosInstance.get("/income");
  };