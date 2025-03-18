import { useNavigate } from "react-router-dom";

import Button from "../../../components/Button/Button";

import styles from "./PostItemPageModeButtons.module.css";

const PostItemPageModeButtons = ({ recipientId, isEditPage, onDelete }) => {
  const navigate = useNavigate();

  return isEditPage ? (
    <>
      <Button
        type="button"
        size="size40"
        variant="warning"
        className={styles.button}
        onClick={onDelete}
      >
        삭제하기
      </Button>
      <Button
        type="button"
        size="size40"
        variant="outlined"
        className={styles.button}
        onClick={() => navigate(`/post/${recipientId}`)}
      >
        취소하기
      </Button>
    </>
  ) : (
    <Button
      type="button"
      size="size40"
      className={styles.button}
      onClick={() => navigate(`/post/${recipientId}/edit`)}
    >
      수정하기
    </Button>
  );
};

export default PostItemPageModeButtons;
