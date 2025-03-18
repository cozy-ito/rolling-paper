import clsx from "clsx";

import { FONT_MAP } from "../../constants/fonts";

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
  font,
}) => {
  if (!isModalOpen) return null;
  return (
    <div className={clsx(styles.modalOverlay, styles[font])} onClick={onClose}>
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
        <div className={styles.bodyText}>{bodyText}</div>
        <button onClick={onClose} className={styles.button}>
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
