import { useCallback, useEffect, useReducer, useRef } from "react";

const ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
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
    case ACTIONS.FETCH_START:
      return { ...initialState, isLoading: true };
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
};

/**
 * 비동기 데이터 요청 및 상태 관리를 위한 커스텀 훅
 * 컴포넌트 마운트 시 자동으로 데이터를 요청하며, 요청 상태를 관리합니다.
 *
 * @param {Function} callback - 비동기 데이터를 가져오는 콜백 함수
 * @returns {{isLoading: boolean, isError: boolean, error: Error | null, data: any, requestData: Function, resetState: Function}} 요청 상태 및 제어 함수
 */

const useFetchData = (callback) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(true);
  const callbackRef = useRef(callback);

  const requestData = useCallback(async (...args) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });

      const result = await callbackRef.current(...args);

      if (isMounted.current) {
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: result });
      }
    } catch (err) {
      if (isMounted.current) {
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: err });
      }
      throw err;
    }
  }, []);

  const updateState = (nextState) => {
    if (isMounted.current) {
      if (typeof nextState === "function") {
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: nextState(state) });
        return;
      }
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: nextState });
    }
  };

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
    requestData,
    resetState,
    updateState,
  };
};

export default useFetchData;
