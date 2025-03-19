import { useEffect } from "react";

import clsx from "clsx";

import checkIcon from "../../assets/icons/check.svg";
import closeIcon from "../../assets/icons/close.svg";

import styles from "./Toast.module.css";

const Toast = ({
  icon = DefaultIcon,
  isVisible,
  setIsVisible,
  message,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, setIsVisible, duration]);

  if (!isVisible) return null;

  return (
    <div className={clsx(styles.toast, { [styles.hidden]: !isVisible })}>
      {icon}
      <p className={styles.message}>{message}</p>
      <img
        src={closeIcon}
        alt="닫기 아이콘"
        className={styles.closeIcon}
        onClick={() => setIsVisible(false)}
      />
    </div>
  );
};

const DefaultIcon = (
  <div className={styles.iconWrapper}>
    <img src={checkIcon} alt="체크 아이콘" className={styles.checkIcon} />
  </div>
);

export default Toast;
