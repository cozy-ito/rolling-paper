import styles from "./OptionItem.module.css";
import checkIcon from "../../assets/icons/check.svg";

const OptionItem = ({ color, image, isSelected, onClick, checkActive }) => {
  return (
    <div className={`${styles.optionItem} ${styles[color]}`} onClick={onClick}>
      {isSelected === "IMAGE" && (
        <img
          src={image}
          className={styles.optionImage}
          alt="Option background"
        />
      )}

      {checkActive && (
        <div className={styles.checkRound} onClick={onClick}>
          <img src={checkIcon} alt="checkIcon" className={styles.checkIcon} />
        </div>
      )}

      {checkActive && (
        <div className={styles.checkRound}>
          <img src={checkIcon} alt="checkIcon" className={styles.checkIcon} />
        </div>
      )}
    </div>
  );
};

export default OptionItem;
