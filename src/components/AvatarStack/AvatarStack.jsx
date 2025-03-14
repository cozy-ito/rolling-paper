import React from "react";

import clsx from "clsx";

import DefaultProfile from "../../assets/imgs/profile-1.png";

import styles from "./AvatarStack.module.css";

const AvatarStack = ({
  direction = "row",
  avatarUrls,
  message,
  maxVisibleAvatars = 3,
}) => {
  const avaterCount = avatarUrls.length;

  return (
    <div className={clsx(styles.avatarContainer, styles[direction])}>
      <div className={styles.avatars}>
        {avatarUrls.slice(0, maxVisibleAvatars).map((url, index) => (
          <span key={index} className={styles.avatar}>
            <img src={url || DefaultProfile} alt={`프로필${index}`} />
          </span>
        ))}
        {avaterCount > maxVisibleAvatars && (
          <span className={clsx(styles.avatar, styles.count)}>
            +{avaterCount - maxVisibleAvatars}
          </span>
        )}
      </div>
      <p className={styles.info}>{message}</p>
    </div>
  );
};

export default AvatarStack;
