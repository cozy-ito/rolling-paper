import DownArrow from "../../assets/icons/arrow-down.svg";
import LeftArrow from "../../assets/icons/arrow-left.svg";
import RightArrow from "../../assets/icons/arrow-right.svg";
import TopArrow from "../../assets/icons/arrow-top.svg";

import styles from "./ArrowButton.module.css";

const directions = {
  down: DownArrow,
  left: LeftArrow,
  right: RightArrow,
  top: TopArrow,
};

const ArrowButton = ({ direction = "left", ...props }) => {
  const ArrowComponent = directions[direction];

  return (
    <button type="button" className={styles.button} {...props}>
      <img src={ArrowComponent} alt="화살표 아이콘" />
    </button>
  );
};

export default ArrowButton;
