import { useRef, useState } from "react";

import useOutsideClick from "../../hooks/useOutsideClick";

const PopoverWrapper = ({ children }) => {
  const targetRef = useRef(null);
  const [isToggle, setIsToggle] = useState(false);
  useOutsideClick(targetRef, () => setIsToggle(false));

  return children({ targetRef, isToggle, setIsToggle });
};

export default PopoverWrapper;
