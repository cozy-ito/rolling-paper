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

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import PostItemPage from "./pages/PostItemPage";
import PostPage from "./pages/PostPage"; // 롤링페이퍼 만들기 페이지

// 메인 페이지 (버튼 클릭 시 롤링페이퍼 만들기 페이지로 이동)
const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>🎉 환영합니다!</h1>
      <p>새로운 롤링페이퍼를 만들어 보세요.</p>
      <button onClick={() => navigate("/post-item")}>롤링페이퍼 만들기</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* 메인 페이지 */}
        <Route path="/post-item" element={<PostItemPage />} />{" "}
        <Route path="/post/:id" element={<PostPage />} />
        {/* 롤링페이퍼 만들기 페이지 */}
      </Routes>
    </Router>
  );
};

export default App;

/*
import { useState } from "react";
import BackgroundOptionItem from "./components/BackgroundOptionItem/BackgroundOptionItem";

const colors = ["beige", "purple", "green", "blue"];

const App = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleSelectedColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f8f8",
      }}
    >
      <h2
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        배경화면을 선택하세요
      </h2>
      <div style={{ display: "flex", gap: "1rem" }}>
        {colors.map((color, index) => (
          <BackgroundOptionItem
            key={index}
            isSelected={selectedColor === color}
            onClick={() => handleSelectedColor(color)}
            className="option-item"
          >
            <div
              style={{
                backgroundColor: color,
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: selectedColor === color ? "3px solid black" : "none",
                transition: "transform 0.2s ease-in-out",
              }}
            />
          </BackgroundOptionItem>
        ))}
      </div>
    </div>
  );
};

export default App;
*/
