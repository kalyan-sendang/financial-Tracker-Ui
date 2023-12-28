import axiosInstance from "../../axiosInstance";

export const getWallet = async () => {
  return await axiosInstance.get("/wallet");
};

export const getNewNotification = async () => {
  return await axiosInstance.get("/new-notification");
};

export const getNotification = async () => {
  return await axiosInstance.get("/notification");
};
