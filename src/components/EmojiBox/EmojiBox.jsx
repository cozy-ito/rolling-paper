import { useCallback, useMemo, useState } from "react";

import clsx from "clsx";

import { getReactionsById, postReactionById } from "../../apis/reaction";
import useFetchData from "../../hooks/useFetchData";
import Spinner from "../Spinner/Spinner";

import styles from "./EmojiBox.module.css";
import EmojiListButton from "./EmojiListButton/EmojiListButton";
import EmojiPickerButton from "./EmojiPickerButton/EmojiPickerButton";

const VISIBLE_EMOJI_COUNT = 3;

const EmojiBox = ({ recipientId }) => {
  const fetchReactions = useCallback(
    (params) => getReactionsById({ recipientId, next: params?.next }),
    [recipientId],
  );

  const { isLoading, isError, data, refetch, updateState } =
    useFetchData(fetchReactions);

  const { visibleReactionList, invisibleReactionList } = useMemo(() => {
    const reactionData = data?.results || [];
    return {
      visibleReactionList: reactionData.slice(0, VISIBLE_EMOJI_COUNT),
      invisibleReactionList: reactionData.slice(VISIBLE_EMOJI_COUNT),
    };
  }, [data?.results]);

  const [isFetchReactionsError, setIsfetchReactionsError] = useState(false);
  const [fetchReactionsError, setFetchReactionsError] = useState(null);

  const catchError = (fetchFn) => {
    setIsfetchReactionsError(false);
    setFetchReactionsError(null);

    return fetchFn().catch((error) => {
      console.log(error.message);
      setIsfetchReactionsError(true);
      setFetchReactionsError(error);
      return null;
    });
  };

  const handleUpdate = useCallback(async () => {
    if (!data?.next) return;

    const nextPageData = await catchError(() =>
      fetchReactions({
        recipientId,
        next: data?.next,
      }),
    );

    if (nextPageData !== null) {
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
    }
  }, [fetchReactions, recipientId, updateState, data?.next]);

  const handleRetryRequest = useCallback(() => {
    refetch({ recipientId, next: data?.next });
  }, [refetch, recipientId, data?.next]);

  const handleClickPickEmoji = useCallback(
    async (emoji) => {
      const result = await catchError(() =>
        postReactionById({
          recipientId,
          emoji,
          type: "increase",
        }),
      );

      if (result !== null) {
        refetch({ recipientId });
      }
    },
    [recipientId, refetch],
  );

  return (
    <>
      <div
        className={clsx(styles.emojiBox, {
          [styles.emojiBoxLoading]: isLoading,
        })}
      >
        <ul className={styles.emojiList}>
          {!isFetchReactionsError &&
            visibleReactionList.length > 0 &&
            visibleReactionList.map(({ id, emoji, count }) => (
              <li key={id} className={styles.badge}>
                <span>{emoji}</span>
                <span>{count}</span>
              </li>
            ))}
        </ul>
        {isFetchReactionsError && fetchReactionsError?.message}
        <EmojiListButton
          isLoading={isLoading}
          isError={isError || isFetchReactionsError}
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
