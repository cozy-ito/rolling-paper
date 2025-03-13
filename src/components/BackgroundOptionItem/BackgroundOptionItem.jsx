import checkIcon from "../../assets/icons/check.svg";

import styles from "./BackgroundOptionItem.module.css";

const BackgroundOptionItem = ({ children, isSelected, className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {isSelected && (
        <img src={checkIcon} alt="checkIcon" className={styles.checkIcon} />
      )}
      {children}
    </div>
  );
};

export default BackgroundOptionItem;
