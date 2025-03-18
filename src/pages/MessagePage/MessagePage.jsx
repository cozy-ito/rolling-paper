import { useState, useEffect, useRef, useCallback } from "react";

import { useParams, useNavigate } from "react-router-dom";

import CheckIcon from "../../assets/icons/check.svg";
import Button from "../../components/Button/Button";
import Dropdown from "../../components/Dropdown/Dropdown";
import Input from "../../components/input/Input";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import Spinner from "../../components/Spinner/Spinner";
import TextEditor from "../../components/TextEditor/TextEditor";

import styles from "./MessagePage.module.css";

// 임시 이미지 URL
const PROFILE_IMAGE_URLS = {
  default:
    "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/sprint-proj-image/default_avatar.png",
  profile1: "https://picsum.photos/200?random=2",
  profile2: "https://picsum.photos/200?random=3",
  profile3: "https://picsum.photos/200?random=4",
  profile4: "https://picsum.photos/200?random=5",
  profile5: "https://picsum.photos/200?random=6",
  profile6: "https://picsum.photos/200?random=7",
  profile7: "https://picsum.photos/200?random=8",
  profile8: "https://picsum.photos/200?random=9",
  profile9: "https://picsum.photos/200?random=10",
};

const MAX_PROFILE_IMAGES = 10;
const MAX_SENDER_NAME_LENGTH = 20;

// 프로필 이미지 URL 목록을 최대 개수만큼 가져옴
const profileImages = [
  PROFILE_IMAGE_URLS.default, // ✅ 기본 이미지 추가
  ...Object.values(PROFILE_IMAGE_URLS).slice(1, MAX_PROFILE_IMAGES),
]; // 나머지 이미지들 추가

const FONT_ITEMS = [
  { label: "Noto Sans", value: "Noto Sans" },
  { label: "Pretendard", value: "Pretendard, sans-serif" },
  { label: "나눔명조", value: "Nanum Myeongjo, serif" },
  { label: "나눔손글씨 손편지체", value: "NanumSonPyeonJiCe, cursive" },
];
const FONT_MAP = {
  "Noto Sans": "Noto Sans, sans-serif",
  "Pretendard": "Pretendard, sans-serif",
  "나눔명조": "Nanum Myeongjo, serif",
  "나눔손글씨 손편지체": "NanumSonPyeonJiCe, cursive",
};
const RELATION_ITEMS = ["지인", "친구", "동료", "가족"];

const MessagePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    sender: "",
    selectedImage: PROFILE_IMAGE_URLS.default,
    selectedRelation: RELATION_ITEMS[0],
    textEditorContent: "",
    selectedFont: FONT_ITEMS[0].value,
  });
  const [formStatus, setFormStatus] = useState({
    isSenderError: false,
    isRelationOpen: false,
    isFontOpen: false,
    isFormValid: false,
    isLoading: false,
    loadingImages: {
      ...Object.fromEntries(profileImages.slice(1).map((url) => [url, true])), // ✅ 기본 이미지는 제외하고 로딩 상태 관리
    },
  });

  const {
    selectedImage,
    selectedRelation,
    selectedFont,
    sender,
    textEditorContent,
  } = formData;

  const { isSenderError, isRelationOpen, isFontOpen, isFormValid, isLoading } =
    formStatus;

  // Ref 관리
  const refs = {
    input: useRef(null),
    relation: useRef(null),
    font: useRef(null),
  };

  // 폼 유효성 검사
  const validateForm = (senderVal, contentVal) => {
    const isSenderValid = senderVal.trim().length > 0;

    // HTML 태그 제거 후 검사
    const strippedContent = contentVal
      .replace(/<[^>]*>?/gm, "")
      .replace(/\u200B/g, "")
      .trim();

    const isContentValid = strippedContent.length > 0;
    return isSenderValid && isContentValid;
  };

  // 상태 업데이트 헬퍼 함수
  const updateFormData = useCallback((newData) => {
    setFormData((prev) => {
      const updatedData = { ...prev, ...newData };
      setFormStatus((prevStatus) => ({
        ...prevStatus,
        isFormValid: validateForm(
          updatedData.sender,
          updatedData.textEditorContent,
        ),
      }));
      return updatedData;
    });
  }, []);

  const updateFormStatus = useCallback((newStatus) => {
    setFormStatus((prev) => ({ ...prev, ...newStatus }));
  }, []);

  // sender 변경 핸들러
  const handleSenderChange = useCallback(
    (e) => {
      const value = e.target.value.slice(0, MAX_SENDER_NAME_LENGTH);
      updateFormData({ sender: value });
      updateFormStatus((prev) => ({
        ...prev,
        isSenderError: false,
      }));
    },
    [updateFormData, updateFormStatus],
  );

  // textEditorContent 변경 핸들러
  const handleContentChange = (value) => {
    updateFormData({ textEditorContent: value });
    updateFormStatus({
      isFormValid: validateForm(sender, value),
    });
  };
  // Input에서 focusout 됐을 떄 실행 핸들러
  const handleSenderBlur = useCallback(() => {
    updateFormStatus({ isSenderError: !sender.trim() });
  }, [sender, updateFormStatus]);

  // ProfileButton 클릭 시 Large Size 프로필 이미지 업데이트 핸들러
  const handleProfileClick = useCallback(
    (imageURL) => {
      updateFormData({ selectedImage: imageURL });
    },
    [updateFormData],
  );

  // type에 따라 Dropdown 상태를 토글하는 핸들러
  const toggleDropdown = useCallback(
    (type) => {
      updateFormStatus({
        isRelationOpen: type === "relation" ? !isRelationOpen : false,
        isFontOpen: type === "font" ? !isFontOpen : false,
      });
    },
    [isRelationOpen, isFontOpen, updateFormStatus],
  );

  // 관계 Dropdown 상태 관리 핸들러
  const handleSelectRelation = useCallback(
    (item) => {
      updateFormData({ selectedRelation: item });
      updateFormStatus({ isRelationOpen: false });
    },
    [updateFormData, updateFormStatus],
  );

  const handleSelectFont = (label) => {
    if (FONT_MAP[label]) {
      updateFormData({ selectedFont: label });
      updateFormStatus({ isFontOpen: false });
    }
  };

  // 메세지 생성 API 요청 핸들러
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!isFormValid || isLoading) return;

      updateFormStatus({ isLoading: true });
      const requestBody = {
        profileImageURL: selectedImage,
        font: selectedFont,
        content: textEditorContent,
        relationship: selectedRelation,
        sender,
      };

      try {
        const response = await fetch(
          `https://rolling-api.vercel.app/14-6/recipients/${id}/messages/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          },
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        navigate(`/post/${id}`);
      } catch (error) {
        console.error("메시지 생성 실패:", error);
      } finally {
        updateFormStatus({ isLoading: false });
      }
    },
    [
      isFormValid,
      isLoading,
      textEditorContent,
      selectedRelation,
      selectedFont,
      selectedImage,
      sender,
      id,
      navigate,
      updateFormStatus,
    ],
  );

  useEffect(() => {
    profileImages.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setFormStatus((prev) => ({
          ...prev,
          loadingImages: { ...prev.loadingImages, [url]: false }, // 해당 이미지 로딩 완료
        }));
      };
      img.onerror = () => {
        setFormStatus((prev) => ({
          ...prev,
          loadingImages: { ...prev.loadingImages, [url]: false }, // 에러 발생 시에도 로딩 완료 처리
        }));
      };
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      setFormStatus((prev) => {
        let updatedStatus = { ...prev };

        // 상대와의 관계 드롭다운 닫기
        if (
          refs.relation.current &&
          !refs.relation.current.contains(event.target)
        ) {
          updatedStatus.isRelationOpen = false;
        }

        // 폰트 선택 드롭다운 닫기
        if (refs.font.current && !refs.font.current.contains(event.target)) {
          updatedStatus.isFontOpen = false;
        }

        // Input focusout 시 에러 메시지 표시
        if (
          refs.input.current &&
          !refs.input.current.contains(event.target) &&
          !formData.sender.trim()
        ) {
          updatedStatus.isSenderError = true;
        }

        return updatedStatus;
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [formData.sender, refs.input, refs.font, refs.relation]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.fromWrap}>
          <h2 className={styles.title}>From.</h2>
          <Input
            ref={refs.input}
            placeholder="이름을 입력해 주세요."
            value={sender}
            onChange={handleSenderChange}
            onBlur={handleSenderBlur}
            isError={isSenderError}
            errorMessage="값을 입력해 주세요."
          />
        </div>
        <div className={styles.profileWrap}>
          <h2 className={styles.title}>프로필 이미지</h2>
          <div className={styles.profileControls}>
            <ProfileButton size="large" src={selectedImage} />
            <div>
              <span className={styles.profileText}>
                프로필 이미지를 선택해주세요!
              </span>
              <div className={styles.rightSection}>
                {profileImages.map((image, i) => (
                  <div key={i} className={styles.profileItem}>
                    {i === 0 ? (
                      <div className={styles.profileButtonWrapper}>
                        <ProfileButton
                          src={image}
                          onClick={() => handleProfileClick(image)}
                        />
                        {selectedImage === image && (
                          <img
                            src={CheckIcon}
                            alt="선택됨"
                            className={styles.checkIcon}
                          />
                        )}
                      </div>
                    ) : formStatus.loadingImages[image] ? (
                      <Spinner
                        size="md"
                        text={null}
                        className={styles.profileButton}
                      />
                    ) : (
                      <div className={styles.profileButtonWrapper}>
                        <ProfileButton
                          src={image}
                          onClick={() => handleProfileClick(image)}
                        />
                        {selectedImage === image && (
                          <img
                            src={CheckIcon}
                            alt="선택됨"
                            className={styles.checkIcon}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.relationWrap} ref={refs.relation}>
          <h2 className={styles.title}>상대와의 관계</h2>
          <Dropdown
            selectedText={selectedRelation}
            isOpen={isRelationOpen}
            setIsOpen={() => toggleDropdown("relation")}
            items={RELATION_ITEMS}
            onSelect={handleSelectRelation}
          />
        </div>

        <div className={styles.textEditorWrap}>
          <h2 className={styles.title}>내용을 입력해 주세요</h2>
          <TextEditor
            selectedFont={FONT_MAP[selectedFont]}
            value={textEditorContent}
            onChange={handleContentChange}
          />
        </div>

        <div className={styles.fontWrap} ref={refs.font}>
          <h2 className={styles.title}>폰트 선택</h2>
          <Dropdown
            selectedText={selectedFont}
            isOpen={isFontOpen}
            setIsOpen={() => toggleDropdown("font")}
            items={Object.keys(FONT_MAP)}
            onSelect={handleSelectFont}
            renderItem={(item) => (
              <span style={{ fontFamily: FONT_MAP[item] }}>{item}</span>
            )}
          />
        </div>

        <Button
          className={styles.addButton}
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          state={isFormValid && !isLoading ? "enabled" : "disabled"}
        >
          {isLoading ? "생성 중..." : "생성하기"}
        </Button>
      </div>
    </>
  );
};

export default MessagePage;
