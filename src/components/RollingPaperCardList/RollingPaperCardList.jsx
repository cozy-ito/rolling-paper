import { useState } from "react";

import clsx from "clsx";
import { motion } from "framer-motion";

import BinIcon from "../../assets/icons/delete.svg";
import { FONT_MAP } from "../../constants/fonts";
import useIntersection from "../../hooks/useIntersection";
import { formatDateWithDots } from "../../utils/formatter";
import { makeBadge } from "../../utils/mapper";
import Badge from "../Badge/Badge";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import HtmlContentDisplay from "../TextEditor/HtmlContentDisplay/HtmlContentDisplay";

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
          {
            id,
            profileImageURL,
            sender,
            relationship,
            content,
            createdAt,
            font,
          },
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
                    onDeleteMessage(id);
                  }}
                />
              }
              middle={
                <div className={styles.cardMiddle}>
                  <hr />
                  <div className={clsx(styles[FONT_MAP[font]], styles.content)}>
                    <HtmlContentDisplay htmlContent={content} />
                  </div>
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
      font: null,
    };
  }

  const { profileImageURL, sender, relationship, createdAt, content, font } =
    messageData;

  return {
    profileImg: profileImageURL || "",
    title: sender || "",
    badge: relationship ? <Badge {...makeBadge(relationship)} /> : null,
    date: createdAt ? formatDateWithDots(createdAt) : "",
    bodyText: content || "",
    font: font || null,
  };
};

export default RollingPaperCardList;
