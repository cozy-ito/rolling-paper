import clsx from "clsx";

import styles from "./Card.module.css";

const Card = ({ top, middle, middleClassName, bottom, onClick }) => {
  return (
    <div role="button" className={styles.container} onClick={onClick}>
      <div className={styles.top}>{top}</div>
      <div className={clsx(styles.middle, middleClassName)}>{middle}</div>
      <div className={styles.bottom}>{bottom}</div>
    </div>
  );
};

export default Card;
