import clsx from "clsx";

import styles from "./ToggleButtonGroup.module.css";

const ToggleButtonGroup = ({ options, isSelected, onClick }) => {
  return (
    <div>
      {options.map(({ name, optionValue }) => (
        <button
          key={optionValue}
          className={clsx(styles.button, {
            [styles.active]: isSelected === optionValue,
          })}
          onClick={() => onClick(optionValue)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
