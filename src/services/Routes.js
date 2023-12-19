import axiosInstance from "../../axiosInstance";

export const getWallet = async () => {
    return await axiosInstance.get("/wallet");
  };
  
