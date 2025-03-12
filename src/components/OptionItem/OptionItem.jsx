import checkIcon from "../../assets/icons/check.svg";

import styles from "./OptionItem.module.css";

const OptionItem = ({ children, isSelected, className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {isSelected && (
        <img src={checkIcon} alt="checkIcon" className={styles.checkIcon} />
      )}
      {children}
    </div>
  );
};

export default OptionItem;
