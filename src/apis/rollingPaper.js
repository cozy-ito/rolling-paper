import { fetcher } from "./instance";

export const getRecipientById = async (recpientId) => {
  return await fetcher.get(`/recipients/${recpientId}/`);
};
