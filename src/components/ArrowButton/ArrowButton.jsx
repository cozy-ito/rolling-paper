import DownArrow from "../../assets/icons/arrow-down.svg";
import LeftArrow from "../../assets/icons/arrow-left.svg";
import RightArrow from "../../assets/icons/arrow-right.svg";
import TopArrow from "../../assets/icons/arrow-top.svg";

import styles from "./ArrowButton.module.css";

const directions = {
  down: { icon: DownArrow, alt: "아래" },
  left: { icon: LeftArrow, alt: "왼쪽" },
  right: { icon: RightArrow, alt: "오른쪽" },
  top: { icon: TopArrow, alt: "위" },
};

const ArrowButton = ({ direction = "left", ...props }) => {
  const ArrowComponent = directions[direction].icon;

  return (
    <button type="button" className={styles.button} {...props}>
      <img
        src={ArrowComponent}
        alt={`${directions[direction].alt} 화살표 아이콘`}
      />
    </button>
  );
};

export default ArrowButton;
