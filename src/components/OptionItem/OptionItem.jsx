import styles from "./OptionItem.module.css";
import checkIcon from "../../assets/icons/check.svg";

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
