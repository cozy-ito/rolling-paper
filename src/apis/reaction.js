import { makeQueryString, removeBaseUrl } from "../utils/formatter";

import { fetcher } from "./instance";

/**
 * 특정 대상에게 단 리액션들을 조회합니다.
 * @param {{ recipientId: number, next: string | null, offset: number | null, limit: number}}
 */
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

/**
 * 특정 대상에게 리액션을 답니다.
 * @param {{ recipientId: number, type: "increase" | "decrease", emoji: string }}
 */
export const postReactionById = async ({
  recipientId,
  type = "increase",
  emoji,
}) => {
  const result = await fetcher.post(`/recipients/${recipientId}/reactions/`, {
    type,
    emoji,
  });

  return result;
};
