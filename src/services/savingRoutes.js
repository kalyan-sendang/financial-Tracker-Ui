import axiosInstance from "../../axiosInstance";

export const getSavings = async () => {
  return await axiosInstance.get(`/saving`);
};

export const addSaving = async () => {
  return await axiosInstance.post(`/saving`);
};
export const getASaving = async (id) => {
  return await axiosInstance.get(`/saving/${id}`);
};

export const addAmount = async (id) => {
  return await axiosInstance.put(`/saving/${id}`);
};
