import { useCallback, useRef, useState } from "react";

import clsx from "clsx";

import { getReactionsById, postReactionById } from "../../apis/reaction";
import useFetchData from "../../hooks/useFetchData";
import Spinner from "../Spinner/Spinner";

import styles from "./EmojiBox.module.css";
import EmojiListButton from "./EmojiListButton/EmojiListButton";
import EmojiPickerButton from "./EmojiPickerButton/EmojiPickerButton";

const VISIBLE_EMOJI_COUNT = 3;
const EMOJI_PAGE_UNIT = 20;

const EmojiBox = ({ recipientId }) => {
  const fetchReactions = useCallback(
    (params) =>
      getReactionsById({
        recipientId,
        offset: params?.offset,
        limit: EMOJI_PAGE_UNIT,
      }),
    [recipientId],
  );
  const { isLoading, isError, data, refetch, updateState } =
    useFetchData(fetchReactions);
  const [reactionError, setReactionError] = useState({
    isError: false,
    error: null,
  });
  const pageRef = useRef(1);

  const reactionData = data?.results || [];
  const visibleReactionList = reactionData.slice(0, VISIBLE_EMOJI_COUNT);
  const invisibleReactionList = reactionData.slice(VISIBLE_EMOJI_COUNT);

  const catchError = (fetchFn) => {
    setReactionError({
      error: null,
      isError: false,
    });

    return fetchFn().catch((error) => {
      setReactionError({
        error: error,
        isError: true,
      });
      return null;
    });
  };

  const handleUpdate = useCallback(async () => {
    if (!data?.next) return;

    const nextPageData = await catchError(() =>
      fetchReactions({
        recipientId,
        offset: pageRef.current++ * EMOJI_PAGE_UNIT,
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
          {!reactionError.isError &&
            visibleReactionList.length > 0 &&
            visibleReactionList.map(({ id, emoji, count }) => (
              <li key={id} className={styles.badge}>
                <span>{emoji}</span>
                <span>{count}</span>
              </li>
            ))}
        </ul>
        <EmojiListButton
          isLoading={isLoading}
          isError={isError || reactionError.isError}
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
