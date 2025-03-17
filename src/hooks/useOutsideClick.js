import { useEffect } from "react";

/**
 * ref를 전달한 요소 이외의 대상을 클릭하면 callback 함수를 호출합니다.
 * @param {HTMLElement} ref 클릭해도 callback 함수를 호출하지 않을 대상
 * @param {(e: Event) => void} callback 클릭한 대상이 ref가 아니라면 실행되는 콜백함수
 */
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback(e);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, callback]);
};

export default useOutsideClick;
