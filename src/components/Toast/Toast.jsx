import { useEffect } from "react";

import checkIcon from "../../assets/icons/check.svg";
import closeIcon from "../../assets/icons/close.svg";

import styles from "./Toast.module.css";

const Toast = ({ isVisible, setIsVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, setIsVisible]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.toast} ${!isVisible ? styles.hidden : ""}`}>
      <div className={styles.iconWrapper}>
        <img src={checkIcon} alt="체크 아이콘" className={styles.checkIcon} />
      </div>
      <span className={styles.message}>URL이 복사 되었습니다.</span>
      <img
        src={closeIcon}
        alt="닫기 아이콘"
        className={styles.closeIcon}
        onClick={() => setIsVisible(false)}
      />
    </div>
  );
};

export default Toast;
