//import Badge from "../Badge/Badge";

import blueBg from "../../assets/imgs/blue.png";
import greenBg from "../../assets/imgs/green.png";
import orangeBg from "../../assets/imgs/orange.png";
import purpleBg from "../../assets/imgs/purple.png";

import styles from "./CardList.module.css";

const getBackgroundImage = (background) => {
  switch (background) {
    case "#FFE2AD":
      return orangeBg;
    case "#ECD9FF":
      return purpleBg;
    case "#B1E4FF":
      return blueBg;
    case "#D0F5C3":
      return greenBg;
    default:
      return null;
  }
};

const CardList = ({ background, users, message, badges = [], onClick }) => {
  const maxUsers = 3;
  const extraCount = users.length - maxUsers;
  const backgroundImage = getBackgroundImage(background);

  return (
    <div className={styles.card} style={{ background }} onClick={onClick}>
      <div className={styles.cardMessage}>{message}</div>
      <div className={styles.profileContainer}>
        <div className={styles.profileWrapper}>
          <div className={styles.profileImage}>
            {users.slice(0, maxUsers).map((user) => (
              <img
                key={user.id}
                src={user.avatar}
                alt={user.name}
                className={styles.profileImages}
              />
            ))}
            {extraCount > 0 && (
              <div className={styles.extraCount}>+{extraCount}</div>
            )}
          </div>
        </div>
        <div className={styles.userCount}>
          <span className={styles.userCountNumber}>{users.length}</span>명이
          작성했어요!
        </div>
      </div>
      <div className={styles.reactionsWrapper}>
        <div className={styles.reactionsContainer}>
          {badges.map((badge, index) => (
            <div key={index} className={styles.reactionBadge}>
              <span className="emoji">{badge.emoji}</span>
              <span className="count">{badge.count}</span>
            </div>
          ))}
        </div>
      </div>
      {backgroundImage && (
        <div
          className={styles.shadow}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
    </div>
  );
};

export default CardList;
