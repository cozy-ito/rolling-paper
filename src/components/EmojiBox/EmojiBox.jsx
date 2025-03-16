import { useCallback, useMemo } from "react";

import { getReactionsById, postReactionById } from "../../apis/reaction";
import useFetchData from "../../hooks/useFetchData";

import styles from "./EmojiBox.module.css";
import EmojiListButton from "./EmojiListButton/EmojiListButton";
import EmojiPickerButton from "./EmojiPickerButton/EmojiPickerButton";

const VISIBLE_EMOJI_COUNT = 3;

const EmojiBox = ({ recipientId }) => {
  const fetchReactions = useCallback(
    (params) => getReactionsById({ recipientId, next: params?.next }),
    [recipientId],
  );

  const { isLoading, isError, data, requestData, updateState } =
    useFetchData(fetchReactions);

  const { visibleReactionList, invisibleReactionList } = useMemo(() => {
    const reactionData = data?.results || [];
    return {
      visibleReactionList: reactionData.slice(0, VISIBLE_EMOJI_COUNT),
      invisibleReactionList: reactionData.slice(VISIBLE_EMOJI_COUNT),
    };
  }, [data?.results]);

  const handleUpdate = useCallback(async () => {
    if (!data?.next) return;

    const nextPageData = await fetchReactions({
      recipientId,
      next: data?.next,
    });

    updateState((prev) => {
      // 중복 ID 제거를 위해 Set 사용
      const existingIds = new Set(prev.results.map((item) => item.id));
      const uniqueNewResults = nextPageData.results.filter(
        (item) => !existingIds.has(item.id),
      );

      return {
        ...nextPageData,
        results: [...prev.results, ...uniqueNewResults],
      };
    });
  }, [fetchReactions, recipientId, updateState, data?.next]);

  const handleRetryRequest = useCallback(() => {
    requestData({ recipientId, next: data?.next });
  }, [requestData, recipientId, data?.next]);

  const handleClickPickEmoji = useCallback(
    async (emoji) => {
      await postReactionById({
        recipientId,
        emoji,
        type: "increase",
      });

      requestData({ recipientId });
    },
    [recipientId, requestData],
  );

  return (
    <>
      <div className={styles.emojiBox}>
        {visibleReactionList.length !== 0 && (
          <ul className={styles.emojiList}>
            {visibleReactionList.map(({ id, emoji, count }) => (
              <li key={id} className={styles.badge}>
                <span>{emoji}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        )}
        <EmojiListButton
          isLoading={isLoading}
          isError={isError}
          onUpdate={handleUpdate}
          next={data?.next}
          onRetryRequest={handleRetryRequest}
          invisibleReactionList={invisibleReactionList}
        />
      </div>
      <EmojiPickerButton onClick={handleClickPickEmoji} />
    </>
  );
};

export default EmojiBox;
