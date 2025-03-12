import styles from "./Badge.module.css";

const Badge = ({ text, color }) => {
  const { backgroundColor, color: textColor } = BADGE_COLORS[color];

  return (
    <span
      className={styles.badge}
      style={{ backgroundColor, color: textColor }}>
      {text}
    </span>
  );
};

const BADGE_COLORS = {
  primary: {
    backgroundColor: "var(--color-blue-100)",
    color: "var(--color-blue-500)",
  },
  secondary: {
    backgroundColor: "var(--color-gray-100)",
    color: "var(--color-gray-800)",
  },
  success: {
    backgroundColor: "var(--color-green-100)",
    color: "var(--color-green-500)",
  },
  warning: {
    backgroundColor: "var(--color-beige-500)",
    color: "var(--color-error)",
  },
  danger: {
    backgroundColor: "var(--color-error)",
    color: "var(--color-white)",
  },
  info: {
    backgroundColor: "var(--color-green-300)",
    color: "var(--color-green-900)",
  },

  like: {
    backgroundColor: "var(--color-green-200)",
    color: "var(--color-green-500)",
  },
  dislike: {
    backgroundColor: "var(--color-gray-400)",
    color: "var(--color-gray-900)",
  },
  new: {
    backgroundColor: "var(--color-purple-100)",
    color: "var(--color-purple-900)",
  },
  premium: {
    backgroundColor: "var(--color-beige-200)",
    color: "var(--color-beige-500)",
  },
  verified: {
    backgroundColor: "var(--color-blue-200)",
    color: "var(--color-blue-500)",
  },
};

export default Badge;
