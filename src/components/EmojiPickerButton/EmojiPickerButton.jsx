import EmojiPicker from "emoji-picker-react";

import { postReactionById } from "../../apis/reaction";
import EmojiPlusIcon from "../../assets/icons/person-plus.svg";
import PopoverWrapper from "../PopoverWrapper/PopoverWrapper";

import styles from "./EmojiPickerButton.module.css";

const EmojiPickerButton = ({ onClick, recipientId }) => {
  const clickHandler = async (target) => {
    const payloadReaction = {
      recipientId,
      // target.emoji: 선택한 이모지, ex) "😁"
      emoji: target.emoji,
    };

    const result = await postReactionById({
      ...payloadReaction,
      type: "increase",
    });

    onClick?.({ id: result.id, count: result.count, ...payloadReaction });
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
            <div ref={popoverRef} className={styles.emojiBox}>
              <EmojiPicker onEmojiClick={clickHandler} />
            </div>
          )}
        </div>
      )}
    </PopoverWrapper>
  );
};

export default EmojiPickerButton;
