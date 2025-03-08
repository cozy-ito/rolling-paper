import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import PostPage from "./pages/PostPage";
import PostItemPage from "./pages/PostItemPage";
import EditPage from "./pages/EditPage";
import MessagePage from "./pages/MessagePage";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./layouts/MainLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/post/:id" element={<PostItemPage />} />
          <Route path="/post/:id/edit" element={<EditPage />} />
          <Route path="/post/:id/message" element={<MessagePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
