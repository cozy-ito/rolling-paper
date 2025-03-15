import ArrowDownIcon from "../../assets/icons/arrow-down.svg";
import PopoverWrapper from "../PopoverWrapper/PopoverWrapper";

import styles from "./HiddenEmojiBox.module.css";

const HiddenEmojiBox = ({ emojiList }) => {
  return (
    <PopoverWrapper>
      {({ popoverRef, isOpen, setIsOpen }) => (
        <>
          <button type="button" onClick={() => setIsOpen((prev) => !prev)}>
            <img src={ArrowDownIcon} alt="아래방향 화살표" />
          </button>
          {isOpen && (
            <ul ref={popoverRef} className={styles.emojiHiddenList}>
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

export default HiddenEmojiBox;
