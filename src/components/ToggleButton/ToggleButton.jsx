import styles from "./ToggleButton.module.css";

const ToggleButton = ({ isActive, onClick, component }) => {
  return (
    <>
      <div>
        <button
          className={`${styles.button} ${isActive ? styles.active : ""} `}
          onClick={() => onClick(true)}>
          컬러
        </button>
        <button
          className={`${styles.button} ${!isActive ? styles.active : ""} `}
          onClick={() => onClick(false)}>
          이미지
        </button>
      </div>
      {component}
    </>
  );
};

export default ToggleButton;
