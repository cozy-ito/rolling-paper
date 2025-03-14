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

import ProfileButton from "./components/ProfileButton/ProfileButton";

import customProfileImage from "./assets/imgs/profile-1.png"; // 테스트할 이미지 추가

const App = () => {
  // 큰 프로필의 초기 이미지를 undefined로 설정 → ProfileButton이 defaultIcon을 자동 사용
  const [largeProfileSrc, setLargeProfileSrc] = useState(undefined);

  const handleProfileChange = (newSrc) => {
    setLargeProfileSrc(newSrc);
    console.log("큰 프로필 이미지 변경:", newSrc || "기본 아이콘");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <h1>Profile Button Test</h1>

      {/* 큰 프로필 (변경될 대상) */}
      <ProfileButton size="large" src={largeProfileSrc} />

      <div style={{ display: "flex", gap: "1rem" }}>
        {/* 작은 프로필 버튼 (사용자 이미지 선택) */}
        <ProfileButton
          size="small"
          src={customProfileImage}
          onClick={() => handleProfileChange(customProfileImage)}
        />

        {/* 작은 프로필 버튼 (기본 이미지 선택) */}
        <ProfileButton
          size="small"
          onClick={() => handleProfileChange(undefined)}
        />
      </div>
    </div>
  );
};

export default App;
