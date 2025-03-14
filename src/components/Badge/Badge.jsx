import clsx from "clsx";

import styles from "./Badge.module.css";

const Badge = ({ text, color = "primary" }) => {
  return <span className={clsx(styles.badge, styles[color])}>{text}</span>;
};

export default Badge;
