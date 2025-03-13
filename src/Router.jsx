import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import MessagePage from "./pages/MessagePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostItemPage from "./pages/PostItemPage";
import PostPage from "./pages/PostPage";

import Header from "./layouts/Header/Header";
import MainLayout from "./layouts/MainLayout/MainLayout";
import SubHeader from "./layouts/SubHeader/SubHeader";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout header={<Header />} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
        </Route>

        <Route
          element={
            <MainLayout
              header={
                <>
                  <Header visibleOn={["desktop", "tablet"]} />
                  <SubHeader />
                </>
              }
            />
          }
        >
          <Route path="/post/:id" element={<PostItemPage />} />
          <Route path="/post/:id/edit" element={<EditPage />} />
        </Route>

        <Route
          element={
            <MainLayout header={<Header visibleOn={["desktop", "tablet"]} />} />
          }
        >
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/:id/message" element={<MessagePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
