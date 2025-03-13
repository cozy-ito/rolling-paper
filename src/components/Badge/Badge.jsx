import styles from "./Badge.module.css";
import clsx from "clsx";

const Badge = ({ text, color = "primary" }) => {
  return <span className={clsx(styles.badge, styles[color])}>{text}</span>;
};

export default Badge;
