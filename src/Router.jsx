import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage/HomePage";
import ListPage from "./pages/ListPage/ListPage";
import MessagePage from "./pages/MessagePage/MessagePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PostItemPage from "./pages/PostItemPage";
import PostPage from "./pages/PostPage/PostPage";

import Header from "./layouts/Header/Header";
import MainLayout from "./layouts/MainLayout/MainLayout";
import PostItemPageHeader from "./layouts/PostItemPageHeader/PostItemPageHeader";

import { ROUTES } from "./constants/routes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout header={<Header />} />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LIST} element={<ListPage />} />
        </Route>

        <Route
          element={
            <MainLayout
              header={
                <>
                  <Header visibleOn={["desktop", "tablet"]} />
                  <PostItemPageHeader />
                </>
              }
            />
          }
        >
          <Route path={ROUTES.POST_ITEM} element={<PostItemPage />} />
          <Route path={ROUTES.EDIT_POST_ITEM} element={<EditPage />} />
        </Route>

        <Route
          element={
            <MainLayout header={<Header visibleOn={["desktop", "tablet"]} />} />
          }
        >
          <Route path={ROUTES.POST} element={<PostPage />} />
          <Route path={ROUTES.POST_MESSAGE} element={<MessagePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
