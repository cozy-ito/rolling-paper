import { useState } from "react";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import BackgroundOptionItem from "../components/BackgroundOptionItem/BackgroundOptionItem";
import Button from "../components/Button/Button";
import Input from "../components/input/Input";
import ToggleButtonGroup from "../components/ToggleButtonGroup/ToggleButtonGroup";

import styles from "./PostItemPage.module.css";

import backgroundStyles from "../components/BackgroundOptionItem/BackgroundOptionItem.module.css";

import FirstCardBackground from "/src/assets/imgs/card-background1.jpg";
import SecondCardBackground from "/src/assets/imgs/card-background2.jpg";
import third from "/src/assets/imgs/card-background2.jpg";
import four from "/src/assets/imgs/card-background2.jpg";

const defaultImages = [FirstCardBackground, SecondCardBackground, third, four];
const colors = ["beige", "purple", "green", "blue"];

const PostItemPage = () => {
  const [toName, setToName] = useState("");
  const [error, setError] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(
    defaultImages[0],
  );
  const [mode, setMode] = useState("color");
  const [loading, setLoading] = useState(false);
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
    setSelectedBackground(color);
    setMode("color");
  };

  //3. 이미지 선택
  const handleSelectedImage = (image) => {
    setSelectedImage(image);
    setSelectedBackground(image);
    setMode("image");
  };

  //4. 버튼 활성화 및 페이지 이동
  const handleSubmit = async () => {
    if (!toName.trim()) {
      return;
    }

    setLoading(true);

    try {
      const requestBody = {
        name: `To. ${toName}`,
      };

      if (mode === "color") {
        requestBody.backgroundColor = selectedColor;
      } else if (mode === "image") {
        requestBody.backgroundImageURL = selectedBackground;
      }

      console.log("보내는 데이터:", requestBody);

      const response = await fetch(
        "https://rolling-api.vercel.app/14-6/recipients/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );
      const data = await response.json();
      console.log("API 응답:", data);

      if (!response.ok) {
        throw new Error(data.message || "롤링페이퍼 생성 실패");
      }
      //alert("롤링페이퍼 성공적으로 생성");
      navigate(`/post/${data.id}`);
    } catch (error) {
      console.error("롤링페이퍼 생성 실패: ", error);
      alert("롤링페이퍼 생성에 실패했습니다");
    } finally {
      setLoading(false);
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
      </div>
      {mode === "color" && (
        <div className={styles.colorOptions}>
          {colors.map((color) => (
            <BackgroundOptionItem
              key={color}
              isSelected={selectedColor === color}
              onClick={() => handleSelectedColor(color)}
              className={clsx(
                backgroundStyles.optionItem,
                backgroundStyles[color],
                { [backgroundStyles.selected]: selectedColor === color },
              )}
            >
              {selectedColor === color && (
                <div className={backgroundStyles.checkRound}>
                  <img
                    src="src/assets/icons/check.svg"
                    className={backgroundStyles.checkIcon}
                    alt="선택"
                  />
                </div>
              )}
            </BackgroundOptionItem>
          ))}
        </div>
      )}

      {mode === "image" && (
        <div className={styles.imageOptions}>
          {defaultImages.map((image, index) => (
            <BackgroundOptionItem
              key={index}
              isSelected={selectedImage === image}
              onClick={() => handleSelectedImage(image)}
              className={clsx(backgroundStyles.optionItem, {
                [backgroundStyles.selected]: selectedImage === image,
              })}
            >
              <img
                src={image}
                alt="배경 이미지 "
                className={backgroundStyles.optionImage}
              />
              {selectedImage === image && (
                <div className={backgroundStyles.checkRound}>
                  <img
                    src="src/assets/icons/check.svg"
                    className={backgroundStyles.checkIcon}
                    alt="선택"
                  />
                </div>
              )}
            </BackgroundOptionItem>
          ))}
        </div>
      )}

      <div className={styles.buttonContainer}>
        <Button
          variant="primary"
          size="size56"
          state={toName.trim() ? "enabled" : "disabled"}
          onClick={handleSubmit}
          disabled={toName.trim() === ""}
        >
          {loading ? "생성 중..." : "생성하기"}
        </Button>
      </div>
    </div>
  );
};

export default PostItemPage;
