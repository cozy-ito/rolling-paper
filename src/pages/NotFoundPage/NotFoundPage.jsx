import { Link } from "react-router-dom";

import RollingIcon from "../../assets/imgs/abc.png";
import Header from "../../layouts/Header/Header";

import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <img
          src={RollingIcon}
          alt="Rolling Not Found"
          className={styles.image}
        />
        <h1>Oops! 길을 잃었어요</h1>
        <p>
          비행기가 목적지를 찾지 못했어요. 페이지가 존재하지 않거나
          삭제되었습니다.
        </p>
        <Link to="/" className={styles.button}>
          메인 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
