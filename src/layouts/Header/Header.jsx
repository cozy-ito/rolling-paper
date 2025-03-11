import clsx from "clsx";
import styles from "./Header.module.css";

const Header = ({ hideOnMobile }) => {
  return (
    <div
      className={clsx(styles.container, {
        [styles.mobile_hidden]: hideOnMobile,
      })}
    >
      <div className={styles.inner_container}>Header</div>
    </div>
  );
};

export default Header;
