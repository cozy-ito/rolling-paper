import { makeQueryString, removeBaseUrl } from "../utils/formatter";

import { fetcher } from "./instance";

export const getReactionsById = async ({
  recipientId,
  next = null,
  offset = null,
  limit = 20,
}) => {
  const query = makeQueryString({ next, limit, offset });
  const requestUrl = removeBaseUrl(next);
  const url = requestUrl ?? `/recipients/${recipientId}/reactions/?${query}`;
  const result = await fetcher.get(url);

  return result;
};
