import React, { useCallback, useEffect, useRef } from "react";

/**
 * 요소의 가시성을 감지하여 특정 조건에서 콜백 함수를 실행하는 커스텀 훅
 *
 * @param {Object} options - 인터섹션 옵션
 * @param {boolean} options.condition - 인터섹션 감지 시 콜백 실행 조건
 * @param {Function} options.callback - 조건 충족 시 실행할 콜백 함수
 * @param {Object} [options.observerOptions] - IntersectionObserver 생성 옵션
 * @param {Element} [options.observerOptions.root] - 대상의 가시성 검사를 위한 뷰포트 요소
 * @param {string} [options.observerOptions.rootMargin] - root 요소의 마진
 * @param {number|number[]} [options.observerOptions.threshold] - 콜백이 실행될 대상 요소의 가시성 백분율
 * @param {Array} [deps=[]] - 콜백 함수의 의존성 배열
 * @returns {React.RefObject} 관찰할 요소에 연결할 ref 객체
 */
const useIntersection = (
  { condition, callback, observerOptions = {} },
  deps = [],
) => {
  const intersectingElementRef = useRef(null);

  const dependencies = deps || [];

  const observerHandler = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (condition && entry.isIntersecting) {
          callback();
        }
      });
    },
    [condition, callback, ...dependencies],
  );

  useEffect(() => {
    const element = intersectingElementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(observerHandler, observerOptions);

    observer.observe(element);

    return () => observer.disconnect();
  }, [observerHandler, observerOptions]);

  return intersectingElementRef;
};

export default useIntersection;
