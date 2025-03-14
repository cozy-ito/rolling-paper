import React from "react";

import clsx from "clsx";

import DefaultProfile from "../../assets/imgs/profile-1.png";

import styles from "./ProfileChips.module.css";

const ProfileChips = ({
  direction = "row",
  totalProfileCount,
  profileUrls,
  message,
}) => {
  const profileLength = profileUrls.length;

  return (
    <div className={clsx(styles.profileChipsContainer, styles[direction])}>
      <div className={styles.chips}>
        {profileUrls.map((profileUrl, index) => (
          <span key={index} className={styles.chip}>
            <img src={profileUrl || DefaultProfile} alt="프로필1" />
          </span>
        ))}
        {totalProfileCount > 3 && (
          <span className={clsx(styles.chip, styles.count)}>
            +{totalProfileCount - profileLength}
          </span>
        )}
      </div>
      <p className={styles.info}>{message}</p>
    </div>
  );
};

export default ProfileChips;
