import arrowDown from "../../assets/icons/arrow-down.svg";
import arrowTop from "../../assets/icons/arrow-top.svg";

import styles from "./Dropdown.module.css";

const Dropdown = ({ text, isOpen, setIsOpen }) => {
  return (
    <div className={styles.dropdownContainer}>
      <div
        role="button"
        className={styles.dropdown}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{text}</span>
        <div className={styles.iconDiv}>
          <img src={isOpen ? arrowDown : arrowTop} alt="arrow-icons" />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
