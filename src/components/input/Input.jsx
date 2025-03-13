import styles from "./Input.module.css";
import clsx from "clsx";

const Input = ({
  placeholder = "placeholder",
  disabled = false,
  isError = false,
  errorMessage = "",
  value,
  onChange,
  ...props
}) => {
  return (
    <div>
      <input
        className={clsx(styles.input, {
          [styles.isError]: isError,
          [styles.disabled]: disabled,
        })}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        {...props}
      />
      {isError && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
