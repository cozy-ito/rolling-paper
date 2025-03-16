import { useRef, useState } from "react";

import EmojiPicker from "emoji-picker-react";

import EmojiPlusIcon from "../../../assets/icons/person-plus.svg";
import useOutsideClick from "../../../hooks/useOutsideClick";
import PopoverWrapper from "../../PopoverWrapper/PopoverWrapper";

import styles from "./EmojiPickerButton.module.css";

const EmojiPickerButton = ({ onClick }) => {
  const popoverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useOutsideClick(popoverRef, () => setIsOpen(false));

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClickPickEmoji = async (target) => {
    onClick?.(target.emoji);
    setIsOpen(false);
  };

  return (
    <div className={styles.buttonWrapper}>
      <button type="button" className={styles.button} onClick={handleClickOpen}>
        <img src={EmojiPlusIcon} alt="이모지 플러스 아이콘" />
        <span className={styles.buttonText}>추가</span>
      </button>
      {isOpen && (
        <div ref={popoverRef} className={styles.emojiBox}>
          <EmojiPicker onEmojiClick={handleClickPickEmoji} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;
