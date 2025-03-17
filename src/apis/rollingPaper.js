import { fetcher } from "./instance";

export const getRecipientById = async (recpientId) => {
  try {
    const result = await fetcher.get(`/recipients/${recpientId}/`);
    return result;
  } catch (error) {
    console.error("Fail to fetch RollingPaper", error);
  }
};
