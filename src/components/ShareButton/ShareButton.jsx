import React, { useState } from "react";

import ShareIcon from "../../assets/icons/share.svg";
import PopoverWrapper from "../PopoverWrapper/PopoverWrapper";
import Toast from "../Toast/Toast";

import styles from "./ShareButton.module.css";

const ShareButton = () => {
  const [isError, setIsError] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleClickCopyUrl = async () => {
    try {
      setIsError(false);
      await navigator.clipboard.writeText(location.href);
    } catch (error) {
      setIsError(true);
      console.error("클립보드 복사가 실패하였습니다.", error);
    } finally {
      setIsToastVisible(true);
    }
  };

  return (
    <PopoverWrapper>
      {({ popoverRef, isOpen, setIsOpen }) => (
        <div className={styles.container}>
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <img src={ShareIcon} alt="공유하기 아이콘" />
          </button>
          {isOpen && (
            <ul ref={popoverRef} className={styles.dropdown}>
              <li>
                <button type="button">카카오톡 공유</button>
              </li>
              <li>
                <button type="button" onClick={handleClickCopyUrl}>
                  URL 공유
                </button>
              </li>
            </ul>
          )}
          <Toast
            isVisible={isToastVisible}
            setIsVisible={setIsToastVisible}
            duration={3000}
            message={
              isError ? "URL 복사가 실패하였습니다. " : "URL이 복사되었습니다."
            }
          />
        </div>
      )}
    </PopoverWrapper>
  );
};

export default ShareButton;
