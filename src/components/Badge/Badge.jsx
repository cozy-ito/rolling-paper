import styles from "./Badge.module.css";

const Badge = ({ text, color }) => {
  return (
    <span
      className={styles.badge}
      style={{ backgroundColor: BADGE_COLORS[color] }}
    >
      {text}
    </span>
  );
};

const BADGE_COLORS = {
  primary: "var(--color-blue-100)",
  secondary: "var(--color-gray-100)",
  success: "var(--color-green-100)",
  warning: "var(--color-beige-500)",
  danger: "var(--color-error)",
  info: "var(--color-green-300)",

  like: "var(--color-green-200)",
  dislike: "var(--color-gray-400)",
  new: "var(--color-purple-100)",
  premium: "var(--color-beige-200)",
  verified: "var(--color-blue-200)",
};

export default Badge;
