import { useState } from "react";

import { motion } from "framer-motion";

import BinIcon from "../../assets/icons/delete.svg";
import useIntersection from "../../hooks/useIntersection";
import { formatDateWithDots } from "../../utils/formatter";
import { makeBadge } from "../../utils/mapper";
import Badge from "../Badge/Badge";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import RollingPaperCard from "../RollingPaperCard/RollingPaperCard";
import Spinner from "../Spinner/Spinner";

import styles from "./RollingPaperCardList.module.css";

const RollingPaperCardList = ({
  isLoading,
  isEditPage,
  next,
  messages = [],
  onUpdate,
  onDeleteMessage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessageIndex, setModalMessageIndex] = useState(null);

  const handleClickOpenModal = (index) => {
    setIsModalOpen(true);
    setModalMessageIndex(index);
  };

  const intersectingElementRef = useIntersection(
    {
      condition: !isLoading && next,
      callback: onUpdate,
    },
    [isLoading, next, onUpdate],
  );

  return (
    <>
      {messages.map(
        (
          { id, profileImageURL, sender, relationship, content, createdAt },
          index,
        ) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              onClick={() => handleClickOpenModal(index)}
              top={
                <RollingPaperCardTop
                  isEditPage={isEditPage}
                  sender={sender}
                  profileImageURL={profileImageURL}
                  relationship={relationship}
                  onDelete={(e) => {
                    e?.stopPropagation();
                    onDeleteMessage(index);
                  }}
                />
              }
              middle={
                <div className={styles.cardMiddle}>
                  <hr />
                  <p className={styles.content}>{content}</p>
                </div>
              }
              bottom={
                <span className={styles.createdDate}>
                  {formatDateWithDots(createdAt)}
                </span>
              }
            />
          </motion.div>
        ),
      )}
      <div ref={intersectingElementRef} />
      <Modal
        fromLabel="From. "
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...makeModalProps(messages[modalMessageIndex])}
      />
    </>
  );
};

const RollingPaperCardTop = ({
  isEditPage,
  sender,
  profileImageURL,
  relationship,
  onDelete,
}) => {
  return (
    <div className={styles.cardTop}>
      <div className={styles.senderInfo}>
        <div className={styles.avatar}>
          <img src={profileImageURL} alt={sender} />
          <div className={styles.spinner}>
            <Spinner text={null} responsive />
          </div>
        </div>
        <div className={styles.info}>
          <p className={styles.sender}>From. {sender}</p>
          <Badge {...makeBadge(relationship)} />
        </div>
      </div>
      {isEditPage && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={onDelete}
        >
          <img src={BinIcon} alt="삭제 아이콘" />
        </button>
      )}
    </div>
  );
};

const makeModalProps = (messageData) => {
  if (!messageData) {
    return {
      profileImg: "",
      title: "",
      badge: null,
      date: "",
      bodyText: "",
    };
  }

  const { profileImageURL, sender, relationship, createdAt, content } =
    messageData;

  return {
    profileImg: profileImageURL || "",
    title: sender || "",
    badge: relationship ? <Badge {...makeBadge(relationship)} /> : null,
    date: createdAt ? formatDateWithDots(createdAt) : "",
    bodyText: content || "",
  };
};

export default RollingPaperCardList;
