import { useState } from "react";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import BackgroundOptionItem from "../components/BackgroundOptionItem/BackgroundOptionItem";
import Button from "../components/Button/Button";
import Input from "../components/input/Input";
import ToggleButtonGroup from "../components/ToggleButtonGroup/ToggleButtonGroup";

import styles from "./ListPage.module.css";

const defaultImages = [
  "/imgs/card-background1.png",
  "/imgs/card-background2.png",
];
const colors = ["orange", "purple", "green", "blue"];

const ListPage = () => {
  const [toName, setToName] = useState("");
  const [error, setError] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedImage, setSelectedImage] = useState(defaultImages[0]);
  const [mode, setMode] = useState("color");
  const navigate = useNavigate();

  const toggleOptions = [
    { name: "컬러", optionValue: "color" },
    { name: "이미지", optionValue: "image" },
  ];

  //1. input 컴포넌트 작성
  const handleBlur = () => {
    setError(toName.trim().length === 0);
  };

  //2. 컬러 선택
  const handleSelectedColor = (color) => {
    setSelectedColor(color);
    setMode("color");
  };

  //3. 이미지 선택
  const handleSelectedImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setSelectedImage(imgUrl);
      setMode("image");

      return () => URL.revokeObjectURL(imgUrl);
    }
  };

  //4. 버튼 활성화 및 페이지 이동
  const handleSubmit = () => {
    if (toName.trim()) {
      const newId = Date.now();
      navigate(`/post/${newId}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <h2 className={styles.label}>To. </h2>
        <Input
          value={toName}
          onChange={(e) => setToName(e.target.value)}
          onBlur={handleBlur}
          placeholder="받는 사람 이름을 입력해 주세요"
          isError={error}
          errorMessage="값을 입력해 주세요"
        />
      </div>

      <div className={styles.toggleButtonContainer}>
        <h2 className={styles.label}>배경화면을 선택해 주세요.</h2>
        <p className={styles.intro}>
          컬러를 선택하거나, 이미지를 선택할 수 있습니다.
        </p>
        <ToggleButtonGroup
          options={toggleOptions}
          isSelected={mode}
          onClick={setMode}
        />

        {mode === "color" ? (
          <div className={styles.colorOptions}>
            {colors.map((color, index) => (
              <BackgroundOptionItem
                key={index}
                color={color}
                isSelected={selectedColor === color}
                onClick={() => handleSelectedColor(color)}
                className={clsx(styles.optionItem, styles[color])}
              />
            ))}
          </div>
        ) : (
          <div className={styles.imageUpload}>
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handleSelectedImage}
                className={styles.fileInput}
              />
              <img
                src={selectedImage}
                alt="선택된 이미지"
                className={styles.selectedImage}
              />
            </label>
          </div>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Button onClick={handleSubmit} disabled={toName.trim() === ""}>
          생성하기
        </Button>
      </div>
    </div>
  );
};

export default ListPage;
