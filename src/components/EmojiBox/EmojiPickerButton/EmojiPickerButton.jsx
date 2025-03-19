import { useRef, useState } from "react";

import EmojiPicker from "emoji-picker-react";

import EmojiPlusIcon from "../../../assets/icons/person-plus.svg";
import useOutsideClick from "../../../hooks/useOutsideClick";

import styles from "./EmojiPickerButton.module.css";

const EmojiPickerButton = ({ onClick }) => {
  const popoverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useOutsideClick(popoverRef, () => setIsOpen(false));

  const handleClickOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickPickEmoji = async (target) => {
    onClick?.(target.emoji);
    setIsOpen(false);
  };

  return (
    <div ref={popoverRef} className={styles.buttonWrapper}>
      <button type="button" className={styles.button} onClick={handleClickOpen}>
        <img src={EmojiPlusIcon} alt="이모지 플러스 아이콘" />
        <span className={styles.buttonText}>추가</span>
      </button>
      <div className={styles.emojiBox}>
        {isOpen && (
          <EmojiPicker
            height="22rem"
            lazyLoadEmojis
            searchDisabled
            skinTonesDisabled
            onEmojiClick={handleClickPickEmoji}
          />
        )}
      </div>
    </div>
  );
};

export default EmojiPickerButton;
