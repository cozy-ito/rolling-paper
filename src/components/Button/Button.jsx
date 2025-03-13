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
  iconSrc = [],
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
      {Array.isArray(iconSrc) &&
        iconSrc.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`아이콘 ${index}`}
            className={styles.icon}
          />
        ))}
      {children}
    </button>
  );
};

export default Button;
