import styles from "./DropdownMenu.module.css";

const DropdownMenu = ({ items, onSelect }) => {
  return (
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
  );
};

export default DropdownMenu;
