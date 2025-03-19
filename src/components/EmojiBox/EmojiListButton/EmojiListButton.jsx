import { useRef, useState } from "react";

import clsx from "clsx";

import DropdownIcon from "../../../assets/icons/arrow-down.svg";
import PurplePaperPlane from "../../../assets/imgs/paperplane.png";
import useOutsideClick from "../../../hooks/useOutsideClick";
import AsyncStateRenderer from "../../AsyncStateRenderer/AsyncStateRenderer";
import Button from "../../Button/Button";
import Spinner from "../../Spinner/Spinner";

import styles from "./EmojiListButton.module.css";

const EmojiListButton = ({
  invisibleReactionList,
  isLoading,
  isError,
  onRetryRequest,
}) => {
  const popoverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useOutsideClick(popoverRef, () => setIsOpen(false));

  const handleClickToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={popoverRef} className={styles.container}>
      <button
        type="button"
        className={styles.openButton}
        onClick={handleClickToggleDropdown}
      >
        <img src={DropdownIcon} alt="이미지 목록 토글" />
      </button>

      {isOpen && (
        <ul
          className={clsx(styles.emojiDropdown, {
            [styles.success]: !isLoading && !isError,
          })}
        >
          <AsyncStateRenderer isLoading={isLoading} isError={isError}>
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
                  onClick={onRetryRequest}
                >
                  재시도
                </Button>
              </li>
            </AsyncStateRenderer.Error>
            <AsyncStateRenderer.Content>
              {invisibleReactionList.map(({ id, emoji, count }) => (
                <li key={id} className={styles.badge}>
                  <span>{emoji}</span>
                  <span>{count}</span>
                </li>
              ))}
            </AsyncStateRenderer.Content>
          </AsyncStateRenderer>
        </ul>
      )}
    </div>
  );
};

export default EmojiListButton;
