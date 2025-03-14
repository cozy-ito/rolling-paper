import ArrowDownIcon from "../../assets/icons/arrow-down.svg";
import PopoverWrapper from "../PopoverWrapper/PopoverWrapper";

import styles from "./HiddenEmojiBox.module.css";

const HiddenEmojiBox = ({ emojiList }) => {
  return (
    <PopoverWrapper>
      {({ targetRef, isToggle, setIsToggle }) => (
        <>
          <button type="button" onClick={() => setIsToggle((prev) => !prev)}>
            <img src={ArrowDownIcon} alt="아래방향 화살표" />
          </button>
          {isToggle && (
            <ul ref={targetRef} className={styles.emojiHiddenList}>
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
