import Badge from "../Badge/Badge";

import styles from "./CardList.module.css";

const CardList = ({
  background,
  users,
  message,
  badges = [],
  onClick,
  userCountText,
}) => {
  return (
    <div className={styles.card} style={{ background }} onClick={onClick}>
      <div className={styles.cardMessage}>{message}</div>
      <div className={styles.profileContainer}>
        <div className={styles.profileImage}>
          <div className={styles.userCount}>{users.length}</div>
          {users.slice(0, 3).map((user) => (
            <img
              key={user.id}
              src={user.avatar}
              alt={user.name}
              className={styles.profileImages}
            />
          ))}

          {users.length > 3 && (
            <div className={styles.extraCount}>+{users.length - 3}</div>
          )}
        </div>
        <div className={styles.userCountText}>
          {userCountText
            ? userCountText.replace("{count}", users.length)
            : `${users.length}명이 작성했어요!`}

          <Badge badges={badges} />
        </div>
      </div>
    </div>
  );
};

export default CardList;
