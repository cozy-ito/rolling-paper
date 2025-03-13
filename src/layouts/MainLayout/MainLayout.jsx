import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.css";

const MainLayout = ({ header, subHeader }) => {
  return (
    <>
      <header className={styles.header}>
        {header}
        {subHeader}
      </header>
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
