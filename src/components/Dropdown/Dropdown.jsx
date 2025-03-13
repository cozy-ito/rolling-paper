import arrowDown from "../../assets/icons/arrow-down.svg";
import arrowTop from "../../assets/icons/arrow-top.svg";

import styles from "./Dropdown.module.css";

const Dropdown = ({ selectedText, isOpen, setIsOpen, items, onSelect }) => {
  return (
    <div className={styles.dropdownContainer}>
      <div
        role="button"
        className={styles.dropdown}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedText}</span>
        <div className={styles.iconDiv}>
          <img src={isOpen ? arrowTop : arrowDown} alt="arrow-icons" />
        </div>
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {items.map((item) => (
            <li
              key={item}
              className={styles.dropdownList}
              onClick={() => onSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
