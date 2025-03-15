import DropdownIcon from "../../assets/icons/arrow-down.svg";
import PopoverWrapper from "../PopoverWrapper/PopoverWrapper";

import styles from "./EmojiBox.module.css";

const EmojiBox = ({ emojiList }) => {
  return (
    <PopoverWrapper>
      {({ popoverRef, isOpen, setIsOpen }) => (
        <>
          <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
            <img src={DropdownIcon} alt="이미지 목록 토글" />
          </button>
          {isOpen && (
            <ul ref={popoverRef} className={styles.emojiDropdown}>
              {emojiList.map(({ emoji, count }, index) => (
                <li key={index} className={styles.badge}>
                  <span>{emoji}</span>
                  <span>{count}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </PopoverWrapper>
  );
};

export default EmojiBox;
