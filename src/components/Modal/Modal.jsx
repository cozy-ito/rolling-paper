import styles from "./Modal.module.css";

const Modal = ({
  isModalOpen,
  onClose,
  profileImg,
  title,
  badge,
  date,
  bodyText,
  fromLabel,
}) => {
  if (!isModalOpen) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderUserInfo}>
            <img src={profileImg} alt="profile image" className={styles.img} />
            <div className={styles.modalHeaderUserTextInfo}>
              <h3 className={styles.modalHeaderTitle}>
                <span className={styles.modalHeaderFrom}>{fromLabel}</span>
                {title}
              </h3>
              {badge && badge}
            </div>
          </div>
          <p className={styles.date}>{date}</p>
        </div>
        <hr className={styles.divider} />
        <p className={styles.bodyText}>{bodyText}</p>
        <button onClick={onClose} className={styles.button}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
