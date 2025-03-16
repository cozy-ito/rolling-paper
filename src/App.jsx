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

import ProfileButton from "./components/ProfileButton/ProfileButton";

const App = () => {
  const handleClick = (name) => {
    alert(`${name}님의 프로필 클릭!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 작은 프로필 버튼들 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <ProfileButton onClick={() => handleClick("유저1")}>
          유저1
        </ProfileButton>
        <ProfileButton onClick={() => handleClick("유저2")}>
          유저2
        </ProfileButton>
        <ProfileButton onClick={() => handleClick("유저3")}>
          유저3
        </ProfileButton>
        <ProfileButton onClick={() => handleClick("유저4")}>
          유저4
        </ProfileButton>
      </div>

      {/* 큰 프로필 버튼 */}
      <ProfileButton size="large" onClick={() => handleClick("메인 유저")} />
    </div>
  );
};

export default App;
