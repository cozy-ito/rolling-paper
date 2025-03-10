import styles from "./RelationBadge.module.css";

const RELATION_STYLES = {
  friend: {
    backgroundColor: "var(--color-blue-100)",
    color: "var(--color-blue-500)",
  },
  colleague: {
    backgroundColor: "var(--color-purple-100)",
    color: "var(--color-purple-600)",
  },
  acquaintance: {
    backgroundColor: "var(--color-beige-100)",
    color: "var(--color-beige-500)",
  },
  family: {
    backgroundColor: "var(--color-green-100)",
    color: "var(--color-green-500)",
  },
};

const RELATION_LABELS = {
  friend: "친구",
  colleague: "동료",
  acquaintance: "지인",
  family: "가족",
};

const RelationBadge = ({ relation }) => {
  return (
    <span className={styles.badge} style={RELATION_STYLES[relation]}>
      {RELATION_LABELS[relation]}
    </span>
  );
};

export default RelationBadge;
