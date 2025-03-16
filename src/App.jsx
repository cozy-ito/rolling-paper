/*
import Router from "./Router";

const App = () => {
  return (
    <>
      <Router />
    </>
  );
};
export default App;
*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ListPage from "./pages/ListPage";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
