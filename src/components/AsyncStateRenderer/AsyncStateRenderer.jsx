import React, { createContext, useContext } from "react";

// 상태 컨텍스트 생성
const AsyncStateContext = createContext({
  isLoading: undefined,
  isError: undefined,
  isEmpty: undefined,
});

/**
 * 비동기 상태를 관리하는 컨테이너 컴포넌트
 */
const AsyncProvider = ({
  isLoading = false,
  isError = false,
  isEmpty = false,
  children,
}) => {
  // 상태 값을 컨텍스트로 제공
  const value = { isLoading, isError, isEmpty };

  return (
    <AsyncStateContext.Provider value={value}>
      {children}
    </AsyncStateContext.Provider>
  );
};

const useAsyncStateContext = () => {
  const context = useContext(AsyncStateContext);
  if (context === undefined) {
    throw new Error("useAsyncRenderer 내부에서 사용해야 합니다.");
  }
  return context;
};

/**
 * 로딩 상태를 처리하는 서브 컴포넌트
 */
const Loading = ({ children }) => {
  const { isLoading } = useAsyncStateContext();

  return isLoading ? <>{children}</> : null;
};

/**
 * 에러 상태를 처리하는 서브 컴포넌트
 */
const Error = ({ children }) => {
  const { isLoading, isError } = useAsyncStateContext();

  return !isLoading && isError ? <>{children}</> : null;
};

/**
 * 데이터가 없는 상태를 처리하는 서브 컴포넌트
 */
const Empty = ({ children }) => {
  const { isLoading, isError, isEmpty } = useAsyncStateContext();

  return !isLoading && !isError && isEmpty ? <>{children}</> : null;
};

/**
 * 성공 상태(다른 모든 상태가 false)를 처리하는 서브 컴포넌트
 */
const Content = ({ children }) => {
  const { isLoading, isError, isEmpty } = useAsyncStateContext();

  return !isLoading && !isError && !isEmpty ? <>{children}</> : null;
};

// 서브 컴포넌트를 메인 컴포넌트에 추가
AsyncProvider.Loading = Loading;
AsyncProvider.Error = Error;
AsyncProvider.Empty = Empty;
AsyncProvider.Content = Content;

export default AsyncProvider;
