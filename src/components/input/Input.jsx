import styles from "./Input.module.css";

const Input = ({
  placeholder = "placeholder",
  disabled = false,
  error = false,
  errorMessage = "",
  value,
  onChange,
}) => {
  const inputClassName = [
    styles.input,
    error && styles.error,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="styles.inputContainer">
      <input
        className={inputClassName}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
