import { useState } from "react";

import useIntersection from "../../hooks/useIntersection";
import { formatDateWithDots } from "../../utils/formatter";
import { makeBadge } from "../../utils/mapper";
import Badge from "../Badge/Badge";
import Modal from "../Modal/Modal";
import RollingPaperCard from "../RollingPaperCard/RollingPaperCard";

const RollingPaperCardList = ({
  recipientId,
  isLoading,
  isEditPage,
  next,
  messages,
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
          <RollingPaperCard
            key={id}
            id={recipientId}
            type={isEditPage && "edit"}
            image={profileImageURL}
            prefix="From. "
            author={sender}
            content={content}
            badge={makeBadge(relationship)}
            date={formatDateWithDots(createdAt)}
            onClick={() => handleClickOpenModal(index)}
            onDelete={() => onDeleteMessage(id)}
          />
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

const makeModalProps = (messageData) => {
  if (messageData) {
    const { profileImageURL, sender, relationship, createdAt, content } =
      messageData;

    return {
      profileImg: profileImageURL,
      title: sender,
      badge: <Badge {...makeBadge(relationship)} />,
      date: formatDateWithDots(createdAt),
      bodyText: content,
    };
  }
};

export default RollingPaperCardList;
