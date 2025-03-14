import EmojiPicker from "emoji-picker-react";

import EmojiPlusIcon from "../../assets/icons/person-plus.svg";
import PopoverWrapper from "../PopoverWrapper/PopoverWrapper";

import styles from "./EmojiPickerButton.module.css";

const EmojiPickerButton = ({ onClick = () => {} }) => {
  const clickHandler = (target) => {
    //   {
    //     "activeSkinTone": "neutral",
    //     "emoji": "🙂",
    //     "imageUrl": "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f642.png",
    //     "isCustom": false,
    //     "names": [
    //         "slightly smiling face"
    //     ],
    //     "unified": "1f642",
    //     "unifiedWithoutSkinTone": "1f642"
    // }
    console.dir(target);
    onClick(target.emoji);
  };

  return (
    <PopoverWrapper>
      {({ targetRef, isToggle, setIsToggle }) => (
        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsToggle((prev) => !prev)}
          >
            <img src={EmojiPlusIcon} alt="이모지 플러스 아이콘" />
            <span className={styles.buttonText}>추가</span>
          </button>
          {isToggle && (
            <ul ref={targetRef} className={styles.emojiBox}>
              <EmojiPicker onEmojiClick={clickHandler} />
            </ul>
          )}
        </div>
      )}
    </PopoverWrapper>
  );
};

export default EmojiPickerButton;
