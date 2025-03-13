import clsx from "clsx";

import styles from "./Button.module.css";

const Button = ({
  variant = "primary", //primary, secondary, outlined -> 버튼 스타일 종류
  disabled = false,
  size = "size56", //size56, size40, size36, size28 -> 폰트 크기
  state = "enabled", //enabled, disabled -> 버튼 상태
  className,
  children,
  iconSrc,
  ...rest
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
      disabled={disabled || state === "disabled"}
      {...rest}
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
