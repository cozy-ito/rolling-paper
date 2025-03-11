import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

const MainLayout = ({ header }) => {
  return (
    <>
      <header className={styles.header}>{header}</header>
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
