import blue from "../../assets/imgs/blue.png";
import green from "../../assets/imgs/green.png";
import orange from "../../assets/imgs/orange.png";
import purple from "../../assets/imgs/purple.png";
import Badge from "../Badge/Badge";

import styles from "./CardList.module.css";

const CardList = ({
  backgroundColor,
  backgroundImageURL,
  profileSection = [],
  totalUsers = 0,
  message,
  userMessage,
  badges = [],
  onClick,
}) => {
  const imageToUse = backgroundImageURL || getBackgroundImage(backgroundColor);

  const maxVisible = 3;
  const visibleProfiles = profileSection.slice(0, maxVisible);
  let extraCount = totalUsers - maxVisible;
  if (extraCount < 0) extraCount = 0;

  return (
    <div
      className={styles.card}
      style={{
        background: backgroundImageURL
          ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${imageToUse})`
          : backgroundColor,
        backgroundSize: backgroundImageURL ? "cover" : "50% auto",
        backgroundPosition: "bottom right",
        backgroundRepeat: "no-repeat",
      }}
      onClick={onClick}
    >
      <div
        className={`${styles.cardMessage} ${backgroundImageURL ? styles.whiteText : ""}`}
      >
        {message}
      </div>

      <div className={styles.profileWrapper}>
        {visibleProfiles.map((profile, index) => (
          <div key={index} className={styles.profileImage}>
            {profile}
          </div>
        ))}
        {extraCount > 0 && (
          <div className={`${styles.profileImage} ${styles.extraCount}`}>
            +{extraCount}
          </div>
        )}
      </div>

      <div
        className={`${styles.userCount} ${backgroundImageURL ? styles.whiteText : ""}`}
      >
        <span
          className={`${styles.userCountNumber} ${backgroundImageURL ? styles.whiteText : ""}`}
        >
          {totalUsers}
        </span>
        <span className={`${backgroundImageURL ? styles.whiteText : ""}`}>
          {userMessage}
        </span>
      </div>

      <div className={styles.reactionsWrapper}>
        <div className={styles.reactionsContainer}>
          {badges.map((badge, index) => (
            <div key={index} {...badge} className={styles.badge}>
              {badge.text} {badge.count}
            </div>
          ))}
          <div className={styles.fakebadge} />
        </div>
      </div>
    </div>
  );
};

const getBackgroundImage = (backgroundColor) => {
  const backgroundImages = {
    "#FFE2AD": orange,
    "#ECD9FF": purple,
    "#B1E4FF": blue,
    "#D0F5C3": green,
  };

  return backgroundImages[backgroundColor];
};

export default CardList;
