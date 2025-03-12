import clsx from "clsx";

import defaultIcon from "../../assets/icons/person.svg";

import styles from "./ProfileButton.module.css";

const ProfileButton = ({
  children,
  onClick,
  className,
  disabled = false,
  src = defaultIcon,
}) => (
  <button
    className={clsx(styles.profileButton, className)}
    disabled={disabled}
    onClick={onClick}
  >
    <img
      src={src}
      alt="프로필 사진"
      className={clsx(
        styles.profileImage,
        src === defaultIcon && styles.defaultIconSmall,
      )}
    />
    {children}
  </button>
);

export default ProfileButton;
