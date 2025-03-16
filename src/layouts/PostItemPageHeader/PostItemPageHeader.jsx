import clsx from "clsx";
import { useParams } from "react-router-dom";

import AvatarStack from "../../components/AvatarStack/AvatarStack";
import EmojiBox from "../../components/EmojiBox/EmojiBox";
import EmojiPickerButton from "../../components/EmojiPickerButton/EmojiPickerButton";
import ShareButton from "../../components/ShareButton/ShareButton";

import styles from "./PostItemPageHeader.module.css";

const TOTAL_MESSAGE_COUNT = 10;
const VISIBLE_EMOJI_COUNT = 3;

const PostItemPageHeader = () => {
  //* 페이지 구현 시, API 연동 예정
  const { id: recipientId } = useParams();
  const recentMessages = Array.from({ length: TOTAL_MESSAGE_COUNT });

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.rollingPaperToName}>To. Ashley Kim</p>
        <div className={styles.rollingPaperInfo}>
          <div className={styles.profileChipWrapper}>
            <AvatarStack
              avatarUrls={recentMessages}
              message={
                <>
                  <strong>{TOTAL_MESSAGE_COUNT}</strong>
                  명이 작성했어요!
                </>
              }
            />
          </div>
          <div className={clsx(styles.divider, styles.marginX28)} />
          <div className={styles.emojiWrapper}>
            <div className={styles.emojiBox}>
              <ul className={styles.emojiList}>
                {Array.from({ length: VISIBLE_EMOJI_COUNT }).map((_, index) => (
                  <li key={index} className={styles.badge}>
                    <span>😊</span>
                    <span>24</span>
                  </li>
                ))}
              </ul>
              <EmojiBox recipientId={recipientId} />
            </div>
            <EmojiPickerButton />
          </div>
          <div className={clsx(styles.divider, styles.marginX12)} />
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default PostItemPageHeader;
