import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
// MainLayout 컴포넌트 생성, components폴더, Header.js파일 생성, Router구조를
