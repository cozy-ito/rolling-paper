import clsx from "clsx";
import { useParams } from "react-router-dom";

import AvatarStack from "../../components/AvatarStack/AvatarStack";
import EmojiBox from "../../components/EmojiBox/EmojiBox";
import ShareButton from "../../components/ShareButton/ShareButton";

import styles from "./PostItemPageHeader.module.css";

const TOTAL_MESSAGE_COUNT = 10;

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
            <EmojiBox recipientId={recipientId} />
          </div>
          <div className={clsx(styles.divider, styles.marginX12)} />
          {/* API 연동 후 타이틀 및 관련 정보 수정 예정입니다. */}
          <ShareButton kakaoSharetitle="테스트 타이틀" />
        </div>
      </div>
    </div>
  );
};

export default PostItemPageHeader;
