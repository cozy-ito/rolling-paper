import clsx from "clsx";

import defaultIcon from "../../assets/icons/person.svg";

import styles from "./ProfileButton.module.css";

const ProfileButton = ({
  size = "small",
  src = defaultIcon,
  className,
  onClick,
  children,
  disabled = false,
}) => (
  <button
    className={clsx(
      styles.profileButton,
      size === "large" ? styles.large : styles.small,
      className,
    )}
    onClick={onClick}
    disabled={disabled}
  >
    <img
      src={src}
      alt="프로필 사진"
      className={clsx(
        styles.profileImage,
        src === defaultIcon &&
          (size === "large"
            ? styles.defaultIconLarge
            : styles.defaultIconSmall),
      )}
    />
    {size === "small" && children}
  </button>
);

export default ProfileButton;
