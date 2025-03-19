import { useState, useEffect } from "react";

import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import CheckIcon from "../../assets/icons/check.svg";
import BackgroundOptionItem from "../../components/BackgroundOptionItem/BackgroundOptionItem";
import backgroundStyles from "../../components/BackgroundOptionItem/BackgroundOptionItem.module.css";
import Button from "../../components/Button/Button";
import Input from "../../components/input/Input";
import ToggleButtonGroup from "../../components/ToggleButtonGroup/ToggleButtonGroup";

import styles from "./PostPage.module.css";

const colors = ["beige", "purple", "green", "blue"];

const PostPage = () => {
  const [toName, setToName] = useState("");
  const [error, setError] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [mode, setMode] = useState("color");
  const [loading, setLoading] = useState(false);
  const [imageOptions, setImageOptions] = useState([]);
  const navigate = useNavigate();

  const toggleOptions = [
    { name: "컬러", optionValue: "color" },
    { name: "이미지", optionValue: "image" },
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("이미지 API 요청 시작");

        const response = await fetch(
          "https://rolling-api.vercel.app/background-images/",
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Http오류 상태코드: ${response.status}`);
        }
        const data = await response.json();

        if (!data.imageUrls || !Array.isArray(data.imageUrls)) {
          throw new Error("API 응답 데어터 형식이 잘못되었습니다");
        }

        console.log("배경 이미지 API 응답 데이터:", data);
        setImageOptions(data.imageUrls);
      } catch (error) {
        console.error("배경 이밎 로드 실패:", error.message);
        alert("배경 이미지를 불러오는 데 실패했습니다");
      }
    };
    fetchImages();
  }, []);

  const handleBlur = () => {
    setError(toName.trim().length === 0);
  };

  const handleSelectedColor = (color) => {
    setSelectedColor(color);
    setSelectedBackground(null);
    setSelectedImageIndex(null);
    setMode("color");
  };

  const handleSelectedImage = (index) => {
    if (!imageOptions || imageOptions.length === 0) {
      console.error("이미지 리스트 비어있음");
      return;
    }

    const imageUrl = imageOptions[index];
    console.log("선택한 이미지 URL:", imageUrl);

    setSelectedBackground(imageUrl);
    setSelectedImageIndex(index);
    setMode("image");
  };

  const handleSubmit = async () => {
    if (!toName.trim()) {
      return;
    }
    setLoading(true);

    try {
      const requestBody = {
        name: toName,
        backgroundColor: selectedColor,
        backgroundImageURL: mode === "image" ? selectedBackground : null,
      };
      console.log("API 요청 데이터:", requestBody);

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
              onClick={() => handleSelectedColor(color)}
              className={clsx(styles.optionItem, backgroundStyles[color], {
                [backgroundStyles.selected]: selectedColor === color,
              })}
            >
              {selectedColor === color && (
                <div className={backgroundStyles.checkRound}>
                  <img
                    src={CheckIcon}
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
          {imageOptions.map((image, index) => (
            <div
              key={index}
              onClick={() => handleSelectedImage(index)}
              className={clsx(styles.optionItem, {
                [backgroundStyles.selected]: selectedImageIndex === index,
              })}
            >
              <img
                src={image}
                alt="배경이미지"
                className={clsx(styles.optionImage, {
                  [styles.selectedImage]: selectedImageIndex === index,
                })}
              />
              {selectedImageIndex === index && (
                <div className={backgroundStyles.checkRound}>
                  <img
                    src={CheckIcon}
                    className={backgroundStyles.checkIcon}
                    alt="선택"
                  />
                </div>
              )}
            </div>
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
          {loading ? "생성 중" : "생성하기"}
        </Button>
      </div>
    </div>
  );
};

export default PostPage;
