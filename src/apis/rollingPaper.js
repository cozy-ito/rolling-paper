import { fetcher } from "./instance";

export const getRecipientById = async (recpientId) => {
  return await fetcher.get(`/recipients/${recpientId}/`);
};

export const deleteRecipientById = async (recpientId) => {
  return await fetcher.delete(`/recipients/${recpientId}/`);
};
