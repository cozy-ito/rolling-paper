import ShareIcon from "../../assets/icons/share.svg";
import PopoverWrapper from "../PopoverWrapper/PopoverWrapper";

import styles from "./ShareButton.module.css";

const ShareButton = () => {
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
                <button type="button">URL 공유</button>
              </li>
            </ul>
          )}
        </div>
      )}
    </PopoverWrapper>
  );
};

export default ShareButton;
