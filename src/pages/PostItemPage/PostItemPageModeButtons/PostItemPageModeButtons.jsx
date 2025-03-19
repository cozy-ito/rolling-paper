import { useCallback, useState } from "react";

import { useNavigate } from "react-router-dom";

import { deleteRecipientById } from "../../../apis/rollingPaper";
import CautionIcon from "../../../assets/icons/close.svg";
import Button from "../../../components/Button/Button";
import Toast from "../../../components/Toast/Toast";
import { ROUTES } from "../../../constants/routes";

import styles from "./PostItemPageModeButtons.module.css";

const PostItemPageModeButtons = ({ recipientId, isEditPage }) => {
  const navigate = useNavigate();

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

  const handleClickChangeEditmode = () => {
    navigate(getPostItemURL(recipientId, "edit"), { replace: true });
  };

  const handleClickCancelEdit = () => {
    navigate(getPostItemURL(recipientId), { replace: true });
  };

  return (
    <>
      {!isEditPage && (
        <Button
          size="size40"
          className={styles.button}
          onClick={handleClickChangeEditmode}
        >
          수정하기
        </Button>
      )}
      {isEditPage && (
        <>
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

const getPostItemURL = (recipientId, suffix = "") =>
  `/post/${recipientId}/${suffix}`;

const TOAST_TYPES = {
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
