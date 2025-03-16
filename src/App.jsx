/*
import Router from "./Router";

const App = () => {
  // useFetchData 사용 예시입니다.
  // const { isLoading, isError, error, requestData, resetState, data } =
  //   useFetchData(() => getPlaceholderTodosById(1));

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
