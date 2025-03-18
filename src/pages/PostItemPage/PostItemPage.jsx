import { useCallback, useRef, useState } from "react";

import clsx from "clsx";
import { useLocation, useParams } from "react-router-dom";

import { getMessagesById } from "../../apis/message";
import EmptyPaperplane from "../../assets/imgs/paperplane_empty.webp";
import ErrorPaperplane from "../../assets/imgs/paperplane_error.webp";
import AsyncStateRenderer from "../../components/AsyncStateRenderer/AsyncStateRenderer";
import Button from "../../components/Button/Button";
import RollingPaperCard from "../../components/RollingPaperCard/RollingPaperCard";
import RollingPaperCardList from "../../components/RollingPaperCardList/RollingPaperCardList";
import Spinner from "../../components/Spinner/Spinner";
import useFetchData from "../../hooks/useFetchData";

import styles from "./PostItemPage.module.css";
import PostItemPageModeButtons from "./PostItemPageModeButtons/PostItemPageModeButtons";

const CONSTANTS = {
  VISIBLE_SKELETON_CARDS: 6,
  MESSAGE_PAGE_UNIT: 20,
  INITIAL_MESSAGE_PAGE_NUMBER: 1,
  EDIT_PAGE_LAST_URL: "edit",
};

const PostItemPage = () => {
  const location = useLocation();
  const { id: recipientId } = useParams();
  const pageRef = useRef(CONSTANTS.INITIAL_MESSAGE_PAGE_NUMBER);

  const [messageError, setMessageError] = useState({
    isError: false,
    error: null,
  });

  const fetchMessages = useCallback(
    (params) =>
      getMessagesById({
        recipientId,
        offset: params?.offset,
        limit: CONSTANTS.MESSAGE_PAGE_UNIT,
      }),
    [recipientId],
  );

  const {
    isLoading,
    isError,
    data: fetchedMessageData,
    refetch,
    updateState,
  } = useFetchData(fetchMessages);

  const messages = fetchedMessageData?.results ?? [];
  const isEditPage = location.pathname.endsWith(CONSTANTS.EDIT_PAGE_LAST_URL);
  const isEmptyMessage = fetchedMessageData?.results?.length === 0;

  const loadMoreMessages = useCallback(async () => {
    if (messageError.isError || isLoading) {
      return;
    }
    const offset = pageRef.current * CONSTANTS.MESSAGE_PAGE_UNIT;

    try {
      const nextMessageData = await fetchMessages({ offset });

      updateState((prev) => ({
        ...nextMessageData,
        results: [...(prev?.results || []), ...nextMessageData.results],
      }));

      pageRef.current += 1;
    } catch (error) {
      setMessageError({
        isError: true,
        error,
      });
    }
  }, [fetchMessages, updateState, messageError.isError, isLoading]);

  const handleClickDeleteRollingPaper = () => {};

  const handleClickDeleteMessage = (id) => {
    console.log("id", id);
  };

  const handleRefreshMessages = useCallback(() => {
    setMessageError({ isError: false, error: null });
    refetch();
  }, [refetch]);

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <PostItemPageModeButtons
          recipientId={recipientId}
          isEditPage={isEditPage}
          onDelete={handleClickDeleteRollingPaper}
        />
      </div>
      <div
        className={clsx(styles.messageContainer, {
          [styles.block]: isError || isEmptyMessage,
        })}
      >
        <AsyncStateRenderer
          isLoading={isLoading}
          isError={isError || messageError.isError}
          isEmpty={isEmptyMessage}
        >
          <AsyncStateRenderer.Loading>
            <SkeletonCards />
          </AsyncStateRenderer.Loading>
          <AsyncStateRenderer.Error>
            <ErrorDisplay onRetry={handleRefreshMessages} />
          </AsyncStateRenderer.Error>
          <AsyncStateRenderer.Empty>
            <EmptyDisplay />
          </AsyncStateRenderer.Empty>
          <AsyncStateRenderer.Content>
            <RollingPaperCard type="add" id={recipientId} />
            <RollingPaperCardList
              isLoading={isLoading}
              isEditPage={isEditPage}
              next={fetchedMessageData?.next}
              messages={messages}
              onUpdate={loadMoreMessages}
              onDeleteMessage={handleClickDeleteMessage}
            />
          </AsyncStateRenderer.Content>
        </AsyncStateRenderer>
      </div>
    </div>
  );
};

const SkeletonCards = () =>
  Array.from({ length: CONSTANTS.VISIBLE_SKELETON_CARDS }).map((_, index) => (
    <div key={`skeleton-${index}`} className={styles.skeletonCard}>
      <Spinner />
    </div>
  ));

const ErrorDisplay = ({ onRetry }) => (
  <div className={styles.errorMessageWrapper}>
    <img src={ErrorPaperplane} alt="보라색 종이비행기" />
    <p>메시지를 불러오는 중 문제가 발생했습니다</p>
    <Button size="size40" className={styles.retryButton} onClick={onRetry}>
      재시도
    </Button>
  </div>
);

const EmptyDisplay = () => (
  <div className={styles.errorMessageWrapper}>
    <img src={EmptyPaperplane} alt="보라색 종이비행기" />
    <p>받은 메시지가 없습니다.</p>
  </div>
);

export default PostItemPage;
