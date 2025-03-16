import React from "react";

import ShareIcon from "../../assets/icons/share.svg";

import styles from "./ShareButton.module.css";

const ShareButton = () => {
  return (
    <button type="button" className={styles.button}>
      <img src={ShareIcon} alt="공유하기 아이콘" />
    </button>
  );
};

export default ShareButton;
