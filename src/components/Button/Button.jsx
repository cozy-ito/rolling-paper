import clsx from "clsx";

import styles from "./Button.module.css";

const Button = ({
  variant = "primary",
  disabled = false,
  size = "size56",
  state = "enabled",
  className,
  children,
  onClick,
  iconSrc,
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        state,
        className,
      )}
      onClick={onClick}
      disabled={disabled || state === "disabled"}
    >
      {iconSrc && <img src={iconSrc} alt="아이콘" className={styles.icon} />}
      {children}
    </button>
  );
};

export default Button;
