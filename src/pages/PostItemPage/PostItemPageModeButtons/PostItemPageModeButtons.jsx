import { useCallback, useState } from "react";

import clsx from "clsx";
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
  restoreMessages,
  clearSelectedItems,
  updateState,
}) => {
  const [toastState, setToastState] = useState({
    message: "",
    isVisible: false,
    icon: null,
  });

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

  return (
    <>
      {!isEditPage && (
        <EditButton recipientId={recipientId}>수정하기</EditButton>
      )}
      {isEditPage && (
        <>
          <CurrentStateSaveButton
            recipientId={recipientId}
            selectedItems={selectedItemsToDelete}
            restoreMessages={restoreMessages}
            clearSelectedItems={clearSelectedItems}
            updateState={updateState}
            showToast={showToast}
          >
            저장하기
          </CurrentStateSaveButton>
          <DeleteRollingPaperButton
            recipientId={recipientId}
            showToast={showToast}
          >
            페이지 삭제하기
          </DeleteRollingPaperButton>
          <CancelButton
            recipientId={recipientId}
            restoreMessages={restoreMessages}
            clearSelectedItems={clearSelectedItems}
          >
            취소하기
          </CancelButton>
        </>
      )}
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
    </>
  );
};

const EditButton = ({
  recipientId,
  children,
  className,
  onClick,
  ...props
}) => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    navigate(getPostItemURL(recipientId, "edit"));
    onClick?.(e);
  };

  return (
    <Button
      size="size40"
      className={clsx(styles.button, className)}
      onClick={clickHandler}
      {...props}
    >
      {children}
    </Button>
  );
};

const CurrentStateSaveButton = ({
  recipientId,
  children,
  selectedItems,
  // showToast,
  // restoreMessages,
  clearSelectedItems,
  updateState,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClickSave = async () => {
    if (selectedItems.length <= 0) {
      navigate(getPostItemURL(recipientId));
      return;
    }
    const results = [];
    const unsuccessfulOperations = [];
    for (let i = 0; i < selectedItems.length; i++) {
      try {
        const response = await deleteMessageById(selectedItems[i].id);
        console.log(response);
        if (response === null) {
          results.push({
            index: i,
            success: true,
            data: selectedItems[i],
            error: undefined,
          });
        } else {
          results.push({
            index: i,
            success: false,
            data: selectedItems[i],
            error: response,
          });
        }
      } catch (error) {
        unsuccessfulOperations.push(selectedItems[i]);
        results.push({
          index: i,
          success: false,
          data: selectedItems[i],
          error,
        });
      }
    }

    const hasFailures = results.some((result) => !result.success);
    console.log(unsuccessfulOperations, hasFailures);

    if (hasFailures) {
      console.log("일부 작업 실패, 롤백 시작");
      updateState((prev) => ({
        ...prev,
        results: [...prev.results, ...unsuccessfulOperations].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      }));
      // navigate(getPostItemURL(recipientId));
    }
    clearSelectedItems();

    // try {
    // const deletePromises = await selectedItems.map(async ({ id }) => {
    //   const result = deleteMessageById(id);
    //   console.log("result", result);
    //   return result;
    // });
    // console.log(deletePromises);

    // const results = await Promise.all(deletePromises);

    // console.log(results);
    // const failedDeletions = results.filter(
    //   ({ status }) => status === "rejected",
    // );

    // if (failedDeletions.length === 0) {
    //   clearSelectedItems();
    //   showToast(TOAST_TYPES.SUCCESS);
    //   navigate(getPostItemURL(recipientId));
    //   return;
    // }

    // throw new Error("Something wrong!");
    // restoreMessages();
    // clearSelectedItems();
    // showToast(TOAST_TYPES.ERROR);
    // } catch (error) {
    //   console.error("Message deletion error:", error);
    //   restoreMessages();
    //   clearSelectedItems();
    //   showToast(TOAST_TYPES.ERROR, error?.message);
    // }
  };

  return (
    <Button
      type="button"
      size="size40"
      className={styles.button}
      onClick={handleClickSave}
      {...props}
    >
      {children}
    </Button>
  );
};

const DeleteRollingPaperButton = ({ recipientId, children, showToast }) => {
  const navigate = useNavigate();

  const handleClickDeleteRollingPaper = async () => {
    try {
      await deleteRecipientById(recipientId);
      navigate(ROUTES.LIST);
    } catch (error) {
      showToast({
        ...TOAST_TYPES.ERROR,
        message: error?.message || TOAST_TYPES.ERROR.message,
      });
    }
  };

  return (
    <Button
      type="button"
      size="size40"
      variant="warning"
      className={styles.button}
      onClick={handleClickDeleteRollingPaper}
    >
      {children}
    </Button>
  );
};

const CancelButton = ({
  children,
  recipientId,
  restoreMessages,
  clearSelectedItems,
}) => {
  const navigate = useNavigate();

  const handleClickCancelEdit = () => {
    restoreMessages();
    clearSelectedItems();
    navigate(getPostItemURL(recipientId));
  };

  return (
    <Button
      type="button"
      size="size40"
      variant="outlined"
      className={styles.button}
      onClick={handleClickCancelEdit}
    >
      {children}
    </Button>
  );
};

const getPostItemURL = (recipientId, suffix = "") =>
  `/post/${recipientId}/${suffix}`;

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
