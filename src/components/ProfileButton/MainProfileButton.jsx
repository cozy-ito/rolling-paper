import clsx from "clsx";

import mainDefaultIcon from "../../assets/icons/person.svg";

import styles from "./MainProfileButton.module.css";

const MainProfileButton = ({ src = mainDefaultIcon, className, onClick }) => (
  <button
    className={clsx(styles.mainProfileButton, className)}
    onClick={onClick}
  >
    <img
      src={src}
      alt="메인 프로필 이미지"
      className={clsx(
        styles.mainProfileImage,
        src === mainDefaultIcon && styles.defaultIconLarge,
      )}
    />
  </button>
);

MainProfileButton.defaultProps = {
  src: mainDefaultIcon,
};

export default MainProfileButton;
