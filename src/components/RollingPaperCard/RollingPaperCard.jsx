import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "../../assets/icons/delete.svg";
import defaultProfileImg from "../../assets/icons/person.svg";
import AddIcon from "../../assets/icons/plus.svg";
import Badge from "../Badge/Badge";

import styles from "./RollingPaperCard.module.css";

const Card = ({
  type = "default",
  image = defaultProfileImg,
  id,
  author,
  content,
  date,
  onDelete,
  badge,
  prefix,
  onClick,
  ...props
}) => {
  const navigate = useNavigate();
  const { text, color } = badge || {};

  const handleClick = () => {
    if (type === "add" && id) {
      navigate(`/post/${id}/message`);
    } else {
      onClick?.();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (!e.currentTarget.contains(e.target)) {
      return;
    }
    onDelete();
  };

  return (
    <div
      className={clsx(styles.card, { [styles.addCard]: type === "add" })}
      onClick={handleClick}
      {...props}
    >
      {type === "add" ? (
        <button className={styles.addButton}>
          <img src={AddIcon} alt="추가 아이콘" />
        </button>
      ) : (
        <>
          <div className={styles.cardHeader}>
            <img
              src={image}
              alt="profileImage"
              className={styles.profileImage}
            />
            <div className={styles.headerText}>
              <span className={styles.prefix}>{prefix}</span>
              <span className={styles.author}>{author}</span>
              {text && <Badge text={text} color={color} />}
            </div>
            {type === "edit" && (
              <button className={styles.deleteButton} onClick={handleDelete}>
                <img
                  src={DeleteIcon}
                  alt="Delete"
                  className={styles.deleteIcon}
                />
              </button>
            )}
          </div>
          <div className={styles.cardContent}>{content}</div>
          <div className={styles.cardFooter}>{date}</div>
        </>
      )}
    </div>
  );
};

export default Card;
