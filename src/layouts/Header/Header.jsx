import clsx from "clsx";

import styles from "./Header.module.css";

const ResponsiveElement = ({
  children,
  visibleOn = ["mobile", "tablet", "desktop"],
}) => {
  const hiddenOnMobile = !visibleOn.includes("mobile");
  const hiddenOnTablet = !visibleOn.includes("tablet");
  const hiddenOnDesktop = !visibleOn.includes("desktop");

  return (
    <div
      className={clsx({
        [styles.hidden_on_desktop]: hiddenOnDesktop,
        [styles.hidden_on_tablet]: hiddenOnTablet,
        [styles.hidden_on_mobile]: hiddenOnMobile,
      })}
    >
      {children}
    </div>
  );
};

const Header = ({ visibleOn }) => {
  return (
    <ResponsiveElement visibleOn={visibleOn}>
      <div className={styles.container}>
        <div className={styles.inner_container}>Header</div>
      </div>
    </ResponsiveElement>
  );
};

// 사용 예시
<Header visibleOn={["tablet", "desktop"]} />;
