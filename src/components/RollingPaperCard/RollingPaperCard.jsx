import styles from "./card.module.css";
import Badge from "../Badge/Badge";
import clsx from "clsx";
import DeleteIcon from "../../assets/icons/delete.svg";
import { useNavigate } from "react-router-dom";

const Card = ({
  type = "default",
  image = "default",
  id,
  author,
  content,
  date,
  onDelete,
  badge,
  prefix,
  ...props
}) => {
  const navigate = useNavigate();
  const { text, color } = badge || {};

  const handleClick = () => {
    if (type === "add" && id) {
      navigate(`/post/${id}/message`);
    }
  };

  const handleDelete = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onDelete();
  };

  return (
    <div
      className={clsx(styles.card, { [styles.addCard]: type === "add" })}
      onClick={handleClick}
      {...props}>
      {type === "add" ? (
        // <Button/>
        // 임시 코드, Button 공통 컴포넌트가 병합되면 제거 될 코드
        <button className={styles.addButton}>+</button>
      ) : (
        <>
          <div className={styles.cardHeader}>
            <img
              src={
                image === "default" ? "../../assets/icons/person.svg" : image
              }
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
