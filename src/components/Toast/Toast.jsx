import styles from "./Toast.module.css";
import checkIcon from "../../assets/icons/check.svg";
import closeIcon from "../../assets/icons/close.svg";

const Toast = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.iconWrapper}>
        <img src={checkIcon} alt="체크 아이콘" className={styles.checkIcon} />
      </div>
      <span className={styles.message}>URL이 복사 되었습니다.</span>
      <img
        src={closeIcon}
        alt="닫기 아이콘"
        className={styles.closeIcon}
        onClick={onClose}
      />
    </div>
  );
};

export default Toast;
