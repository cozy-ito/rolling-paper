import styles from "./ToggleButtons.module.css";

const ToggleButtons = ({ isSelected, onClick, textArray }) => {
  return (
    <div>
      <button
        className={`${styles.button} ${isSelected === "COLOR" ? styles.active : ""}`}
        onClick={() => onClick("COLOR")}>
        {textArray[0]}
      </button>
      <button
        className={`${styles.button} ${isSelected === "IMAGE" ? styles.active : ""}`}
        onClick={() => onClick("IMAGE")}>
        {textArray[1]}
      </button>
    </div>
  );
};

export default ToggleButtons;
