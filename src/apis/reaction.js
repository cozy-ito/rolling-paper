import { fetcher } from "../apis/instance";

/**
 * @param {{ recipientId: number, type: "increase" | "decrease", emoji: string }} 파라미터
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
