import { useRef, useState } from "react";

import useOutsideClick from "../../hooks/useOutsideClick";

/**
 * 팝오버 기능을 제공하는 래퍼 컴포넌트입니다.
 * 자식 컴포넌트에게 팝오버 상태 관리와 바깥 영역 클릭 감지 기능을 제공합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {(props: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, popoverRef: React.RefObject<ReactElement | null> }) => ReactNode} props.children - 렌더 prop 패턴으로 사용되는 자식 함수
 * @param {Object} props.children.popoverRef - 팝오버 요소를 참조하는 ref 객체
 * @param {boolean} props.children.isOpen - 팝오버가 열려있는지 여부
 * @param {function} props.children.setIsOpen - 팝오버 열림/닫힘 상태를 설정하는 함수
 */
const PopoverWrapper = ({ children }) => {
  const popoverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useOutsideClick(popoverRef, () => setIsOpen(false));

  return children({ popoverRef, isOpen, setIsOpen });
};

export default PopoverWrapper;
