import styles from "./Input.module.css";
import clsx from "clsx";

const Input = ({ isError = false, errorMessage = "", ...props }) => {
  return (
    <div>
      <input
        className={clsx(styles.input, {
          [styles.isError]: isError,
        })}
        {...props}
      />
      {isError && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
