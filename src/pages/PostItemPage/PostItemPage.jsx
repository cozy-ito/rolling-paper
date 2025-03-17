import { useRef, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getMessagesById } from "../../apis/message";
import AsyncStateRenderer from "../../components/AsyncStateRenderer/AsyncStateRenderer";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import RollingPaperCard from "../../components/RollingPaperCard/RollingPaperCard";
import Spinner from "../../components/Spinner/Spinner";
import useFetchData from "../../hooks/useFetchData";
import { formatDateWithDots } from "../../utils/formatter";

import styles from "./PostItemPage.module.css";

const VISIBLE_SKELETON_CARDS = 6;

const PostItemPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: recipientId } = useParams();
  const {
    isLoading,
    isError,
    data: fetchedMessageData,
  } = useFetchData(() => getMessagesById({ recipientId }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessageIndex, setModalMessageIndex] = useState(null);
  const observerTargetRef = useRef(null);

  const messages = fetchedMessageData?.results ?? [];
  const isEditPage = location.pathname.split("/").at(-1) === "edit";

  //* {
  //*   "id": 19066,
  //*   "recipientId": 10777,
  //*   "sender": "김하은",
  //*   "profileImageURL": "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
  //*   "relationship": "가족",
  //*   "content": "열심히 일하는 모습 멋있습니다.",
  //*   "font": "Pretendard",
  //*   "createdAt": "2025-03-16T17:25:41.518649Z"
  //* }
  console.log(fetchedMessageData);

  const handleClickMoveEditPage = () => {
    navigate(`/post/${recipientId}/edit`);
  };

  const handleClickMovePostItemPage = () => {
    navigate(`/post/${recipientId}`);
  };

  const handleClickDeleteRollingPaper = () => {};

  const handleClickDeleteMessage = (id) => {
    console.log("id", id);
  };

  const clickHandlerOpenModal = (index) => {
    setIsModalOpen(true);
    setModalMessageIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        {isEditPage ? (
          <>
            <Button
              type="button"
              size="size40"
              variant="warning"
              className={styles.button}
              onClick={handleClickDeleteRollingPaper}
            >
              삭제하기
            </Button>
            <Button
              type="button"
              size="size40"
              variant="outlined"
              className={styles.button}
              onClick={handleClickMovePostItemPage}
            >
              취소하기
            </Button>
          </>
        ) : (
          <Button
            type="button"
            size="size40"
            className={styles.button}
            onClick={handleClickMoveEditPage}
          >
            수정하기
          </Button>
        )}
      </div>
      <div className={styles.messageContainer}>
        <AsyncStateRenderer isLoading={isLoading} isError={isError}>
          <AsyncStateRenderer.Loading>
            {Array.from({ length: VISIBLE_SKELETON_CARDS }).map((_, index) => (
              <div key={index} className={styles.skeletonCard}>
                <Spinner />
              </div>
            ))}
          </AsyncStateRenderer.Loading>
          <AsyncStateRenderer.Content>
            <RollingPaperCard type="add" id={recipientId} />
            {messages?.map(
              (
                {
                  id,
                  profileImageURL,
                  sender,
                  relationship,
                  content,
                  createdAt,
                },
                index,
              ) => (
                <RollingPaperCard
                  type={isEditPage && "edit"}
                  key={id}
                  id={recipientId}
                  image={profileImageURL}
                  prefix="From. "
                  author={sender}
                  badge={makeBadge(relationship)}
                  content={content}
                  date={formatDateWithDots(createdAt)}
                  onClick={() => clickHandlerOpenModal(index)}
                  onDelete={() => handleClickDeleteMessage(id)}
                />
              ),
            )}
            <div ref={observerTargetRef} />
            <Modal
              fromLabel="From. "
              isModalOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              {...makeModalProps(messages[modalMessageIndex])}
            />
          </AsyncStateRenderer.Content>
        </AsyncStateRenderer>
      </div>
    </div>
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

const BADGE_MAPPER = {
  가족: "like",
  지인: "premium",
  동료: "new",
  친구: "verified",
};

const makeBadge = (relation) => {
  return { text: relation, color: BADGE_MAPPER[relation] };
};

export default PostItemPage;
