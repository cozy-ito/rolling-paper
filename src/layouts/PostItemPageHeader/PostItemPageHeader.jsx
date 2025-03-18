import { useLayoutEffect } from "react";

import clsx from "clsx";
import { useParams } from "react-router-dom";

import { getRecipientById } from "../../apis/rollingPaper";
import AvatarStack from "../../components/AvatarStack/AvatarStack";
import EmojiBox from "../../components/EmojiBox/EmojiBox";
import ShareButton from "../../components/ShareButton/ShareButton";
import useFetchData from "../../hooks/useFetchData";

import styles from "./PostItemPageHeader.module.css";

const PostItemPageHeader = () => {
  const { id: recipientId } = useParams();
  const { data: rollingPaperData } = useFetchData(() =>
    getRecipientById(recipientId),
  );

  const {
    name: recipientName,
    messageCount,
    recentMessages,
    backgroundImageURL,
    backgroundColor,
  } = rollingPaperData || ROLLING_PAPER_DEFAULT_DATA;

  const title = `To. ${recipientName}`;
  const recentMessagesUrls = recentMessages.map(
    ({ profileImageURL }) => profileImageURL,
  );

  useLayoutEffect(() => {
    const rootElement = document.querySelector("#root");
    const backgroundStyle =
      backgroundImageURL === null
        ? `var(--color-${backgroundColor}-200)`
        : `center/cover no-repeat fixed url(${backgroundImageURL})`;

    rootElement.style.background = backgroundStyle;

    return () => {
      rootElement.style.background = "";
    };
  }, [backgroundColor, backgroundImageURL]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.rollingPaperToName}>{title}</p>
        <div className={styles.rollingPaperInfo}>
          <div className={styles.profileChipWrapper}>
            <AvatarStack
              avatarUrls={recentMessagesUrls}
              totalMessageCount={messageCount}
              message={
                <>
                  <strong>{messageCount}</strong>
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
          <ShareButton kakaoSharetitle={title} />
        </div>
      </div>
    </div>
  );
};

const ROLLING_PAPER_DEFAULT_DATA = {
  name: "",
  messageCount: 0,
  recentMessages: [],
  backgroundImageURL: null,
  backgroundColor: "",
};

export default PostItemPageHeader;
