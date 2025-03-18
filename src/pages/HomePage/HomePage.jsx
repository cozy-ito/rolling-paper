import clsx from "clsx";
import { Link } from "react-router-dom";

import Group1Image from "../../assets/imgs/group-1.webp";
import Group2Image from "../../assets/imgs/group-2.webp";
import { ROUTES } from "../../constants/routes";

import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
        <section className={clsx(styles.section, styles.paddingLeft)}>
          <div className={styles.left}>
            <span className={styles.badge}>Point. 01</span>
            <p className={styles.title}>
              누구나 손쉽게, 온라인 <br />
              롤링 페이퍼를 만들 수 있어요
            </p>
            <p className={styles.description}>로그인 없이 자유롭게 만들어요.</p>
          </div>
          <div className={clsx(styles.right, styles.group1Image)}>
            <img src={Group1Image} alt="group-1" />
          </div>
        </section>
        <section
          className={clsx(
            styles.section,
            styles.paddingRight,
            styles.rowReverse,
          )}
        >
          <div className={styles.left}>
            <span className={styles.badge}>Point. 02</span>
            <p className={styles.title}>
              서로에게 이모지로 감정을 <br />
              표현해보세요
            </p>
            <p className={styles.description}>
              롤링 페이퍼에 이모지를 추가할 수 있어요.
            </p>
          </div>
          <div className={clsx(styles.right, styles.fitImage)}>
            <img src={Group2Image} alt="group-2" />
          </div>
        </section>
      </div>
      <div className={clsx(styles.buttonContainer)}>
        <Link to={ROUTES.LIST}>구경해보기</Link>
      </div>
    </div>
  );
};

export default HomePage;
