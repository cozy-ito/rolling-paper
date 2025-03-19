import { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import parse from "html-react-parser";
import "react-quill-new/dist/quill.snow.css";
import "./HtmlContentDisplay.css";

const HtmlContentDisplay = ({ htmlContent }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // 클라이언트 사이드에서만 파싱 (하이드레이션 문제 방지)
    const sanitizedContent = DOMPurify.sanitize(htmlContent);
    setContent(sanitizedContent);
  }, [htmlContent]);

  return <div className="quill-content">{content ? parse(content) : null}</div>;
};

export default HtmlContentDisplay;
