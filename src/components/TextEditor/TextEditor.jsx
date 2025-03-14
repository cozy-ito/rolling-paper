import React, { useState } from "react";

import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css";
import styles from "./TextEditor.module.css";

const TextEditor = ({ value = "", onChange }) => {
  const [content, setContent] = useState(value);

  const handleChange = (newContent) => {
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  return (
    <div className={styles.textEditor}>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: [
            ["bold", "italic", "underline"], // 텍스트 스타일링
            [{ align: "" }, { align: "center" }, { align: "right" }], // 개별 정렬 버튼
            [{ list: "ordered" }, { list: "bullet" }], // 목록 기능
            [{ color: [] }], // 글자색 변경 버튼
          ],
        }}
        formats={["bold", "italic", "underline", "align", "list", "color"]}
        theme="snow"
      />
    </div>
  );
};

export default TextEditor;
