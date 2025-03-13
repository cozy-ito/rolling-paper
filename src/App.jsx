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

import { useState } from "react";
import Router from "./Router";
import Toast from "./components/Toast/Toast";

const App = () => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleShowToast = () => {
    setIsToastVisible(true); // 바로 true로 변경
  };

  return (
    <>
      <Router />
      <button onClick={handleShowToast}>토스트 띄우기</button>
      <Toast
        isVisible={isToastVisible}
        setIsVisible={setIsToastVisible}
        message="토스트 메시지!"
      />
    </>
  );
};

export default App;

/* ProfileButton
import { useState } from "react";
import ProfileButton from "./components/ProfileButton/ProfileButton"; // ProfileButton 경로 확인

const App = () => {
  const [isVisible, setIsVisible] = useState(true); // isVisible 상태를 true로 설정

  return (
    <div>
      <ProfileButton
        isVisible={isVisible} // isVisible을 ProfileButton으로 전달
        profileImage="path/to/profileImage.jpg" // profileImage 경로 예시
        onClick={() => {
          // 버튼 클릭 시 할 동작을 여기에 작성
          console.log("프로필 버튼 클릭됨");
        }}
      />
    </div>
  );
};

export default App;
*/

/*profilebutton
import { useState } from "react";
import MainProfileButton from "./components/ProfileButton/MainProfileButton";
import ProfileButton from "./components/ProfileButton/ProfileButton";
import profileImage from "./assets/imgs/profile-1.png";
import mainDefaultIcon from "./assets/icons/person.svg"; // 기본 아이콘 추가

const App = () => {
  const [mainProfileSrc, setMainProfileSrc] = useState(null); // 처음에는 빈 값

  const handleProfileClick = (src) => {
    setMainProfileSrc(src); // 작은 버튼 클릭 시 큰 버튼의 이미지 변경
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "2rem",
      }}
    >
   
      <ProfileButton onClick={() => handleProfileClick(profileImage)} />
      <MainProfileButton src={mainProfileSrc || mainDefaultIcon} />
    </div>
  );
};

export default App;
*/

/*button
import React, { useState } from "react";
import Button from "./components/Button/Button"; // 버튼 컴포넌트 임포트
import "./components/Button/Button.module.css";
// 버튼 스타일 적용
import cartIcon from "./assets/icons/person-plus.svg";

const App = () => {
  const [count, setCount] = useState(0); // 숫자 상태 추가

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <h2>숫자: {count}</h2>

      <Button onClick={() => setCount(count + 1)}>숫자 증가</Button>

      <Button variant="secondary" onClick={() => setCount(count - 1)}>
        숫자 감소
      </Button>

      <Button variant="outline" onClick={() => setCount(0)}>
        초기화
      </Button>

      <Button onClick={() => setCount(count + 1)}>
        <img
          src={cartIcon}
          alt="장바구니"
          style={{ width: 16, height: 16, marginRight: 8 }}
        />
        장바구니 추가
      </Button>

      <Button variant="primary" onClick={() => setCount(count + 10)}>
        +10 증가
        <img
          src={cartIcon}
          alt="추가"
          style={{ width: 16, height: 16, marginLeft: 8 }}
        />
      </Button>
    </div>
  );
};

export default App;
*/
/*button
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Button from "./components/Button/Button"; // 버튼 컴포넌트 임포트
import "./components/Button/Button.module.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>홈 페이지</h1>
      <Button variant="primary" onClick={() => navigate("/page1")}>
        페이지 1 이동
      </Button>
      <Button variant="secondary" onClick={() => navigate("/page2")}>
        페이지 2 이동
      </Button>
      <Button variant="outlined" onClick={() => navigate("/page3")}>
        페이지 3 이동
      </Button>
    </div>
  );
};

const Page1 = () => (
  <div className="container">
    <h1>페이지 1</h1>
    <Button variant="primary" onClick={() => window.history.back()}>
      뒤로 가기
    </Button>
  </div>
);

const Page2 = () => (
  <div className="container">
    <h1>페이지 2</h1>
    <Button variant="secondary" onClick={() => window.history.back()}>
      뒤로 가기
    </Button>
  </div>
);

const Page3 = () => (
  <div className="container">
    <h1>페이지 3</h1>
    <Button variant="outlined" onClick={() => window.history.back()}>
      뒤로 가기
    </Button>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </Router>
  );
};

export default App;
*/
