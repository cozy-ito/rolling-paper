import { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { deleteMessageById } from "../../../apis/message";
import { deleteRecipientById } from "../../../apis/rollingPaper";
import CautionIcon from "../../../assets/icons/close.svg";
import Button from "../../../components/Button/Button";
import Toast from "../../../components/Toast/Toast";
import { ROUTES } from "../../../constants/routes";

import styles from "./PostItemPageModeButtons.module.css";

const PostItemPageModeButtons = ({
  recipientId,
  isEditPage,
  selectedItemsToDelete,
  messages,
  updateState,
}) => {
  const navigate = useNavigate();
  const [backupMessages, setBackupMessages] = useState([]);
  const [toastState, setToastState] = useState({
    message: "",
    isVisible: false,
    icon: null,
  });

  const getPostItemURL = useCallback(
    (suffix = "") => `/post/${recipientId}${suffix}`,
    [recipientId],
  );

  useEffect(() => {
    // 편집 페이지에서 새로고침 상황 감지 (isEditPage는 true이지만 backupMessages는 비어있음)
    if (isEditPage && messages.length > 0 && backupMessages.length === 0) {
      setBackupMessages([...messages]);
    }
  }, [isEditPage, messages, backupMessages.length]);

  const showToast = useCallback((toastType, customMessage = null) => {
    setToastState({
      ...toastType,
      message: customMessage || toastType.message,
    });
  }, []);

  const resetToast = useCallback(() => {
    setToastState({
      message: "",
      isVisible: false,
      icon: null,
    });
  }, []);

  const restoreMessages = useCallback(() => {
    if (backupMessages.length > 0) {
      updateState((prev) => ({
        ...prev,
        results: [...backupMessages],
      }));
    }
  }, [backupMessages, updateState]);

  const handleClickChangeEditMode = useCallback(() => {
    // 전체 메시지의 원본 상태를 백업 (숨김 처리 없는 원본)
    setBackupMessages([...messages]);
    navigate(getPostItemURL("/edit"));
  }, [messages, navigate, getPostItemURL]);

  const handleClickCancelEdit = useCallback(() => {
    if (isEditPage) {
      restoreMessages();
      navigate(getPostItemURL());
    }
  }, [isEditPage, restoreMessages, navigate, getPostItemURL]);

  const handleClickConfirmDeleteMessages = useCallback(async () => {
    if (selectedItemsToDelete.length <= 0) {
      navigate(getPostItemURL());
      return;
    }

    const backupData =
      backupMessages.length > 0 ? backupMessages : [...messages];

    try {
      const deletePromises = selectedItemsToDelete.map(deleteMessageById);
      const results = await Promise.allSettled(deletePromises);

      const failedDeletions = results.filter(
        ({ status }) => status === "rejected",
      );

      if (failedDeletions.length === 0) {
        showToast(TOAST_TYPES.SUCCESS);
        navigate(getPostItemURL());
        return;
      }

      // 일부 삭제가 실패한 경우 백업 데이터로 복원
      updateState((prev) => ({
        ...prev,
        results: backupData,
      }));

      showToast(TOAST_TYPES.ERROR);
    } catch (error) {
      console.error("Message deletion error:", error);

      updateState((prev) => ({
        ...prev,
        results: backupData,
      }));

      showToast(TOAST_TYPES.ERROR, error?.message);
    }
  }, [
    messages,
    backupMessages,
    selectedItemsToDelete,
    navigate,
    updateState,
    showToast,
    getPostItemURL,
  ]);

  const handleClickDeleteRollingPaper = useCallback(async () => {
    try {
      await deleteRecipientById(recipientId);
      navigate(ROUTES.LIST);
    } catch (error) {
      showToast({
        ...TOAST_TYPES.ERROR,
        message: error?.message || TOAST_TYPES.ERROR.message,
      });
    }
  }, [recipientId, navigate, showToast]);

  return (
    <>
      {!isEditPage && (
        <Button
          type="button"
          size="size40"
          className={styles.button}
          onClick={handleClickChangeEditMode}
        >
          수정하기
        </Button>
      )}
      {isEditPage && (
        <>
          <Button
            type="button"
            size="size40"
            className={styles.button}
            onClick={handleClickConfirmDeleteMessages}
          >
            저장하기
          </Button>
          <Button
            type="button"
            size="size40"
            variant="warning"
            className={styles.button}
            onClick={handleClickDeleteRollingPaper}
          >
            페이지 삭제하기
          </Button>
          <Button
            type="button"
            size="size40"
            variant="outlined"
            className={styles.button}
            onClick={handleClickCancelEdit}
          >
            취소하기
          </Button>
        </>
      )}
      <Toast
        isVisible={toastState.isVisible}
        setIsVisible={(isVisible) => (isVisible ? null : resetToast())}
        duration={3000}
        message={toastState.message}
        icon={toastState.icon}
      />
      ;
    </>
  );
};

const TOAST_TYPES = {
  SUCCESS: {
    isVisible: true,
    message: "수정이 완료되었습니다.",
    icon: undefined,
  },
  ERROR: {
    isVisible: true,
    message: "삭제에 실패하였습니다. 다시 시도해주세요.",
    icon: (
      <span className={styles.failIcon}>
        <img src={CautionIcon} alt="X 아이콘" />
      </span>
    ),
  },
};

export default PostItemPageModeButtons;
