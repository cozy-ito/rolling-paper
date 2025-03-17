import { fetcher } from "../apis/instance";
import { makeQueryString, removeBaseUrl } from "../utils/formatter";

export const getMessagesById = async ({
  recipientId,
  next = null,
  limit = 20,
  offset,
}) => {
  const query = makeQueryString({ limit, offset });
  const requestUrl = removeBaseUrl(next);
  const url = requestUrl || `/recipients/${recipientId}/messages/?${query}`;

  return await fetcher.get(url);
};
