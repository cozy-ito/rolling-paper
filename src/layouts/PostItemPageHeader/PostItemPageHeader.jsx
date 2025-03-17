import { useEffect, useMemo } from "react";

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
  const { data } = useFetchData(() => getRecipientById(recipientId));

  const { recipient, totalMessageCount, recentMessagesUrls } = useMemo(() => {
    const recipient = `To. ${data?.name ?? ""}`;
    const totalMessageCount = data?.messageCount;
    const recentMessagesUrls =
      data?.recentMessages.map(({ profileImageURL }) => profileImageURL) || [];
    return { recipient, totalMessageCount, recentMessagesUrls };
  }, [data]);

  useEffect(() => {
    const rootElement = document.querySelector("#root");
    if (data) {
      const { backgroundImageURL, backgroundColor } = data;
      const backgroundStyle =
        backgroundImageURL === null
          ? `var(--color-${backgroundColor}-200)`
          : `center/cover no-repeat url(${backgroundImageURL})`;

      rootElement.style.background = backgroundStyle;
    }

    return () => {
      rootElement.style.background = "";
    };
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.rollingPaperToName}>{recipient}</p>
        <div className={styles.rollingPaperInfo}>
          <div className={styles.profileChipWrapper}>
            <AvatarStack
              avatarUrls={recentMessagesUrls}
              totalMessageCount={totalMessageCount}
              message={
                <>
                  <strong>{totalMessageCount}</strong>
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
          <ShareButton kakaoSharetitle={recipient} />
        </div>
      </div>
    </div>
  );
};

export default PostItemPageHeader;
