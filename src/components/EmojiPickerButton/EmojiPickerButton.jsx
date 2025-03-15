import EmojiPicker from "emoji-picker-react";

import EmojiPlusIcon from "../../assets/icons/person-plus.svg";
import PopoverWrapper from "../PopoverWrapper/PopoverWrapper";

import styles from "./EmojiPickerButton.module.css";

const EmojiPickerButton = ({ onClick = () => {} }) => {
  const clickHandler = (target) => {
    // target.emoji: 선택한 이모지, ex) "😁"
    onClick(target.emoji);
  };

  return (
    <PopoverWrapper>
      {({ popoverRef, isOpen, setIsOpen }) => (
        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <img src={EmojiPlusIcon} alt="이모지 플러스 아이콘" />
            <span className={styles.buttonText}>추가</span>
          </button>
          {isOpen && (
            <ul ref={popoverRef} className={styles.emojiBox}>
              <EmojiPicker onEmojiClick={clickHandler} />
            </ul>
          )}
        </div>
      )}
    </PopoverWrapper>
  );
};

export default EmojiPickerButton;
