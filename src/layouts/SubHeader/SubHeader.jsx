import clsx from "clsx";

import styles from "./SubHeader.module.css";

const SubHeader = ({ mobileHidden }) => {
  return (
    <div
      className={clsx(styles.container, {
        [styles.mobile_hidden]: mobileHidden,
      })}
    >
      <div className={styles.inner_container}>SubHeader</div>
    </div>
  );
};

export default SubHeader;
