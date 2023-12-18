import axiosInstance from "../../axiosInstance";

export const getWallet = async () => {
    return axiosInstance.get("/wallet");
  };
  
