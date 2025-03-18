import { useCallback, useEffect, useReducer, useRef } from "react";

const ACTIONS = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  RESET: "RESET",
};

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  data: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.PENDING:
      return { ...state, isLoading: true };
    case ACTIONS.SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case ACTIONS.ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    case ACTIONS.RESET:
      return initialState;
    default:
      throw new Error("reducer의 action.type을 지정해야 합니다.");
  }
};

/**
 * 비동기 데이터 요청 및 상태 관리를 위한 커스텀 훅
 * 컴포넌트 마운트 시 자동으로 데이터를 요청하며, 요청 상태를 관리합니다.
 *
 * @param {Function} fetchFn - 비동기 데이터를 가져오는 콜백 함수
 * @returns {{ isLoading: boolean, isError: boolean, error: Error | null, data: any, refetch: Function, resetState: Function, updateState: Function }} 요청 상태 및 제어 함수
 */

/*
  TODO: fetchFn이 변경되더라도 requestData가 자동적으로 호출되지 않습니다.
 * 동일 페이지 내 fetcnFn이 변동되는 곳에서 사용 시 버그가 발생할 수 있습니다. 🥲
 */
const useFetchData = (fetchFn) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(true);
  const fetchFunctionRef = useRef(fetchFn);

  useEffect(() => {
    fetchFunctionRef.current = fetchFn;
  }, [fetchFn]);

  const requestData = useCallback(async (...args) => {
    try {
      dispatch({ type: ACTIONS.PENDING });

      const result = await fetchFunctionRef.current(...args);

      if (isMounted.current) {
        dispatch({ type: ACTIONS.SUCCESS, payload: result });
      }
    } catch (err) {
      if (isMounted.current) {
        dispatch({ type: ACTIONS.ERROR, payload: err });
      }
      throw err;
    }
  }, []);

  const updateState = useCallback(
    (nextState) => {
      if (isMounted.current) {
        if (typeof nextState === "function") {
          dispatch({
            type: ACTIONS.SUCCESS,
            payload: nextState(state.data),
          });
          return;
        }
        dispatch({ type: ACTIONS.SUCCESS, payload: nextState });
      }
    },
    [state.data],
  );

  const resetState = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  useEffect(() => {
    isMounted.current = true;

    requestData();

    return () => {
      isMounted.current = false;
    };
  }, [requestData]);

  const { isLoading, isError, error, data } = state;
  return {
    isLoading,
    isError,
    error,
    data,
    refetch: requestData,
    resetState,
    updateState,
  };
};

export default useFetchData;
