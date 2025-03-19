import { forwardRef } from "react";

import arrowDown from "../../assets/icons/arrow-down.svg";
import arrowTop from "../../assets/icons/arrow-top.svg";

import styles from "./Dropdown.module.css";

const Dropdown = forwardRef(
  ({ selectedText, isOpen, setIsOpen, items, onSelect }, ref) => {
    const handleDropdownClick = (e) => {
      if (e.target !== e.currentTarget) {
        return;
      }
      setIsOpen((prev) => !prev);
    };

    return (
      <div className={styles.dropdownContainer} ref={ref}>
        <div
          role="button"
          className={styles.dropdown}
          onClick={handleDropdownClick}
        >
          <span>{selectedText}</span>
          <div className={styles.iconDiv}>
            <img src={isOpen ? arrowTop : arrowDown} alt="arrow-icons" />
          </div>
        </div>
        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {items.map((item, index) => (
              <li
                key={index}
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
  },
);

export default Dropdown;
