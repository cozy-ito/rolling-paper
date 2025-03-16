import { useCallback, useEffect, useRef } from "react";

import { getReactionsById } from "../../apis/reaction";
import DropdownIcon from "../../assets/icons/arrow-down.svg";
import PurplePaperPlane from "../../assets/imgs/paperplane.png";
import useFetchData from "../../hooks/useFetchData";
import AsyncStateRenderer from "../AsyncStateRenderer/AsyncStateRenderer";
import Button from "../Button/Button";
import PopoverWrapper from "../PopoverWrapper/PopoverWrapper";
import Spinner from "../Spinner/Spinner";

import styles from "./EmojiBox.module.css";

const EmojiBox = ({ recipientId }) => {
  const intersectingElementRef = useRef(null);
  const { isLoading, isError, data, requestData, updateState } = useFetchData(
    (params) => getReactionsById({ recipientId, next: params?.next }),
  );

  // console.log(recipientId, data);
  const reactionData = data?.result;

  const isEmpty =
    !isLoading && !isError && (!reactionData || reactionData.length === 0);

  const observerHandler = useCallback(
    ([entry]) => {
      console.log("start");
      if (data?.next && entry.isIntersecting) {
        updateState((prev) => [...prev, ...reactionData]);
      }
    },
    [reactionData, updateState, data?.next],
  );

  useEffect(() => {
    const element = intersectingElementRef.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(observerHandler);

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [reactionData, observerHandler]);

  return (
    <PopoverWrapper>
      {({ popoverRef, isOpen, setIsOpen }) => (
        <>
          <button
            type="button"
            className={styles.openButton}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <img src={DropdownIcon} alt="이미지 목록 토글" />
          </button>
          {isOpen && (
            <ul ref={popoverRef} className={styles.emojiDropdown}>
              <AsyncStateRenderer
                isLoading={isLoading}
                isError={isError}
                isEmpty={isEmpty}
              >
                <AsyncStateRenderer.Loading>
                  <li className={styles.wrapper}>
                    <Spinner />
                  </li>
                </AsyncStateRenderer.Loading>
                <AsyncStateRenderer.Error>
                  <li className={styles.wrapper}>
                    <p>에러가 발생했어요.</p>
                    <Button
                      size="size28"
                      className={styles.retryButton}
                      onClick={() =>
                        requestData({ recipientId, next: data?.next })
                      }
                    >
                      재시도
                    </Button>
                  </li>
                </AsyncStateRenderer.Error>
                <AsyncStateRenderer.Empty>
                  <li className={styles.wrapper}>
                    <img src={PurplePaperPlane} alt="보라색 종이비행기" />
                    이모지가 없어요.
                  </li>
                </AsyncStateRenderer.Empty>
                <AsyncStateRenderer.Content>
                  {reactionData?.map(({ id, emoji, count }) => (
                    <li key={id} className={styles.badge}>
                      <span>{emoji}</span>
                      <span>{count}</span>
                    </li>
                  ))}
                  <div ref={intersectingElementRef} />
                </AsyncStateRenderer.Content>
              </AsyncStateRenderer>
            </ul>
          )}
        </>
      )}
    </PopoverWrapper>
  );
};

export default EmojiBox;
