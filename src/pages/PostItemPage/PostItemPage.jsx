import { memo, useCallback, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Navigate, useLocation, useParams } from "react-router-dom";

import { deleteMessageById, getMessagesById } from "../../apis/message";
import CautionIcon from "../../assets/icons/close.svg";
import EmptyPaperplane from "../../assets/imgs/paperplane_empty.webp";
import ErrorPaperplane from "../../assets/imgs/paperplane_error.webp";
import AsyncStateRenderer from "../../components/AsyncStateRenderer/AsyncStateRenderer";
import Button from "../../components/Button/Button";
import RollingPaperCard from "../../components/RollingPaperCard/RollingPaperCard";
import RollingPaperCardList from "../../components/RollingPaperCardList/RollingPaperCardList";
import Spinner from "../../components/Spinner/Spinner";
import Toast from "../../components/Toast/Toast";
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

  const [toastState, setToastState] = useState({
    message: "",
    isVisible: false,
    icon: null,
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
    error,
    data: fetchedMessageData,
    refetch,
    updateState,
  } = useFetchData(fetchMessages);

  const messages = fetchedMessageData?.results ?? [];
  const isEmptyMessage = messages.length === 0;
  const isEditPage = location.pathname.endsWith(CONSTANTS.EDIT_PAGE_LAST_URL);
  const isNotFound =
    error?.response?.status === 404 || error?.toString().includes("Not found");

  const loadMoreMessages = useCallback(async () => {
    if (isError || isLoading) {
      return;
    }

    try {
      const offset = pageRef.current * CONSTANTS.MESSAGE_PAGE_UNIT;
      const nextMessageData = await fetchMessages({ offset });
      pageRef.current += 1;

      updateState((prev) => {
        if (!prev?.results) {
          return prev;
        }
        return {
          ...nextMessageData,
          results: [...prev.results, ...nextMessageData.results],
        };
      });
    } catch (error) {
      setToastState({
        message: `메시지 정보를 불러오지 못했습니다: ${error?.message ?? ""}`,
        isVisible: true,
        icon: <FailIcon />,
      });
    }
  }, [isError, fetchMessages, updateState, isLoading]);

  const handleClickDeleteMessage = async (targetid) => {
    try {
      const result = await deleteMessageById(targetid);
      if (result === null) {
        updateState((prev) => {
          if (!prev?.results) {
            return prev;
          }
          return {
            ...prev,
            results: [...prev.results.filter(({ id }) => id !== targetid)],
          };
        });
      }
      setToastState({
        message: "메시지 삭제에 성공했습니다",
        isVisible: true,
        icon: undefined,
      });
    } catch (error) {
      setToastState({
        message: `메시지를 삭제하지 못했습니다: ${error?.message ?? ""}`,
        isVisible: true,
        icon: <FailIcon />,
      });
    }
  };

  const handleRefreshMessages = useCallback(() => {
    setToastState({
      message: "",
      isVisible: false,
      icon: null,
    });
    pageRef.current = CONSTANTS.INITIAL_MESSAGE_PAGE_NUMBER;
    refetch();
  }, [refetch]);

  const resetToast = useCallback(() => {
    setToastState({
      message: "",
      isVisible: false,
      icon: null,
    });
  }, []);

  if (isNotFound) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <PostItemPageModeButtons
          recipientId={recipientId}
          isEditPage={isEditPage}
        />
      </div>
      <div className={styles.messageContainer}>
        <AsyncStateRenderer
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmptyMessage}
        >
          <AsyncStateRenderer.Loading>
            <SkeletonCards />
          </AsyncStateRenderer.Loading>
          <AsyncStateRenderer.Error>
            <ErrorDisplay onRetry={handleRefreshMessages} />
          </AsyncStateRenderer.Error>
          <AsyncStateRenderer.Empty>
            <RollingPaperCard
              type="add"
              id={recipientId}
              className={styles.emptyAddCard}
            />
            <EmptyDisplay />
          </AsyncStateRenderer.Empty>
          <AsyncStateRenderer.Content>
            <AnimatePresence mode="popLayout">
              {!isEditPage && (
                <motion.div
                  key="add-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                >
                  <RollingPaperCard type="add" id={recipientId} />
                </motion.div>
              )}

              <RollingPaperCardList
                isLoading={isLoading}
                isEditPage={isEditPage}
                next={fetchedMessageData?.next}
                messages={messages}
                onUpdate={loadMoreMessages}
                onDeleteMessage={handleClickDeleteMessage}
              />
            </AnimatePresence>
          </AsyncStateRenderer.Content>
        </AsyncStateRenderer>
      </div>

      <Toast
        isVisible={toastState.isVisible}
        setIsVisible={(isVisible) => {
          if (!isVisible) {
            resetToast();
          }
        }}
        duration={3000}
        message={toastState.message}
        icon={toastState.icon}
      />
    </div>
  );
};

const SkeletonCards = memo(() =>
  Array.from({ length: CONSTANTS.VISIBLE_SKELETON_CARDS }).map((_, index) => (
    <div key={`skeleton-${index}`} className={styles.skeletonCard}>
      <Spinner />
    </div>
  )),
);

const ErrorDisplay = memo(({ onRetry }) => (
  <div className={styles.errorMessageWrapper}>
    <img src={ErrorPaperplane} alt="보라색 종이비행기" />
    <p>메시지를 불러오는 중 문제가 발생했습니다</p>
    <Button size="size40" className={styles.retryButton} onClick={onRetry}>
      재시도
    </Button>
  </div>
));

const EmptyDisplay = memo(() => (
  <div className={styles.errorMessageWrapper}>
    <img src={EmptyPaperplane} alt="보라색 종이비행기" />
    <p>받은 메시지가 없습니다.</p>
  </div>
));

const FailIcon = () => {
  return (
    <span className={styles.failIcon}>
      <img src={CautionIcon} alt="X 아이콘" />
    </span>
  );
};

export default PostItemPage;
