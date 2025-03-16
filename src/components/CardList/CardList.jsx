import blue from "../../assets/imgs/blue.png";
import green from "../../assets/imgs/green.png";
import orange from "../../assets/imgs/orange.png";
import purple from "../../assets/imgs/purple.png";
import Badge from "../Badge/Badge";

import styles from "./CardList.module.css";

const CardList = ({
  backgroundColor,
  profileSection = [],
  totalUsers = 0,
  message,
  userMessage,
  badges = [],
  onClick,
}) => {
  const backgroundImage = getBackgroundImage(backgroundColor);

  return (
    <div
      className={styles.card}
      style={{
        background: backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "50% auto",
        backgroundPosition: "bottom right",
        backgroundRepeat: "no-repeat",
      }}
      onClick={onClick}
    >
      <div className={styles.cardMessage}>{message}</div>

      {Array.isArray(profileSection) && profileSection.length > 0 && (
        <div className={styles.profileWrapper}>
          {profileSection.map(({ src }, index) => (
            <img
              key={index}
              src={src}
              alt="프로필 이미지"
              className={styles.profileImage}
            />
          ))}
        </div>
      )}

      <div className={styles.userCount}>
        <span className={styles.userCountNumber}>{totalUsers}</span>
        {userMessage}
      </div>

      <div className={styles.reactionsWrapper}>
        <div className={styles.reactionsContainer}>
          {badges.map((badge, index) => (
            <Badge key={index} {...badge} />
          ))}
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
